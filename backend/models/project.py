from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class ProjectBase(BaseModel):
    title: str
    short_description: str
    description: str
    technologies: List[str]
    images: List[str]
    live_link: Optional[str] = None
    github_link: Optional[str] = None
    featured: bool = False

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    images: Optional[List[str]] = None
    live_link: Optional[str] = None
    github_link: Optional[str] = None
    featured: Optional[bool] = None

class Project(ProjectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }