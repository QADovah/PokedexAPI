import React from 'react';
import type { Pokemon } from '../types/pokemon';
import './PokemonCard.css';

interface Props {
    pokemon: Pokemon;
    onClick: (id: number) => void;
}

export const PokemonCard: React.FC<Props> = ({ pokemon, onClick }) => {
    return (
        <div className="pokemon-card" onClick={() => onClick(pokemon.Id)}>
            <div className="pokemon-image-container">
                {pokemon.ImageUrl ? (
                    <img src={pokemon.ImageUrl} alt={pokemon.Name} className="pokemon-image" />
                ) : (
                    <div className="pokemon-placeholder">?</div>
                )}
            </div>
            <div className="pokemon-info">
                <h3 className="pokemon-name">{pokemon.Name}</h3>
                <div className="pokemon-types">
                    {pokemon.Types?.map(type => (
                        <span key={type.Id} className="type-badge">{type.Name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};
