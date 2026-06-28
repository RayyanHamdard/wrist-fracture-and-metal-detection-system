from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from typing import Dict
import os
import logging
import aiofiles
import uuid
import shutil

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Define the save_file function that was causing the issue
async def save_file(upload_file: UploadFile, folder: str) -> str:
    """
    Asynchronously save an uploaded file to a specified folder.
    
    Args:
        upload_file: The uploaded file from FastAPI
        folder: The folder to save the file in
        
    Returns:
        The path to the saved file
    """
    # Create folder if it doesn't exist
    if not os.path.exists(folder):
        os.makedirs(folder)
    
    # Generate a unique filename
    file_extension = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(folder, unique_filename)
    
    # Asynchronously save the file
    async with aiofiles.open(file_path, 'wb') as out_file:
        # Read and write the file chunk by chunk
        while content := await upload_file.read(1024 * 1024):  # 1MB chunks
            await out_file.write(content)
    
    return file_path

BASE_DIR = "app/static"

def save_file1(file: UploadFile, folder: str) -> str:
    upload_folder = os.path.join(BASE_DIR, "uploads", folder)
    os.makedirs(upload_folder, exist_ok=True)
    # Use ONLY the base name (strip any directory components a crafted upload
    # might include, e.g. "../../evil") and prefix a short unique id. This stops
    # path traversal AND ensures concurrent/repeated uploads of the same
    # filename never overwrite each other — or each other's generated outputs,
    # which are derived from this saved name (processed image, report, etc.).
    safe_name = os.path.basename(file.filename or "").strip()
    if not safe_name or safe_name in (".", ".."):
        safe_name = "upload"
    unique_name = f"{uuid.uuid4().hex[:8]}_{safe_name}"
    file_path = os.path.join(upload_folder, unique_name)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    return file_path

def delete_files(folders: list):
    for folder in folders:
        folder_path = os.path.join(BASE_DIR, folder)
        if os.path.exists(folder_path):
            for file in os.listdir(folder_path):
                os.remove(os.path.join(folder_path, file))
