from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, Session, create_engine
from settings import settings
from routers.todo import router as todo_router
from db import engine, create_db_and_tables, get_db


app = FastAPI()


# Create tables on startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()


# Include routers
app.include_router(todo_router, prefix="/api")

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}
