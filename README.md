# 📰 NewsRadar

**NewsRadar** es una aplicación web responsive construida con React + Vite + TailwindCSS que permite buscar y visualizar noticias en tiempo real a través de la API de [GNews.io](https://gnews.io/).

## 🔍 Funcionalidades

- Búsqueda de noticias por palabra clave
- Filtros por idioma (Español / Inglés)
- Paginación de resultados
- Marcado de noticias como favoritas (persistente con LocalStorage)
- Notificaciones visuales (toast)
- Diseño responsive optimizado para móviles y escritorio

## 📸 Captura

![NewsRadar Screenshot](./public/screenshot.png)

## 🌐 Demo en línea

[noticias-app-tawny.vercel.app](noticias-app-tawny.vercel.app)

## 🚀 Tecnologías

- React
- Vite
- Tailwind CSS
- GNews API

## 🛠️ Instalación local

```bash
git clone https://github.com/jandocode/newsradar.git
cd newsradar
npm install
npm run dev
````

Crea un archivo `.env` y agrega tu clave de API de GNews:

```env
VITE_GNEWS_API_KEY=tu_clave_api_aquí
```

## 🧑‍💻 Autor

Creado con 💻 por [jandocode](https://github.com/jandocode)
