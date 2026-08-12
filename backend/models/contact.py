from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }