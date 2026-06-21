from pydantic import BaseModel

class ImageResponse(BaseModel):
    message: str
    file_url: str
