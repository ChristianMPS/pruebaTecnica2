import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-black p-8">
        <header className="w-full p-4">
          <Image
            src="/logo-amarilo.png"
            alt="Amarilo"
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Rick and Morty API !
          </h1>
        </header>
      </div>
    </div>
  );
}
