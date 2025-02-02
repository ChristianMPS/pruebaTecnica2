"use client";

import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

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

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

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
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-[40rem] max-h-[40rem]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-mt-1 h-[400px]">
        {characters.map((character) => (
          <CarouselItem
            key={character.id}
            className="pt-1 md:basis-1/2 h-[400px]"
          >
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 h-full text-white bg-gray-700 rounded-lg">
                  {/* Aquí el avatar (opcional) */}
                  <Avatar className="w-[150px] h-[150px]">
                    <AvatarImage src={character.image} />
                    <AvatarFallback className="text-white font-bold">
                      {character.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  {/* Nombre en negrita y blanco */}
                  <h3 className="text-xl font-bold mt-4">
                    Name: {character.name}
                  </h3>

                  {/* Otros textos en blanco y negrita */}
                  <p className="text-sm font-bold">
                    Species: {character.species}
                  </p>
                  <p className="text-sm font-bold">
                    Status: {character.status}
                  </p>
                  <p className="text-sm font-bold">
                    Gender: {character.gender}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CharacterList;
