from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
from pydantic import NaiveDatetime


class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    status: bool = Field(default=False)
    created_at: NaiveDatetime = Field(default_factory=datetime.utcnow)
