from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.project import Project, ProjectCreate, ProjectUpdate
from datetime import datetime
import uuid

class ProjectService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.database = database
        self.collection = database.projects

    async def create_project(self, project_data: ProjectCreate) -> Project:
        project = Project(**project_data.dict())
        
        # Convert to dict for MongoDB insertion
        project_dict = project.dict()
        
        # Insert into database
        result = await self.collection.insert_one(project_dict)
        
        # Return the created project
        return project

    async def get_project(self, project_id: str) -> Optional[Project]:
        project_dict = await self.collection.find_one({"id": project_id})
        if project_dict:
            return Project(**project_dict)
        return None

    async def get_all_projects(self) -> List[Project]:
        projects = []
        async for project_dict in self.collection.find().sort("created_at", -1):
            projects.append(Project(**project_dict))
        return projects

    async def update_project(self, project_id: str, project_data: ProjectUpdate) -> Optional[Project]:
        # Get existing project
        existing_project = await self.get_project(project_id)
        if not existing_project:
            return None
        
        # Update fields
        update_data = project_data.dict(exclude_unset=True)
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            
            # Update in database
            await self.collection.update_one(
                {"id": project_id},
                {"$set": update_data}
            )
        
        # Return updated project
        return await self.get_project(project_id)

    async def delete_project(self, project_id: str) -> bool:
        result = await self.collection.delete_one({"id": project_id})
        return result.deleted_count > 0

    async def get_featured_projects(self) -> List[Project]:
        projects = []
        async for project_dict in self.collection.find({"featured": True}).sort("created_at", -1):
            projects.append(Project(**project_dict))
        return projects