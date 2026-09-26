from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database configuration
    DATABASE_URL: str = "sqlite:///./todos.db"  # Default for dev
    # For production, use Supabase connection string from env var
    
    # CORS configuration
    FRONTEND_ORIGIN: str = "http://localhost:3000"  # Default for dev
    
    class Config:
        env_file = ".env"

settings = Settings()
