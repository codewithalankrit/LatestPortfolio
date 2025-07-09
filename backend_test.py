import requests
import json
import uuid
import time
import os
from dotenv import load_dotenv

# Load environment variables from frontend/.env
load_dotenv("frontend/.env")

# Get the backend URL from environment variables
BACKEND_URL = os.getenv("REACT_APP_BACKEND_URL")
API_URL = f"{BACKEND_URL}/api"

print(f"Testing API at: {API_URL}")

class PortfolioAPITest:
    def __init__(self):
        self.api_url = API_URL
        self.project_id = None
        self.contact_id = None
        
    def run_all_tests(self):
        """Run all API tests in sequence"""
        test_results = {
            "success": 0,
            "failure": 0,
            "tests": []
        }
        
        # List of all test methods
        tests = [
            self.test_api_health,
            
            # Project tests
            self.test_create_project,
            self.test_get_all_projects,
            self.test_get_project_by_id,
            self.test_update_project,
            self.test_get_featured_projects,
            
            # Personal info tests
            self.test_create_personal_info,
            self.test_get_personal_info,
            self.test_update_personal_info,
            
            # Contact tests
            self.test_create_contact,
            self.test_get_all_contacts,
            self.test_get_contact_by_id,
            self.test_mark_contact_as_read,
            
            # Error handling tests
            self.test_invalid_project_id,
            self.test_invalid_contact_id,
            
            # Cleanup tests (should be last)
            self.test_delete_project,
            self.test_delete_contact
        ]
        
        # Run each test and collect results
        for test_func in tests:
            test_name = test_func.__name__
            print(f"\n{'='*50}\nRunning test: {test_name}\n{'='*50}")
            
            try:
                result = test_func()
                if result:
                    test_results["success"] += 1
                    status = "PASS"
                else:
                    test_results["failure"] += 1
                    status = "FAIL"
            except Exception as e:
                test_results["failure"] += 1
                status = "ERROR"
                result = str(e)
            
            test_results["tests"].append({
                "name": test_name,
                "status": status,
                "result": result
            })
            
            print(f"Test {test_name}: {status}")
        
        # Print summary
        print(f"\n{'='*50}\nTest Summary\n{'='*50}")
        print(f"Total tests: {len(tests)}")
        print(f"Passed: {test_results['success']}")
        print(f"Failed: {test_results['failure']}")
        print(f"Success rate: {(test_results['success'] / len(tests)) * 100:.2f}%")
        
        # Print detailed results for failed tests
        if test_results["failure"] > 0:
            print(f"\n{'='*50}\nFailed Tests\n{'='*50}")
            for test in test_results["tests"]:
                if test["status"] != "PASS":
                    print(f"{test['name']}: {test['status']}")
                    print(f"Result: {test['result']}")
                    print("-" * 50)
        
        return test_results
    
    def test_api_health(self):
        """Test the API health check endpoint"""
        response = requests.get(f"{self.api_url}/")
        
        if response.status_code == 200:
            data = response.json()
            return data.get("message") == "Portfolio API is running!"
        return False
    
    # Project API Tests
    def test_create_project(self):
        """Test creating a new project"""
        project_data = {
            "title": f"Test Project {uuid.uuid4()}",
            "short_description": "A test project created by automated tests",
            "description": "This is a detailed description of the test project. It includes multiple paragraphs of text to simulate a real project description.",
            "technologies": ["Python", "FastAPI", "MongoDB", "React"],
            "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
            "live_link": "https://example.com/project",
            "github_link": "https://github.com/example/project",
            "featured": True
        }
        
        response = requests.post(f"{self.api_url}/projects", json=project_data)
        
        if response.status_code == 200:
            data = response.json()
            self.project_id = data.get("id")
            
            # Verify all fields were saved correctly
            for key, value in project_data.items():
                if data.get(key) != value:
                    print(f"Field mismatch: {key}, expected {value}, got {data.get(key)}")
                    return False
            
            return True
        
        print(f"Failed to create project: {response.status_code}, {response.text}")
        return False
    
    def test_get_all_projects(self):
        """Test getting all projects"""
        response = requests.get(f"{self.api_url}/projects")
        
        if response.status_code == 200:
            data = response.json()
            # Check if we have at least one project
            return isinstance(data, list) and len(data) > 0
        
        print(f"Failed to get projects: {response.status_code}, {response.text}")
        return False
    
    def test_get_project_by_id(self):
        """Test getting a specific project by ID"""
        if not self.project_id:
            print("No project ID available for testing")
            return False
        
        response = requests.get(f"{self.api_url}/projects/{self.project_id}")
        
        if response.status_code == 200:
            data = response.json()
            return data.get("id") == self.project_id
        
        print(f"Failed to get project: {response.status_code}, {response.text}")
        return False
    
    def test_update_project(self):
        """Test updating a project"""
        if not self.project_id:
            print("No project ID available for testing")
            return False
        
        update_data = {
            "title": f"Updated Project {uuid.uuid4()}",
            "short_description": "This project has been updated",
            "featured": False
        }
        
        response = requests.put(f"{self.api_url}/projects/{self.project_id}", json=update_data)
        
        if response.status_code == 200:
            data = response.json()
            
            # Verify fields were updated
            for key, value in update_data.items():
                if data.get(key) != value:
                    print(f"Field not updated: {key}, expected {value}, got {data.get(key)}")
                    return False
            
            return True
        
        print(f"Failed to update project: {response.status_code}, {response.text}")
        return False
    
    def test_get_featured_projects(self):
        """Test getting featured projects"""
        response = requests.get(f"{self.api_url}/projects/featured")
        
        if response.status_code == 200:
            data = response.json()
            return isinstance(data, list)
        
        print(f"Failed to get featured projects: {response.status_code}, {response.text}")
        return False
    
    def test_delete_project(self):
        """Test deleting a project"""
        if not self.project_id:
            print("No project ID available for testing")
            return False
        
        response = requests.delete(f"{self.api_url}/projects/{self.project_id}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Verify project was deleted
            check_response = requests.get(f"{self.api_url}/projects/{self.project_id}")
            return check_response.status_code == 404
        
        print(f"Failed to delete project: {response.status_code}, {response.text}")
        return False
    
    # Personal Info API Tests
    def test_create_personal_info(self):
        """Test creating personal info"""
        personal_info_data = {
            "name": "John Doe",
            "title": "Full Stack Developer",
            "email": "john.doe@example.com",
            "phone": "+1 (555) 123-4567",
            "location": "New York, NY",
            "bio": "Experienced developer with a passion for creating elegant solutions.",
            "resume_url": "https://example.com/resume.pdf",
            "social": {
                "linkedin": "https://linkedin.com/in/johndoe",
                "github": "https://github.com/johndoe",
                "twitter": "https://twitter.com/johndoe"
            }
        }
        
        response = requests.post(f"{self.api_url}/personal-info", json=personal_info_data)
        
        if response.status_code == 200:
            data = response.json()
            
            # Verify fields were saved correctly
            for key, value in personal_info_data.items():
                if key == "social":
                    for social_key, social_value in value.items():
                        if data.get("social", {}).get(social_key) != social_value:
                            print(f"Social field mismatch: {social_key}")
                            return False
                elif data.get(key) != value:
                    print(f"Field mismatch: {key}")
                    return False
            
            return True
        
        print(f"Failed to create personal info: {response.status_code}, {response.text}")
        return False
    
    def test_get_personal_info(self):
        """Test getting personal info"""
        response = requests.get(f"{self.api_url}/personal-info")
        
        if response.status_code == 200:
            data = response.json()
            return data.get("name") is not None and data.get("email") is not None
        
        print(f"Failed to get personal info: {response.status_code}, {response.text}")
        return False
    
    def test_update_personal_info(self):
        """Test updating personal info"""
        update_data = {
            "name": "Jane Smith",
            "title": "Senior Developer",
            "bio": "Updated professional bio with new information."
        }
        
        response = requests.put(f"{self.api_url}/personal-info", json=update_data)
        
        if response.status_code == 200:
            data = response.json()
            
            # Verify fields were updated
            for key, value in update_data.items():
                if data.get(key) != value:
                    print(f"Field not updated: {key}")
                    return False
            
            return True
        
        print(f"Failed to update personal info: {response.status_code}, {response.text}")
        return False
    
    # Contact API Tests
    def test_create_contact(self):
        """Test creating a contact submission"""
        contact_data = {
            "name": "Test Contact",
            "email": "contact@example.com",
            "subject": "Test Contact Submission",
            "message": "This is a test contact submission created by automated tests."
        }
        
        response = requests.post(f"{self.api_url}/contacts", json=contact_data)
        
        if response.status_code == 200:
            data = response.json()
            self.contact_id = data.get("id")
            
            # Verify fields were saved correctly
            for key, value in contact_data.items():
                if data.get(key) != value:
                    print(f"Field mismatch: {key}")
                    return False
            
            # Verify read status is initially false
            if data.get("read") is not False:
                print("Read status should be false initially")
                return False
            
            return True
        
        print(f"Failed to create contact: {response.status_code}, {response.text}")
        return False
    
    def test_get_all_contacts(self):
        """Test getting all contacts"""
        response = requests.get(f"{self.api_url}/contacts")
        
        if response.status_code == 200:
            data = response.json()
            return isinstance(data, list) and len(data) > 0
        
        print(f"Failed to get contacts: {response.status_code}, {response.text}")
        return False
    
    def test_get_contact_by_id(self):
        """Test getting a specific contact by ID"""
        if not self.contact_id:
            print("No contact ID available for testing")
            return False
        
        response = requests.get(f"{self.api_url}/contacts/{self.contact_id}")
        
        if response.status_code == 200:
            data = response.json()
            return data.get("id") == self.contact_id
        
        print(f"Failed to get contact: {response.status_code}, {response.text}")
        return False
    
    def test_mark_contact_as_read(self):
        """Test marking a contact as read"""
        if not self.contact_id:
            print("No contact ID available for testing")
            return False
        
        response = requests.put(f"{self.api_url}/contacts/{self.contact_id}/read")
        
        if response.status_code == 200:
            # Verify contact was marked as read
            check_response = requests.get(f"{self.api_url}/contacts/{self.contact_id}")
            if check_response.status_code == 200:
                data = check_response.json()
                return data.get("read") is True
        
        print(f"Failed to mark contact as read: {response.status_code}, {response.text}")
        return False
    
    def test_delete_contact(self):
        """Test deleting a contact"""
        if not self.contact_id:
            print("No contact ID available for testing")
            return False
        
        response = requests.delete(f"{self.api_url}/contacts/{self.contact_id}")
        
        if response.status_code == 200:
            # Verify contact was deleted
            check_response = requests.get(f"{self.api_url}/contacts/{self.contact_id}")
            return check_response.status_code == 404
        
        print(f"Failed to delete contact: {response.status_code}, {response.text}")
        return False
    
    # Error Handling Tests
    def test_invalid_project_id(self):
        """Test handling of invalid project ID"""
        invalid_id = str(uuid.uuid4())
        response = requests.get(f"{self.api_url}/projects/{invalid_id}")
        
        return response.status_code == 404
    
    def test_invalid_contact_id(self):
        """Test handling of invalid contact ID"""
        invalid_id = str(uuid.uuid4())
        response = requests.get(f"{self.api_url}/contacts/{invalid_id}")
        
        return response.status_code == 404


if __name__ == "__main__":
    tester = PortfolioAPITest()
    tester.run_all_tests()