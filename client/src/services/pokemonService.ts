import axios from 'axios';
import type { Pokemon, CreatePokemonDto } from '../types/pokemon';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1/pokemons';

const api = axios.create({
    baseURL: API_URL,
});

export const getPokemons = async (skip = 0, limit = 100): Promise<Pokemon[]> => {
    const response = await api.get(`/?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createPokemon = async (pokemon: CreatePokemonDto): Promise<Pokemon> => {
    const response = await api.post('/', pokemon);
    return response.data;
};

export const deletePokemon = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};

export const updatePokemon = async (id: number, pokemon: Partial<CreatePokemonDto>): Promise<Pokemon> => {
    const response = await api.put(`/${id}`, pokemon);
    return response.data;
};
