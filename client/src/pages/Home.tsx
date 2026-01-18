import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemons } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { Search } from 'lucide-react';

export const Home: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = async () => {
        try {
            const data = await getPokemons();
            setPokemons(data);
        } catch (error) {
            console.error("Failed to load pokemons", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPokemons = pokemons.filter(p =>
        p.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar Pokemon..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {loading ? (
                <div className="loading-state">Loading Database...</div>
            ) : (
                <div className="pokemon-grid">
                    {filteredPokemons.map(pokemon => (
                        <PokemonCard
                            key={pokemon.Id}
                            pokemon={pokemon}
                            onClick={(id) => navigate(`/pokemon/${id}`)}
                        />
                    ))}
                    {filteredPokemons.length === 0 && (
                        <div className="empty-state">No Pokemon found.</div>
                    )}
                </div>
            )}
        </div>
    );
};
