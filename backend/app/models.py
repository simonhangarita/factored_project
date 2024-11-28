from backend.app.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.sqlite import JSON
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True,index=True)
    email=Column(String, unique=True, nullable=False)
    password=Column(String,nullable=False)
class Employee(Base):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True)
    name=Column(String,nullable=False)
    role=Column(String,nullable=False)
    avatar=Column(String,nullable=False)
    skills=Column(JSON,nullable=False)

