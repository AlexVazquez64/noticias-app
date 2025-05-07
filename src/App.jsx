import { useEffect, useState } from "react";
import NoticiaCard from "./components/NoticiaCard";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY; // Reemplaza esto luego con import desde archivo .env

function App() {
  const [noticias, setNoticias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [error, setError] = useState(null);
  const [idioma, setIdioma] = useState("es"); // por defecto español
  const [pagina, setPagina] = useState(1);
  const [terminoActivo, setTerminoActivo] = useState("");
  const [toast, setToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTimeout, setToastTimeout] = useState(null);
  const [toastType, setToastType] = useState("success");

  const obtenerNoticias = async (query = "", lang = "es", page = 1) => {
    try {
      const endpoint = query
        ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(
            query
          )}&lang=${lang}&page=${page}&token=${API_KEY}`
        : `https://gnews.io/api/v4/top-headlines?lang=${lang}&page=${page}&token=${API_KEY}`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setNoticias(data.articles);
    } catch (err) {
      console.error("Error al obtener noticias:", err);
    }
  };

  const toggleFavorito = (noticia) => {
    const existe = favoritos.find((item) => item.url === noticia.url);
    let nuevosFavoritos;

    if (existe) {
      nuevosFavoritos = favoritos.filter((item) => item.url !== noticia.url);
      mostrarToast("❌ Noticia eliminada de favoritos");
    } else {
      nuevosFavoritos = [...favoritos, noticia];
      mostrarToast("⭐ Noticia agregada a favoritos");
    }

    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 3000); // desaparece en 3 segundos
  };

  useEffect(() => {
    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  useEffect(() => {
    obtenerNoticias(terminoActivo, idioma, pagina);
  }, [idioma, pagina, terminoActivo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerminoActivo(busqueda.trim());
    setPagina(1);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 px-4 sm:px-6 py-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
        📰 Noticias Recientes
      </h1>

      <h2 className="text-center text-gray-600 mb-4">
        ⭐ Favoritos: {favoritos.length}
      </h2>

      {/* Buscador */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full max-w-xl gap-2"
        >
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto"
          >
            Buscar
          </button>
        </form>

        <select
          value={idioma}
          onChange={(e) => {
            setIdioma(e.target.value);
            setPagina(1);
          }}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
        >
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          onClick={() => setMostrarFavoritos(false)}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg transition ${
            !mostrarFavoritos
              ? "bg-indigo-600 text-white"
              : "bg-white border border-indigo-600 text-indigo-600"
          }`}
        >
          📰 Noticias
        </button>

        <button
          onClick={() => setMostrarFavoritos(true)}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg transition ${
            mostrarFavoritos
              ? "bg-yellow-500 text-white"
              : "bg-white border border-yellow-500 text-yellow-500"
          }`}
        >
          ⭐ Favoritos
        </button>
      </div>

      {mostrarFavoritos && (
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Favoritos ({favoritos.length})
          </h3>
        </div>
      )}
      {cargando && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      )}

      <div className="w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(mostrarFavoritos ? favoritos : noticias).length > 0 ? (
            (mostrarFavoritos ? favoritos : noticias).map((noticia, index) => (
              <NoticiaCard
                key={index}
                noticia={noticia}
                esFavorita={favoritos.some((item) => item.url === noticia.url)}
                toggleFavorito={toggleFavorito}
              />
            ))
          ) : (
            <>
              {/* Invisible placeholder para mantener el layout de 3 columnas */}
              <div className="col-span-full lg:col-span-3 min-h-[300px] flex flex-col items-center justify-center gap-4 text-center text-gray-500">
                {/* Ícono SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12.75v6a2.25 2.25 0 01-2.25 2.25h-10.5A2.25 2.25 0 014.5 18.75v-6m15 0L12 4.5m7.5 8.25H4.5"
                  />
                </svg>

                {/* Mensaje */}
                <p className="text-lg">
                  {mostrarFavoritos
                    ? "No tienes noticias favoritas aún."
                    : "No se encontraron noticias."}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {!mostrarFavoritos && (
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-2 sm:gap-4">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina((prev) => prev - 1)}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg border text-sm sm:text-base ${
              pagina === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            ⬅ Anterior
          </button>
          <span className="text-gray-700 font-medium text-sm sm:text-base">
            Página {pagina}
          </span>
          <button
            disabled={pagina === 10}
            onClick={() => setPagina((prev) => prev + 1)}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg border text-sm sm:text-base ${
              pagina === 10
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            Siguiente ➡
          </button>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500 z-50">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
