from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import router  # import the router
import models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router)

origins = [
    "http://localhost:3000",  # your React dev server
    "http://127.0.0.1:3000",
    # add any other origins you need
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all origins (less secure)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)