import sys
import os

# Add the backend directory to the Python path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend'))
sys.path.append(backend_dir)

# Try to import the modules
try:
    from backend.database.database import connect_to_mongo, close_mongo_connection, get_database
    print("Successfully imported database module")
except ImportError as e:
    print(f"Failed to import database module: {e}")

try:
    from backend.models.project import Project
    print("Successfully imported project model")
except ImportError as e:
    print(f"Failed to import project model: {e}")

try:
    from backend.services.project_service import ProjectService
    print("Successfully imported project service")
except ImportError as e:
    print(f"Failed to import project service: {e}")

print("Python path:", sys.path)
print("Current directory:", os.getcwd())
print("Backend directory exists:", os.path.exists(backend_dir))
print("Files in backend directory:", os.listdir(backend_dir))