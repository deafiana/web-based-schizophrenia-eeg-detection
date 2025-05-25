# Use Python base image compatible with TensorFlow
FROM python:3.10-slim

# Create and set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of your app
COPY . .

# Let Google Cloud know which port to use
ENV PORT=8080

# Expose the port Cloud Run listens to
EXPOSE 8080

# Run your app (adjust if your entrypoint is different)
CMD ["python", "app.py"]
