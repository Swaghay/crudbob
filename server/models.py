from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from enums import ConditionEnum
from sqlalchemy.types import Enum as SQLEnum
from sqlalchemy.orm import relationship
from database import Base

class Listing(Base):
    __tablename__ = "listings"

    listing_id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    isbn = Column(String, nullable=True)
    edition = Column(String, nullable=True)
    course_code = Column(String)
    price = Column(Float)
    condition = Column(Integer)  # store enum as int
    user_id = Column(Integer, ForeignKey("users.user_id"))  # foreign key
    description = Column(String)
    view_count = Column(Integer, default=0)

    user = relationship("User", back_populates="listings")

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)

    listings = relationship("Listing", back_populates="user")