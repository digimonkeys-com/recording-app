from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine.url import URL

from settings import get_settings

app_settings = get_settings()

postgres_user = app_settings.postgres_user
postgres_db = app_settings.postgres_db
postgres_password = app_settings.postgres_password
postgres_host = app_settings.postgres_host
postgres_port = app_settings.postgres_port


SQLALCHEMY_DATABASE_URL = f"postgresql+pg8000://" \
                          f"{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}"
pool = create_engine(
    URL.create(
        drivername="postgresql+pg8000",
        username=postgres_user,
        password=postgres_password,
        host=postgres_host,
        port=postgres_port,
        database=postgres_db,
    ),
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=pool)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
