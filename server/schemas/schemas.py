from pydantic import BaseModel, Field
from typing import List, Optional

# --- Shared Properties ---
class TypeBase(BaseModel):
    Name: str

class TypeCreate(TypeBase):
    pass

class TypeSchema(TypeBase):
    Id: int

    class Config:
        from_attributes = True

class AbilityBase(BaseModel):
    Name: str
    Description: Optional[str] = None

class AbilityCreate(AbilityBase):
    pass

class AbilitySchema(AbilityBase):
    Id: int

    class Config:
        from_attributes = True

# --- Pokemon Schemas ---

class PokemonBase(BaseModel):
    Name: str
    Height: Optional[float] = None
    Weight: Optional[float] = None
    ImageUrl: Optional[str] = None
    BaseExperience: Optional[int] = None

class PokemonCreate(PokemonBase):
    # We accept a list of Type names and Ability names to create relationships easily
    Types: List[str] = [] 
    Abilities: List[str] = []

class PokemonUpdate(PokemonBase):
    Name: Optional[str] = None
    Types: Optional[List[str]] = None
    Abilities: Optional[List[str]] = None

class PokemonSchema(PokemonBase):
    Id: int
    Types: List[TypeSchema] = [] # Simplified representation
    Abilities: List[AbilitySchema] = []

    class Config:
        from_attributes = True

# Custom response model to include Types properly if needed
# For now, we rely on the ORM conversion
