import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-black">
      <header className="text-center p-4">
        <Image src="/logo-amarilo.png" alt="Amarilo" width={100} height={100} />
        <h1 className="text-3xl font-bold text-white mb-4">
          Rick and Morty API !
        </h1>
        <Link href="/characterDetails">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Ver detalles del personaje
          </button>
        </Link>
      </header>
    </div>
  );
}
