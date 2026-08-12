from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime

class SocialLinks(BaseModel):
    linkedin: Optional[str] = None
    github: Optional[str] = None
    dribbble: Optional[str] = None
    twitter: Optional[str] = None

class PersonalInfoBase(BaseModel):
    name: str
    title: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    resume_url: Optional[str] = None
    social: Optional[SocialLinks] = None

class PersonalInfoCreate(PersonalInfoBase):
    pass

class PersonalInfoUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    resume_url: Optional[str] = None
    social: Optional[SocialLinks] = None

class PersonalInfo(PersonalInfoBase):
    id: str = Field(default="personal_info")
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }