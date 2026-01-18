from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from server.data.database import get_db
from server.schemas import schemas
from server.services import pokemon_service

router = APIRouter(
    prefix="/api/v1/pokemons",
    tags=["pokemons"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.PokemonSchema, status_code=201)
def create_pokemon(pokemon: schemas.PokemonCreate, db: Session = Depends(get_db)):
    return pokemon_service.create_pokemon(db=db, pokemon=pokemon)

@router.get("/", response_model=List[schemas.PokemonSchema])
def read_pokemons(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pokemons = pokemon_service.get_pokemons(db, skip=skip, limit=limit)
    return pokemons

@router.get("/{pokemon_id}", response_model=schemas.PokemonSchema)
def read_pokemon(pokemon_id: int, db: Session = Depends(get_db)):
    db_pokemon = pokemon_service.get_pokemon(db, pokemon_id=pokemon_id)
    if db_pokemon is None:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return db_pokemon

@router.put("/{pokemon_id}", response_model=schemas.PokemonSchema)
def update_pokemon(pokemon_id: int, pokemon: schemas.PokemonUpdate, db: Session = Depends(get_db)):
    db_pokemon = pokemon_service.update_pokemon(db, pokemon_id=pokemon_id, pokemon=pokemon)
    if not db_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return db_pokemon

@router.delete("/{pokemon_id}")
def delete_pokemon(pokemon_id: int, db: Session = Depends(get_db)):
    db_pokemon = pokemon_service.delete_pokemon(db, pokemon_id=pokemon_id)
    if not db_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return {"ok": True}
