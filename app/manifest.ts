import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TUWEBHOY',
    short_name: 'TUWEBHOY',
    description: 'Páginas web que sirven',
    start_url: '/',
    display: 'standalone', // 👈 ESTO ES CLAVE: Hace que se abra sin la barra de direcciones de Chrome, como una app nativa
    background_color: '#ffffff',
    theme_color: '#2563eb', // Tu azul principal
    icons: [
      {
        src: '/icon.jpg', // Next.js lo va a leer del archivo que subiste en el Paso 2
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}