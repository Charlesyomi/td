from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TodoBase(BaseModel):
    title: str
    status: bool = False


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[bool] = None


class Todo(TodoBase):
    id: int
    created_at: datetime

    class Config:
        model_config = {"from_attributes": True}
