from sqlalchemy import create_engine, Column, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine("sqlite:///./cache.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class ContainerCache(Base):
    __tablename__ = "containers"

    name = Column(String, primary_key=True)
    cleared = Column(Boolean, default=False)
    deleted = Column(Boolean, default=False)

Base.metadata.create_all(bind=engine)
