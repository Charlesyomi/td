from sqlmodel import SQLModel, Session, create_engine
from settings import settings

engine = create_engine(settings.DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_db():
    with Session(engine) as session:
        yield session
