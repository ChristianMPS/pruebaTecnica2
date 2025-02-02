"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";

interface Character {
  id: number;
  name: string;
  image: string;
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results);
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
                <Link href={`/characterDetails?id=${character.id}`}>
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full text-white bg-gray-700 rounded-lg cursor-pointer">
                    <Avatar className="w-[250px] h-[250px]">
                      <AvatarImage src={character.image} />
                      <AvatarFallback className="text-white font-bold">
                        {character.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="text-xl font-bold mt-4">
                      Name: {character.name}
                    </h3>
                  </CardContent>
                </Link>
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
