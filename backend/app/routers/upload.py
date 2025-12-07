from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import uuid
import os

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    # Validate file type
    allowed_extensions = {"jpg", "jpeg", "png", "gif"}
    extension = file.filename.split(".")[-1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Allowed: jpg, jpeg, png, gif"
        )

    # Generate unique file name
    unique_filename = f"{uuid.uuid4()}.{extension}"

    # Save path
    save_path = f"app/static/images/{unique_filename}"

    # Save image to disk
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Return public image URL
    image_url = f"http://127.0.0.1:8000/images/{unique_filename}"

    return {
        "message": "Image uploaded successfully!",
        "image_url": image_url
    }
