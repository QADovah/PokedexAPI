-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'PokedexDB')
BEGIN
    CREATE DATABASE PokedexDB;
END
GO

USE PokedexDB;
GO

-- Types Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Types')
BEGIN
    CREATE TABLE Types (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(50) NOT NULL UNIQUE
    );
END
GO

-- Abilities Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Abilities')
BEGIN
    CREATE TABLE Abilities (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL UNIQUE,
        Description NVARCHAR(MAX)
    );
END
GO

-- Pokemons Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Pokemons')
BEGIN
    CREATE TABLE Pokemons (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Height FLOAT,
        Weight FLOAT,
        ImageUrl NVARCHAR(500),
        BaseExperience INT
    );
END
GO

-- PokemonTypes Junction Table (Many-to-Many)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PokemonTypes')
BEGIN
    CREATE TABLE PokemonTypes (
        PokemonId INT NOT NULL,
        TypeId INT NOT NULL,
        Slot INT NOT NULL, -- 1 for primary, 2 for secondary
        PRIMARY KEY (PokemonId, TypeId),
        FOREIGN KEY (PokemonId) REFERENCES Pokemons(Id) ON DELETE CASCADE,
        FOREIGN KEY (TypeId) REFERENCES Types(Id) ON DELETE CASCADE
    );
END
GO

-- PokemonAbilities Junction Table (Many-to-Many)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PokemonAbilities')
BEGIN
    CREATE TABLE PokemonAbilities (
        PokemonId INT NOT NULL,
        AbilityId INT NOT NULL,
        IsHidden BIT DEFAULT 0,
        PRIMARY KEY (PokemonId, AbilityId),
        FOREIGN KEY (PokemonId) REFERENCES Pokemons(Id) ON DELETE CASCADE,
        FOREIGN KEY (AbilityId) REFERENCES Abilities(Id) ON DELETE CASCADE
    );
END
GO
