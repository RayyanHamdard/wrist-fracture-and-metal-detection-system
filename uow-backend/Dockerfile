# Backend container for the Wrist Fracture & Metal Detection System (FastAPI).
# Works on Hugging Face Spaces (Docker SDK, port 7860), Render, Fly.io, etc.
FROM python:3.10-slim

# System libraries required by OpenCV (opencv-python-headless) + curl for the
# optional model download in start.sh.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x start.sh

# Hugging Face Spaces expects 7860; other hosts inject $PORT (handled in start.sh).
EXPOSE 7860

CMD ["./start.sh"]
