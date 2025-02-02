import Grafic from "@/components/grafic";
import CharacterList from "@/components/list";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-black">
      <div className="flex-1 bg-black p-8">
        <header className="text-center p-4">
          <Image
            src="/logo-amarilo.png"
            alt="Amarilo"
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold text-white mb-4">
            Rick and Morty characters:
          </h1>
        </header>
        
        <div className="w-full max-w-4xl mx-auto flex-grow ">
          <h1 className="text-3xl font-bold mb-6 mt-4">List of characters: </h1>
          <CharacterList />
        </div>
        <div className="w-full max-w-4xl mx-auto flex-grow ">
          <h1 className="text-3xl font-bold mb-6 mt-4">Grafics: </h1>
          <Grafic />
        </div>
      </div>
    </div>
  );
}
