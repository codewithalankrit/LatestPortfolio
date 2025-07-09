from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class SkillItem(BaseModel):
    name: str
    level: int = Field(ge=0, le=100)
    icon: Optional[str] = None

class SkillCategoryBase(BaseModel):
    category: str
    skills: List[SkillItem]

class SkillCategoryCreate(SkillCategoryBase):
    pass

class SkillCategoryUpdate(BaseModel):
    category: Optional[str] = None
    skills: Optional[List[SkillItem]] = None

class SkillCategory(SkillCategoryBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }