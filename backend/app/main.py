import uvicorn
from fastapi import FastAPI,HTTPException,Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.app.database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from models import User

app = FastAPI()
origins=["http://localhost:5173"]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])
class UserBase(BaseModel):
    email: str
    password: str
class UserModel(UserBase):
    id: int
    class Config:
        orm_mode = True
class EmployeeBase(BaseModel):
    name: str
    role: str
    avatar: str
    skills: List[str]

class EmployeeModel(EmployeeBase):
    id: int
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency=Annotated[Session,Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post("/users",response_model=UserModel)
async def create_user(user: UserBase, db:db_dependency):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    if "@" in user.email and len(user.password)>7:
      new_user = User(email=user.email, password=user.password)
      db.add(new_user)
      db.commit()
      db.refresh(new_user)
      return new_user
    else:
        return {"message": "Failed to be registered"}

@app.post("/employees",response_model=EmployeeModel)
async def create_employee(employee: EmployeeBase, db:db_dependency):
    db_employee= models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/users",response_model=List[UserModel])
async def get_users(db:db_dependency):
    users=db.query(models.User).all()
    return users
@app.get("/employees",response_model=List[EmployeeModel])
async def get_employees(db:db_dependency):
    employees=db.query(models.Employee).all()
    return employees
if __name__=="__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)


