from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from server.data.database import Base

class Pokemon(Base):
    __tablename__ = "Pokemons"

    Id = Column(Integer, primary_key=True, index=True)
    Name = Column(String(100), nullable=False)
    Height = Column(Float)
    Weight = Column(Float)
    ImageUrl = Column(String(500))
    BaseExperience = Column(Integer)

    # Relationships
    pokemon_types = relationship("PokemonType", back_populates="pokemon", cascade="all, delete-orphan")
    pokemon_abilities = relationship("PokemonAbility", back_populates="pokemon", cascade="all, delete-orphan")

    @property
    def Types(self):
        return [pt.type for pt in self.pokemon_types]

    @property
    def Abilities(self):
        return [pa.ability for pa in self.pokemon_abilities]

class Type(Base):
    __tablename__ = "Types"

    Id = Column(Integer, primary_key=True, index=True)
    Name = Column(String(50), unique=True, nullable=False)

    # Relationships
    pokemons = relationship("PokemonType", back_populates="type")

class Ability(Base):
    __tablename__ = "Abilities"

    Id = Column(Integer, primary_key=True, index=True)
    Name = Column(String(100), unique=True, nullable=False)
    Description = Column(String)

    # Relationships
    pokemons = relationship("PokemonAbility", back_populates="ability")

class PokemonType(Base):
    __tablename__ = "PokemonTypes"

    PokemonId = Column(Integer, ForeignKey("Pokemons.Id"), primary_key=True)
    TypeId = Column(Integer, ForeignKey("Types.Id"), primary_key=True)
    Slot = Column(Integer, default=1) # 1 or 2

    pokemon = relationship("Pokemon", back_populates="pokemon_types")
    type = relationship("Type", back_populates="pokemons")

class PokemonAbility(Base):
    __tablename__ = "PokemonAbilities"

    PokemonId = Column(Integer, ForeignKey("Pokemons.Id"), primary_key=True)
    AbilityId = Column(Integer, ForeignKey("Abilities.Id"), primary_key=True)
    IsHidden = Column(Boolean, default=False)

    pokemon = relationship("Pokemon", back_populates="pokemon_abilities")
    ability = relationship("Ability", back_populates="pokemons")
