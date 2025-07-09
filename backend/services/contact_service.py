from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.contact import Contact, ContactCreate
from datetime import datetime

class ContactService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.database = database
        self.collection = database.contacts

    async def create_contact(self, contact_data: ContactCreate) -> Contact:
        contact = Contact(**contact_data.dict())
        
        # Convert to dict for MongoDB insertion
        contact_dict = contact.dict()
        
        # Insert into database
        result = await self.collection.insert_one(contact_dict)
        
        return contact

    async def get_contact(self, contact_id: str) -> Optional[Contact]:
        contact_dict = await self.collection.find_one({"id": contact_id})
        if contact_dict:
            return Contact(**contact_dict)
        return None

    async def get_all_contacts(self) -> List[Contact]:
        contacts = []
        async for contact_dict in self.collection.find().sort("created_at", -1):
            contacts.append(Contact(**contact_dict))
        return contacts

    async def mark_as_read(self, contact_id: str) -> bool:
        result = await self.collection.update_one(
            {"id": contact_id},
            {"$set": {"read": True}}
        )
        return result.modified_count > 0

    async def delete_contact(self, contact_id: str) -> bool:
        result = await self.collection.delete_one({"id": contact_id})
        return result.deleted_count > 0