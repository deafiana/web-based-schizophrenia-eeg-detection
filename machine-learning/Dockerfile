# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt (create this file with your dependencies)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy your app code
COPY . .

# Expose the port your app will run on
EXPOSE 8080

# Use Gunicorn to serve the app (recommended for production)
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
