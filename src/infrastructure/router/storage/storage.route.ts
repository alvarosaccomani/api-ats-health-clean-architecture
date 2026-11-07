import { Express } from "express";
import { R2StorageService } from "../../services/r2-storage.service";
import { StorageUseCase } from "../../../application/storage/storage-use-case";
import { StorageController } from "../../controller/storage/storage.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureStorageRoutes(app: Express, _socketAdapter?: SocketAdapter) {
    /*
     * Iniciar adaptadores de infraestructura
     */
    const r2StorageService = new R2StorageService();

    /*
     * Iniciar casos de uso
     */
    const storageUseCase = new StorageUseCase(
        r2StorageService,
        r2StorageService.publicBucket,
        r2StorageService.privateBucket,
        process.env.STORAGE_APP_PREFIX || 'ats-health'
    );

    /*
     * Iniciar controlador
     */
    const storageCtrl = new StorageController(storageUseCase);
    const basePrefix = (process.env.BASE_URL_API || 'api').replace(/^\/+|\/+$/g, '');

    /**
     * @swagger
     * /storage/presigned-upload:
     *   post:
     *     tags:
     *       - Storage
     *     summary: Obtener URL prefirmada para subida directa a Cloudflare R2
     *     description: Genera una URL prefirmada (Presigned URL) para que el frontend suba archivos binarios directamente a Cloudflare R2 mediante HTTP PUT sin pasar por el servidor Node.js.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - filename
     *               - contentType
     *             properties:
     *               usr_uuid:
     *                 type: string
     *                 description: UUID del usuario autenticado que sube el archivo (opcional si se envía token)
     *               filename:
     *                 type: string
     *                 example: historia_clinica.pdf
     *               contentType:
     *                 type: string
     *                 example: application/pdf
     *               bucketType:
     *                 type: string
     *                 enum: [public, private]
     *                 default: private
     *               folder:
     *                 type: string
     *                 example: attachments
     *               expiresInSeconds:
     *                 type: number
     *                 default: 300
     *     responses:
     *       200:
     *         description: URL prefirmada generada exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                 data:
     *                   type: object
     *                   properties:
     *                     uploadUrl:
     *                       type: string
     *                       description: URL prefirmada para hacer el PUT del archivo
     *                     key:
     *                       type: string
     *                       description: Clave única asignada al archivo en el bucket
     *                     bucket:
     *                       type: string
     *                     bucketType:
     *                       type: string
     *                     publicUrl:
     *                       type: string
     *                       nullable: true
     *                     expiresIn:
     *                       type: number
     *       400:
     *         description: Datos inválidos o tipo MIME no permitido.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${basePrefix}/storage/presigned-upload`, authMiddleware, storageCtrl.getUploadPresignedUrlCtrl);

    /**
     * @swagger
     * /storage/presigned-download:
     *   post:
     *     tags:
     *       - Storage
     *     summary: Obtener URL prefirmada temporal para visualizar o descargar un archivo privado
     *     description: Genera una URL temporal firmada para acceder a objetos alojados en el bucket privado.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - key
     *             properties:
     *               key:
     *                 type: string
     *                 description: Clave o path del objeto en el bucket privado
     *                 example: ats-health/attachments/usr-123/1700000000_abc.pdf
     *               expiresInSeconds:
     *                 type: number
     *                 default: 300
     *     responses:
     *       200:
     *         description: URL prefirmada de lectura generada exitosamente.
     *       400:
     *         description: Parámetros inválidos.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${basePrefix}/storage/presigned-download`, authMiddleware, storageCtrl.getDownloadPresignedUrlCtrl);

    /**
     * @swagger
     * /storage/delete:
     *   post:
     *     tags:
     *       - Storage
     *     summary: Eliminar un archivo alojado en Cloudflare R2
     *     description: Elimina un objeto de Cloudflare R2 dada su clave y tipo de bucket.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - key
     *             properties:
     *               key:
     *                 type: string
     *               bucketType:
     *                 type: string
     *                 enum: [public, private]
     *                 default: private
     *     responses:
     *       200:
     *         description: Archivo eliminado exitosamente.
     *       400:
     *         description: Error al eliminar el archivo.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${basePrefix}/storage/delete`, authMiddleware, storageCtrl.deleteFileCtrl);
}

export default configureStorageRoutes;
