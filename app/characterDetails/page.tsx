import Link from "next/link";

const CharacterDetails = () => {
  return (
    <div>
      <h1>Detalles del Personaje</h1>
      <p> detalles del personaje seleccionado.</p>
      <Link href="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
};

export default CharacterDetails;
