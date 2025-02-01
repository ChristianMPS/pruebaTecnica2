"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "./button";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results);
      console.log(data);
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) return <p>Cargando personajes...</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Especie</TableHead>
          <TableHead>Genero</TableHead>
          <TableHead>Imagen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-8 overflow-y-auto">
        {characters.length > 0 ? (
          characters.map((characters) => (
            <TableRow key={characters.id}>
              <TableCell>{characters.id}</TableCell>
              <TableCell>{characters.name}</TableCell>
              <TableCell>{characters.status}</TableCell>
              <TableCell>{characters.species}</TableCell>
              <TableCell>{characters.gender}</TableCell>
              <TableCell>{characters.image}</TableCell>
              <TableCell>
                <Button disabled={loading} colors="edit" className="w-32">
                  Detalle del personaje
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No hay personajes disponibles
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CharacterList;
