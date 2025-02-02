"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/button";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: [];
}
const CharacterDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        try {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/${id}`
          );
          const data = await response.json();
          setCharacter(data);
        } catch (error) {
          console.error("Error fetching character details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCharacter();
    }
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;

  if (!character) return <p>No se encontró el personaje.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8">
      <h1 className="text-3xl font-bold text-white mb-4 flex items-center">
        <Avatar className="w-[30px] h-[30px] sm:w-[30px] sm:h-[30px] mr-2">
          <AvatarImage src={character.image} />
          <AvatarFallback className="text-white font-bold">
            {character.name[0]}
          </AvatarFallback>
        </Avatar>
        Detalles del personaje:
      </h1>

      <div className="w-full max-w-[90%] md:max-w-[40rem] p-1 h-full">
        <Card className="h-full">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full text-white bg-gray-700 rounded-lg cursor-pointer">
            <Avatar className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]">
              <AvatarImage src={character.image} />
              <AvatarFallback className="text-white font-bold">
                {character.name[0]}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-xl font-bold mt-4">Name: {character.name}</h3>
            <h3 className="text-xl font-bold mt-4">
              Status: {character.status}
            </h3>
            <h3 className="text-xl font-bold mt-4">
              Species: {character.species}
            </h3>
            <h3 className="text-xl font-bold mt-4">
              Gender: {character.gender}
            </h3>
            <h3 className="text-xl font-bold mt-4">
              First seen in: {character.origin.name}
            </h3>
            <h3 className="text-xl font-bold mt-4">
              Last known location: {character.location.name}
            </h3>
            <h3 className="text-xl font-bold mt-4">
              Number of episodes: {character.episode.length}
            </h3>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => router.back()}
            colors="edit"
            className="w-full max-w-[40rem] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 sm:w-[200px]"
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
