from flask import Flask
from pyngrok import ngrok

app = Flask(__name__)

@app.route("/")
def index():
    return "Hai sayangku"

if __name__ == "__main__":
    # Open a tunnel on port 5000
    public_url = ngrok.connect(5000)
    print(" * ngrok tunnel:", public_url)

    app.run(port=5000)
