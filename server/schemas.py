from pydantic import BaseModel
from typing import Optional
from enums import ConditionEnum


# ---------- LISTINGS ----------
class TextbookListing(BaseModel):
    title: str
    author: str
    isbn: Optional[str] = None
    edition: Optional[str] = None
    course_code: str
    price: float
    condition: ConditionEnum
    user_id: int
    description: str
    view_count: int = 0

    class Config:
        orm_mode = True


class ListingWithID(TextbookListing):
    listing_id: int


class ListingUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    isbn: Optional[str] = None
    edition: Optional[str] = None
    course_code: Optional[str] = None
    price: Optional[float] = None
    condition: Optional[ConditionEnum] = None
    user_id: Optional[int] = None
    description: Optional[str] = None
    view_count: Optional[int] = None

    class Config:
        orm_mode = True


# ---------- USERS ----------
class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(UserBase):
    password: str


class UserWithID(UserBase):
    user_id: int

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

    class Config:
        orm_mode = True
