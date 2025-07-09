from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.personal_info import PersonalInfo, PersonalInfoCreate, PersonalInfoUpdate
from datetime import datetime

class PersonalInfoService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.database = database
        self.collection = database.personal_info

    async def create_or_update_personal_info(self, personal_info_data: PersonalInfoCreate) -> PersonalInfo:
        personal_info = PersonalInfo(**personal_info_data.dict())
        
        # Convert to dict for MongoDB insertion
        personal_info_dict = personal_info.dict()
        
        # Use upsert to create or update
        await self.collection.replace_one(
            {"id": "personal_info"},
            personal_info_dict,
            upsert=True
        )
        
        return personal_info

    async def get_personal_info(self) -> Optional[PersonalInfo]:
        personal_info_dict = await self.collection.find_one({"id": "personal_info"})
        if personal_info_dict:
            return PersonalInfo(**personal_info_dict)
        return None

    async def update_personal_info(self, personal_info_data: PersonalInfoUpdate) -> Optional[PersonalInfo]:
        # Get existing personal info
        existing_info = await self.get_personal_info()
        if not existing_info:
            return None
        
        # Update fields
        update_data = personal_info_data.dict(exclude_unset=True)
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            
            # Update in database
            await self.collection.update_one(
                {"id": "personal_info"},
                {"$set": update_data}
            )
        
        # Return updated personal info
        return await self.get_personal_info()