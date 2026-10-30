import sharp from 'sharp';

export class ImageOptimizer {
  /**
   * Recibe un string Base64 (con o sin prefijo data:image/...) y lo comprime usando sharp.
   * Retorna el string optimizado en formato WebP Base64 con prefijo data:image/webp;base64,.
   */
  public static async optimizeBase64(
    base64Str: string,
    options?: { maxWidth?: number; maxHeight?: number; quality?: number }
  ): Promise<string> {
    if (!base64Str || typeof base64Str !== 'string') {
      return base64Str;
    }

    // 1. Detectar si tiene el prefijo de data URI
    const matches = base64Str.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    
    let rawBase64 = base64Str;

    if (matches) {
      rawBase64 = matches[2];
    } else {
      // Si no tiene prefijo pero empieza con http, es una URL, no la procesamos
      if (base64Str.startsWith('http://') || base64Str.startsWith('https://')) {
        return base64Str;
      }
    }

    try {
      // 2. Convertir el base64 a Buffer
      const imageBuffer = Buffer.from(rawBase64, 'base64');
      
      // 3. Procesar con sharp
      let pipeline = sharp(imageBuffer);
      
      // Obtener metadatos para verificar si es una imagen válida
      const metadata = await pipeline.metadata();
      if (!metadata.format) {
        return base64Str; // No es un formato de imagen soportado
      }

      // Redimensionar si excede las dimensiones máximas
      const maxWidth = options?.maxWidth || 1000;
      const maxHeight = options?.maxHeight || 1000;
      
      if ((metadata.width && metadata.width > maxWidth) || (metadata.height && metadata.height > maxHeight)) {
        pipeline = pipeline.resize({
          width: maxWidth,
          height: maxHeight,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Comprimir a WebP con calidad optimizada
      const quality = options?.quality || 75;
      const compressedBuffer = await pipeline
        .webp({ quality })
        .toBuffer();

      // 4. Retornar con formato data URI de webp
      return `data:image/webp;base64,${compressedBuffer.toString('base64')}`;
    } catch (error) {
      console.error('Error optimizing image base64 with sharp:', error);
      return base64Str; // Ante cualquier error, fallback al original para no romper nada
    }
  }
}
