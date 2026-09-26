from sqlmodel import Session, select
from models.todo import Todo
from schemas.todo import TodoCreate, TodoUpdate

def create_todo(session: Session, todo: TodoCreate) -> Todo:
    db_todo = Todo.model_validate(todo)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

def get_todo(session: Session, todo_id: int) -> Todo | None:
    return session.get(Todo, todo_id)

def get_todos(session: Session, skip: int = 0, limit: int = 100) -> list[Todo]:
    return session.exec(select(Todo).offset(skip).limit(limit)).all()

def update_todo(session: Session, todo_id: int, todo: TodoUpdate) -> Todo | None:
    db_todo = session.get(Todo, todo_id)
    if db_todo:
        todo_data = todo.model_dump(exclude_unset=True)
        for key, value in todo_data.items():
            setattr(db_todo, key, value)
        session.add(db_todo)
        session.commit()
        session.refresh(db_todo)
    return db_todo

def delete_todo(session: Session, todo_id: int) -> Todo | None:
    db_todo = session.get(Todo, todo_id)
    if db_todo:
        session.delete(db_todo)
        session.commit()
    return db_todo
