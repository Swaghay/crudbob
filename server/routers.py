from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import get_db

router = APIRouter()

# ---------- LISTINGS ----------
@router.post("/api/listings", response_model=schemas.ListingWithID)
def create_listing(listing: schemas.TextbookListing, db: Session = Depends(get_db)):
    db_listing = models.Listing(**listing.model_dump())
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing

@router.put("/api/listings/{listing_id}", response_model=schemas.ListingWithID)
def update_listing(listing_id: int, updated: schemas.ListingUpdate, db: Session = Depends(get_db)):
    db_listing = db.query(models.Listing).filter(models.Listing.listing_id == listing_id).first()
    if not db_listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    for key, value in updated.model_dump(exclude_unset=True).items():
        setattr(db_listing, key, value)

    db.commit()
    db.refresh(db_listing)
    return db_listing

@router.get("/api/listings", response_model=List[schemas.ListingWithID])
def get_all_listings(db: Session = Depends(get_db)):
    return db.query(models.Listing).all()

@router.get("/api/listings/{listing_id}", response_model=schemas.ListingWithID)
def get_listing_by_id(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(models.Listing).filter(models.Listing.listing_id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.delete("/api/listings/{listing_id}")
def delete_listing(listing_id: int, db: Session = Depends(get_db)):
    db_listing = db.query(models.Listing).filter(models.Listing.listing_id == listing_id).first()
    if not db_listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    db.delete(db_listing)
    db.commit()
    return {"message": f"Listing {listing_id} deleted successfully"}


# ---------- USERS ----------
@router.post("/api/users", response_model=schemas.UserWithID)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    db_email = db.query(models.User).filter(models.User.email == user.email).first()
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/api/users", response_model=List[schemas.UserWithID])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@router.get("/api/users/{user_id}", response_model=schemas.UserWithID)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/api/users/{user_id}", response_model=schemas.UserWithID)
def update_user(user_id: int, updated: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in updated.model_dump(exclude_unset=True).items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/api/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    return {"message": f"User {user_id} deleted successfully"}
