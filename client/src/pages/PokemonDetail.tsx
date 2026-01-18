import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemon, deletePokemon } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import { ArrowLeft, Trash2, Edit } from 'lucide-react';

export const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) loadPokemon(parseInt(id));
    }, [id]);

    const loadPokemon = async (pokemonId: number) => {
        try {
            const data = await getPokemon(pokemonId);
            setPokemon(data);
        } catch (error) {
            console.error("Failed to load pokemon", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!pokemon || !confirm('Are you sure you want to release this Pokemon?')) return;
        try {
            await deletePokemon(pokemon.Id);
            navigate('/');
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    if (loading) return <div>Cargando Datos...</div>;
    if (!pokemon) return <div>Pokémon no encontrado</div>;

    return (
        <div className="detail-page">
            <button onClick={() => navigate(-1)} className="btn btn-back">
                <ArrowLeft size={16} /> Volver
            </button>

            <div className="detail-card">
                <div className="detail-header">
                    {pokemon.ImageUrl ? (
                        <img src={pokemon.ImageUrl} alt={pokemon.Name} className="detail-image" />
                    ) : (
                        <div className="pokemon-placeholder large">?</div>
                    )}
                    <div>
                        <h1 className="detail-name">{pokemon.Name}</h1>
                        <div className="detail-types">
                            {pokemon.Types?.map(t => <span key={t.Id} className="type-badge large">{t.Name}</span>)}
                        </div>
                    </div>
                </div>

                <div className="detail-stats">
                    <div className="stat-item">
                        <label>Altura</label>
                        <span>{pokemon.Height} m</span>
                    </div>
                    <div className="stat-item">
                        <label>Peso</label>
                        <span>{pokemon.Weight} kg</span>
                    </div>
                    <div className="stat-item">
                        <label>XP Base</label>
                        <span>{pokemon.BaseExperience}</span>
                    </div>
                </div>

                <div className="detail-abilities">
                    <h3>Habilidades</h3>
                    <div className="abilities-list">
                        {pokemon.Abilities?.map(a => (
                            <div key={a.Id} className="ability-tag">{a.Name}</div>
                        ))}
                    </div>
                </div>

                <div className="detail-actions">
                    <button className="btn btn-secondary" onClick={() => navigate(`/edit/${pokemon.Id}`)}><Edit size={16} /> Editar</button>
                    <button className="btn btn-danger" onClick={handleDelete}><Trash2 size={16} /> Liberar</button>
                </div>
            </div>
        </div>
    );
};
