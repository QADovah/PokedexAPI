import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPokemon, getPokemon, updatePokemon } from '../services/pokemonService';
import type { CreatePokemonDto } from '../types/pokemon';

export const CreatePokemon: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<CreatePokemonDto>({
        Name: '',
        Height: 0,
        Weight: 0,
        ImageUrl: '',
        BaseExperience: 0,
        Types: [],
        Abilities: []
    });
    const [typesInput, setTypesInput] = useState('');
    const [abilitiesInput, setAbilitiesInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getPokemon(parseInt(id)).then(data => {
                setFormData({
                    Name: data.Name,
                    Height: data.Height || 0,
                    Weight: data.Weight || 0,
                    ImageUrl: data.ImageUrl || '',
                    BaseExperience: data.BaseExperience || 0,
                    Types: [], Abilities: []
                });
                // Flatten types/abilities for input
                setTypesInput(data.Types?.map(t => t.Name).join(', ') || '');
                setAbilitiesInput(data.Abilities?.map(a => a.Name).join(', ') || '');
            }).catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                Types: typesInput.split(',').map(s => s.trim()).filter(Boolean),
                Abilities: abilitiesInput.split(',').map(s => s.trim()).filter(Boolean)
            };

            if (isEditMode && id) {
                await updatePokemon(parseInt(id), payload);
            } else {
                await createPokemon(payload);
            }
            navigate('/');
        } catch (error) {
            console.error("Failed to save", error);
        }
    };

    return (
        <div className="create-page">
            <h2>{isEditMode ? 'Editar Pokémon' : 'Registrar Nuevo Pokémon'}</h2>
            <form onSubmit={handleSubmit} className="card form-card">
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        required
                        value={formData.Name}
                        onChange={e => setFormData({ ...formData, Name: e.target.value })}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Altura (m)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={formData.Height}
                            onChange={e => setFormData({ ...formData, Height: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Peso (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={formData.Weight}
                            onChange={e => setFormData({ ...formData, Weight: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="form-group">
                        <label>XP Base</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="number"
                                value={formData.BaseExperience}
                                onChange={e => setFormData({ ...formData, BaseExperience: parseInt(e.target.value) })}
                            />
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setFormData({ ...formData, BaseExperience: Math.floor(Math.random() * 300) + 50 })}
                                title="Generar Aleatorio"
                            >
                                🎲
                            </button>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>URL de Imagen</label>
                    <input
                        type="url"
                        placeholder="https://ejemplo.com/sprite.png"
                        value={formData.ImageUrl}
                        onChange={e => setFormData({ ...formData, ImageUrl: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Tipos (separados por coma)</label>
                    <input
                        type="text"
                        placeholder="Fuego, Volador"
                        value={typesInput}
                        onChange={e => setTypesInput(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Habilidades (separadas por coma)</label>
                    <input
                        type="text"
                        placeholder="Mar Llamas, Poder Solar"
                        value={abilitiesInput}
                        onChange={e => setAbilitiesInput(e.target.value)}
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn" onClick={() => navigate(-1)}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">
                        {isEditMode ? 'Guardar Cambios' : 'Registrar'}
                    </button>
                </div>
            </form>
        </div>
    );
};
