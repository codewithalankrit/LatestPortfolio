from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
import sys
from contextlib import asynccontextmanager

# Import database and services
from .database.database import connect_to_mongo, close_mongo_connection, get_database
from .services.project_service import ProjectService
from .services.personal_info_service import PersonalInfoService
from .services.contact_service import ContactService

# Import models
from .models.project import Project, ProjectCreate, ProjectUpdate
from .models.personal_info import PersonalInfo, PersonalInfoCreate, PersonalInfoUpdate
from .models.contact import Contact, ContactCreate
from typing import List

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Lifespan context manager for startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

# Create the main app with lifespan
app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Dependency to get database
async def get_db():
    return await get_database()

# Helper functions to get services
async def get_project_service(db=Depends(get_db)):
    return ProjectService(db)

async def get_personal_info_service(db=Depends(get_db)):
    return PersonalInfoService(db)

async def get_contact_service(db=Depends(get_db)):
    return ContactService(db)

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running!"}

# Project endpoints
@api_router.post("/projects", response_model=Project)
async def create_project(
    project: ProjectCreate,
    project_service: ProjectService = Depends(get_project_service)
):
    try:
        return await project_service.create_project(project)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/projects", response_model=List[Project])
async def get_all_projects(
    project_service: ProjectService = Depends(get_project_service)
):
    try:
        return await project_service.get_all_projects()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/projects/featured", response_model=List[Project])
async def get_featured_projects(
    project_service: ProjectService = Depends(get_project_service)
):
    try:
        return await project_service.get_featured_projects()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(
    project_id: str,
    project_service: ProjectService = Depends(get_project_service)
):
    try:
        project = await project_service.get_project(project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return project
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(
    project_id: str,
    project_data: ProjectUpdate,
    project_service: ProjectService = Depends(get_project_service)
):
    try:
        project = await project_service.update_project(project_id, project_data)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return project
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/projects/{project_id}")
async def delete_project(
    project_id: str,
    project_service: ProjectService = Depends(get_project_service)
):
    try:
        success = await project_service.delete_project(project_id)
        if not success:
            raise HTTPException(status_code=404, detail="Project not found")
        return {"message": "Project deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Personal Info endpoints
@api_router.post("/personal-info", response_model=PersonalInfo)
async def create_or_update_personal_info(
    personal_info: PersonalInfoCreate,
    personal_info_service: PersonalInfoService = Depends(get_personal_info_service)
):
    try:
        return await personal_info_service.create_or_update_personal_info(personal_info)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/personal-info", response_model=PersonalInfo)
async def get_personal_info(
    personal_info_service: PersonalInfoService = Depends(get_personal_info_service)
):
    try:
        personal_info = await personal_info_service.get_personal_info()
        if not personal_info:
            # Return default personal info if none exists
            return PersonalInfo(
                name="Portfolio Owner",
                title="Developer",
                email="contact@example.com"
            )
        return personal_info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/personal-info", response_model=PersonalInfo)
async def update_personal_info(
    personal_info_data: PersonalInfoUpdate,
    personal_info_service: PersonalInfoService = Depends(get_personal_info_service)
):
    try:
        personal_info = await personal_info_service.update_personal_info(personal_info_data)
        if not personal_info:
            raise HTTPException(status_code=404, detail="Personal info not found")
        return personal_info
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Contact endpoints
@api_router.post("/contacts", response_model=Contact)
async def create_contact(
    contact: ContactCreate,
    contact_service: ContactService = Depends(get_contact_service)
):
    try:
        return await contact_service.create_contact(contact)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contacts", response_model=List[Contact])
async def get_all_contacts(
    contact_service: ContactService = Depends(get_contact_service)
):
    try:
        return await contact_service.get_all_contacts()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contacts/{contact_id}", response_model=Contact)
async def get_contact(
    contact_id: str,
    contact_service: ContactService = Depends(get_contact_service)
):
    try:
        contact = await contact_service.get_contact(contact_id)
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        return contact
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/contacts/{contact_id}/read")
async def mark_contact_as_read(
    contact_id: str,
    contact_service: ContactService = Depends(get_contact_service)
):
    try:
        success = await contact_service.mark_as_read(contact_id)
        if not success:
            raise HTTPException(status_code=404, detail="Contact not found")
        return {"message": "Contact marked as read"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/contacts/{contact_id}")
async def delete_contact(
    contact_id: str,
    contact_service: ContactService = Depends(get_contact_service)
):
    try:
        success = await contact_service.delete_contact(contact_id)
        if not success:
            raise HTTPException(status_code=404, detail="Contact not found")
        return {"message": "Contact deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)