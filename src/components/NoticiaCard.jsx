function NoticiaCard({ noticia, esFavorita, toggleFavorito }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 relative">
      <button
        onClick={() => toggleFavorito(noticia)}
        className="absolute top-2 right-2 text-xl"
        title={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {esFavorita ? "⭐" : "☆"}
      </button>

      {noticia.image && (
        <img
          src={noticia.image}
          alt={noticia.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}
      <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
        {noticia.title}
      </h2>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {noticia.description}
      </p>
      <a
        href={noticia.url}
        target="_blank"
        rel="noreferrer"
        className="text-indigo-600 mt-3 inline-block font-medium hover:underline"
      >
        Leer más →
      </a>
    </div>
  );
}

export default NoticiaCard;
