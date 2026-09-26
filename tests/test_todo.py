import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from main import app, get_db
from models.todo import Todo

# Create an in-memory SQLite database for testing
@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_db_override():
        return session
    app.dependency_overrides[get_db] = get_db_override
    yield TestClient(app)
    app.dependency_overrides.clear()

def test_create_todo(client: TestClient):
    response = client.post("/api/todos/", json={"title": "Test todo"})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test todo"
    assert data["status"] is False
    assert "id" in data
    assert "created_at" in data

def test_read_todos(client: TestClient):
    # Create a todo first
    client.post("/api/todos/", json={"title": "Test todo"})
    response = client.get("/api/todos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test todo"

def test_update_todo(client: TestClient):
    # Create a todo
    create_response = client.post("/api/todos/", json={"title": "Test todo"})
    todo_id = create_response.json()["id"]
    # Update it
    update_response = client.put(f"/api/todos/{todo_id}", json={"title": "Updated todo", "status": True})
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["title"] == "Updated todo"
    assert data["status"] is True

def test_delete_todo(client: TestClient):
    # Create a todo
    create_response = client.post("/api/todos/", json={"title": "Test todo"})
    todo_id = create_response.json()["id"]
    # Delete it
    delete_response = client.delete(f"/api/todos/{todo_id}")
    assert delete_response.status_code == 200
    # Check it's gone
    get_response = client.get(f"/api/todos/{todo_id}")
    assert get_response.status_code == 404
