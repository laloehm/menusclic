/**
 * Optimiza la URL de una imagen externa para servirse con el tamaño correcto.
 * - Unsplash: usa sus params nativos de transformación (sin proxy externo)
 * - Cualquier otra URL: pasa por images.weserv.nl para redimensionar
 *
 * @param {string} url  URL original de la imagen
 * @param {number} [w=800]  Ancho deseado en píxeles
 * @returns {string} URL optimizada
 */
export function proxy(url, w = 800) {
  if (!url) return url;
  if (url.includes('unsplash.com')) {
    return `${url}?auto=format&fit=crop&w=${w}&q=80`;
  }
  // Firebase Storage y Google Cloud Storage ya son CDN propios — no necesitan proxy
  if (url.includes('firebasestorage.googleapis.com') || url.includes('storage.googleapis.com')) {
    return url;
  }
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${w}&fit=cover`;
}
