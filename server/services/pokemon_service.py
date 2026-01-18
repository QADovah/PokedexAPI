from sqlalchemy.orm import Session, joinedload
from server.models import models
from server.schemas import schemas

def get_pokemon(db: Session, pokemon_id: int):
    return db.query(models.Pokemon).options(
        joinedload(models.Pokemon.pokemon_types).joinedload(models.PokemonType.type),
        joinedload(models.Pokemon.pokemon_abilities).joinedload(models.PokemonAbility.ability)
    ).filter(models.Pokemon.Id == pokemon_id).first()

def get_pokemons(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Pokemon).options(
        joinedload(models.Pokemon.pokemon_types).joinedload(models.PokemonType.type),
        joinedload(models.Pokemon.pokemon_abilities).joinedload(models.PokemonAbility.ability)
    ).order_by(models.Pokemon.Id).offset(skip).limit(limit).all()

def create_pokemon(db: Session, pokemon: schemas.PokemonCreate):
    # Create the Pokemon instance
    db_pokemon = models.Pokemon(
        Name=pokemon.Name,
        Height=pokemon.Height,
        Weight=pokemon.Weight,
        ImageUrl=pokemon.ImageUrl,
        BaseExperience=pokemon.BaseExperience
    )
    db.add(db_pokemon)
    db.commit() # Commit to get the ID
    db.refresh(db_pokemon)

    # Handle Types
    if pokemon.Types:
        for type_name in pokemon.Types:
            # Check if type exists, else create it (conceptually, or error out. Here we create if missing for simplicity or query existing)
            db_type = db.query(models.Type).filter(models.Type.Name == type_name).first()
            if not db_type:
                db_type = models.Type(Name=type_name)
                db.add(db_type)
                db.commit()
                db.refresh(db_type)
            
            # Create relationship
            db_rel = models.PokemonType(PokemonId=db_pokemon.Id, TypeId=db_type.Id)
            db.add(db_rel)

    # Handle Abilities (Similar logic)
    if pokemon.Abilities:
        for ability_name in pokemon.Abilities:
            db_ability = db.query(models.Ability).filter(models.Ability.Name == ability_name).first()
            if not db_ability:
                db_ability = models.Ability(Name=ability_name)
                db.add(db_ability)
                db.commit()
                db.refresh(db_ability)
            
            db_rel_ability = models.PokemonAbility(PokemonId=db_pokemon.Id, AbilityId=db_ability.Id)
            db.add(db_rel_ability)

    db.commit()
    db.refresh(db_pokemon)
    return db_pokemon

def update_pokemon(db: Session, pokemon_id: int, pokemon: schemas.PokemonUpdate):
    # Fetch existing
    db_pokemon = get_pokemon(db, pokemon_id)
    if not db_pokemon:
        return None

    # Update basic fields
    if pokemon.Name is not None: db_pokemon.Name = pokemon.Name
    if pokemon.Height is not None: db_pokemon.Height = pokemon.Height
    if pokemon.Weight is not None: db_pokemon.Weight = pokemon.Weight
    if pokemon.ImageUrl is not None: db_pokemon.ImageUrl = pokemon.ImageUrl
    if pokemon.BaseExperience is not None: db_pokemon.BaseExperience = pokemon.BaseExperience

    # Update Types (Full overwrite strategy)
    if pokemon.Types is not None:
        # Remove old relationships
        db.query(models.PokemonType).filter(models.PokemonType.PokemonId == pokemon_id).delete()
        # Add new ones
        for type_name in pokemon.Types:
            db_type = db.query(models.Type).filter(models.Type.Name == type_name).first()
            if not db_type:
                db_type = models.Type(Name=type_name)
                db.add(db_type)
                db.commit()
                db.refresh(db_type)
            db_rel = models.PokemonType(PokemonId=pokemon_id, TypeId=db_type.Id)
            db.add(db_rel)

    # Update Abilities (Full overwrite strategy)
    if pokemon.Abilities is not None:
        # Remove old relationships
        db.query(models.PokemonAbility).filter(models.PokemonAbility.PokemonId == pokemon_id).delete()
        # Add new ones
        for ability_name in pokemon.Abilities:
            db_ability = db.query(models.Ability).filter(models.Ability.Name == ability_name).first()
            if not db_ability:
                db_ability = models.Ability(Name=ability_name)
                db.add(db_ability)
                db.commit()
                db.refresh(db_ability)
            db_rel = models.PokemonAbility(PokemonId=pokemon_id, AbilityId=db_ability.Id)
            db.add(db_rel)

    db.commit()
    db.refresh(db_pokemon)
    return db_pokemon

def delete_pokemon(db: Session, pokemon_id: int):
    db_pokemon = db.query(models.Pokemon).filter(models.Pokemon.Id == pokemon_id).first()
    if db_pokemon:
        db.delete(db_pokemon)
        db.commit()
    return db_pokemon
