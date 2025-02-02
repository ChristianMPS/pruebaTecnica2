"use client";

import { useCallback, useEffect, useState } from "react";

import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
}

const Grafic = () => {
  const [loading, setLoading] = useState(true);
  const [speciesData, setSpeciesData] = useState<
    { name: string; count: number }[]
  >([]);
  const [genderData, setGenderData] = useState<
    { name: string; count: number }[]
  >([]);
  const fetchCharacters = useCallback(async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      getGenderData(data.results);
      getSpeciesData(data.results);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSpeciesData = (characters: Character[]) => {
    const speciesCount: { [key: string]: number } = {};

    characters.forEach((character) => {
      speciesCount[character.species] =
        (speciesCount[character.species] || 0) + 1;
    });

    const speciesArray = Object.keys(speciesCount).map((key) => ({
      name: key,
      count: speciesCount[key],
    }));

    setSpeciesData(speciesArray);
  };

  const getGenderData = (characters: Character[]) => {
    const speciesCount: { [key: string]: number } = {};

    characters.forEach((character) => {
      speciesCount[character.gender] =
        (speciesCount[character.gender] || 0) + 1;
    });

    const speciesArray = Object.keys(speciesCount).map((key) => ({
      name: key,
      count: speciesCount[key],
    }));

    setGenderData(speciesArray);
  };

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  if (loading) return <p>Cargando personajes...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Number of characters by species:
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={speciesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-2xl font-bold mb-4">
        Number of characters by gender:
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={genderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Grafic;
