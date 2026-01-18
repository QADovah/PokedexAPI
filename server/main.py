from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.data.database import engine, Base
from server.api import pokemons

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Pokedex API",
    description="Backend for the Pokedex Application",
    version="1.0.0"
)

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Explicit origins for credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pokemons.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Pokedex API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
