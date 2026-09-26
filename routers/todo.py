from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from models.todo import Todo
from schemas.todo import TodoCreate, TodoUpdate, Todo
from crud.todo import create_todo, get_todo, get_todos, update_todo, delete_todo
from settings import settings

router = APIRouter()

# Session dependency will be defined in main.py
def get_db():
    pass

@router.post("/todos/", response_model=Todo)
def create_todo_route(todo: TodoCreate, session: Session = Depends(get_db)):
    return create_todo(session=session, todo=todo)

@router.get("/todos/", response_model=List[Todo])
def read_todos(skip: int = 0, limit: int = 100, session: Session = Depends(get_db)):
    return get_todos(session=session, skip=skip, limit=limit)

@router.get("/todos/{todo_id}", response_model=Todo)
def read_todo(todo_id: int, session: Session = Depends(get_db)):
    db_todo = get_todo(session=session, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.put("/todos/{todo_id}", response_model=Todo)
def update_todo_route(todo_id: int, todo: TodoUpdate, session: Session = Depends(get_db)):
    db_todo = update_todo(session=session, todo_id=todo_id, todo=todo)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.delete("/todos/{todo_id}", response_model=Todo)
def delete_todo_route(todo_id: int, session: Session = Depends(get_db)):
    db_todo = delete_todo(session=session, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo
