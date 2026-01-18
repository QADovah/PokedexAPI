from server.data.database import SessionLocal
from server.services import pokemon_service
from server.models import models
import sys
import traceback

print("Starting debug...")

try:
    db = SessionLocal()
    print("Database session created.")
    
    print("Attempting to fetch pokemons...")
    # This is the exact call failing in the API
    pokemons = pokemon_service.get_pokemons(db, skip=0, limit=100)
    
    print(f"Successfully fetched {len(pokemons)} pokemons.")
    for p in pokemons:
        print(f" - {p.Name} (Types: {len(p.Types)})")
        
except Exception:
    print("CRASH DETECTED!")
    traceback.print_exc()
finally:
    db.close()
