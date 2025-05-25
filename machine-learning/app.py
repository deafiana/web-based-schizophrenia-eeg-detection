# 1. change to fif (make temp files)
# 2. accept 22 channels
# 3. check if all channels match with model and in the same urutan
# 4. remove channel doesnt match -> ecg channel
# 5.epochs 5s and trim 3 minutes
# fft
# proceed to model
# send result using api

import tensorflow as tf
import os
import mne
import numpy as np
from scipy.fft import fft, fftfreq
from flask import Flask, request, jsonify
from flask_cors import CORS

# load 30 model
model_path_30 = 'models/model-30.h5'
model_30 = tf.keras.models.load_model(model_path_30)

# model_path_30 = 'models/model-1d-cnn-NEW.h5'
# model_30 = tf.keras.models.load_model(model_path_30)

# load 25 model
model_path_24 = 'models/model-24.h5'
model_24 = tf.keras.models.load_model(model_path_24)

channels_25 = [
    "FP1-RREF", "F3-RREF", "C3-RREF", "P3-RREF", "O1-RREF", "F7-RREF", "T3-RREF", "T5-RREF", "T1-RREF", "A1-RREF",
    "FP2-RREF", "F4-RREF", "C4-RREF", "P4-RREF", "O2-RREF", "F8-RREF", "T4-RREF", "T6-RREF", "T2-RREF", "A2-RREF",
    "FZ-RREF", "PZ-RREF", "FPZ", "OZ-RREF", "ECG"
]

channels_32 = [
    "PG1", "PG2", "FP1", "FP2", "F3", "F4", "F7", "F8", "FZ", "T1", "T2", "T3", "T4", "T5", "T6", "C3", "C4", "CZ",
    "P3", "P4", "PZ", "O1", "O2", "A1", "A2", "1A", "2A", "3A", "4A", "5A", "6A", "7A"
]

def reorder_channels(raw, desired_order):
    existing_channels = [ch for ch in desired_order if ch in raw.ch_names]
    raw.reorder_channels(existing_channels)
    return raw

def epochs_to_fft(epochs):
    # got epochs
    sfreq = epochs.info['sfreq']

    # got data
    data = epochs.get_data()  # (n_epochs, n_channels, n_times)
    n_times = data.shape[2]

    # Compute frequencies
    freqs = fftfreq(n_times, d=1/sfreq)
    pos_mask = freqs >= 0
    # freqs = freqs[pos_mask]

    # Compute FFT power
    all_fft = []
    for epoch in data:
        fft_data = fft(epoch, axis=1)
        fft_power = np.abs(fft_data)
        fft_power = fft_power[:, pos_mask]
        all_fft.append(fft_power)

    return np.array(all_fft) # shape: (n_epochs, n_channels, n_freqs)

def preprocessing(edf_file):
    try: 
        # read raw edf
        raw = mne.io.read_raw_edf(edf_file, preload=True, verbose=False)

        # save as .fif
        fif_file = os.path.splitext(edf_file)[0] + '.fif'
        raw.save(fif_file, overwrite=True)

        # GET CH NAMES
        ch_names = set(ch.upper() for ch in raw.info['ch_names'])

        print(ch_names)

        # CHECK CHANNELS
        if set(channels_25).issubset(ch_names):
            raw.drop_channels(['ECG'])
            # raw = reorder_channels(raw, channels_25)
        elif set(channels_32).issubset(ch_names):
            raw.drop_channels(['PG1', 'PG2'])
            # raw = reorder_channels(raw, channels_32)
            raw.filter(l_freq=1.0, h_freq=35.0)
        else:
            raise ValueError("Channels tidak sesuai dengan ketentuan.")

        # trim 120 minutes from start
        raw.crop(tmin=120)

        print("Final channels:", raw.ch_names)

        # make epochs
        events = mne.make_fixed_length_events(raw, start=0, duration=5)
        epochs = mne.Epochs(raw, events, tmin=0, tmax=5, baseline=None, preload=True)

        # make fft
        fft_result = epochs_to_fft(epochs)

    finally:
        if os.path.exists(fif_file):
            os.remove(fif_file)

    return fft_result

'''
    FLASK CONFIGURATION
'''
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    if not file.filename.endswith('.edf'):
        return jsonify({'error': 'File must be an .edf file'}), 400

    file_path = os.path.join('temp', file.filename)
    os.makedirs('temp', exist_ok=True)
    file.save(file_path)

    try:
        # Preprocess and get FFT array
        fft_array = preprocessing(file_path)

        if len(fft_array.shape) == 2:
            fft_array = np.expand_dims(fft_array, axis=0)  # Shape: (1, channels, time)

        # Model prediction
        if fft_array.shape[1] == 30:
            predictions = model_30.predict(fft_array, verbose=0)
        elif fft_array.shape[1] == 24:
            predictions = model_24.predict(fft_array, verbose=0)
        else:
            raise ValueError(f"Unsupported number of channels: {fft_array.shape}. Expected 30 or 24.")

        count_1 = 0
        count_0 = 0

        for pred in predictions:
            prob = float(pred[0])
            label = 1 if prob > 0.5 else 0

            if label == 1:
                count_1 += 1
            else:
                count_0 += 1

        total = count_1 + count_0
        percent_1 = count_1 / total * 100
        percent_0 = count_0 / total * 100

        response = {
            "schizophrenia_percentage": round(percent_1, 0),
            "healthy_percentage": round(percent_0, 0)
        }

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        os.remove(file_path) 

    return response

if __name__ == "__main__":
    app.run(debug=True, port=5000)

# from pyngrok import ngrok
# if __name__ == "__main__":
#     # Open a tunnel on port 5000
#     public_url = ngrok.connect(5000)
#     print(" * ngrok tunnel:", public_url)

#     app.run(port=5000)