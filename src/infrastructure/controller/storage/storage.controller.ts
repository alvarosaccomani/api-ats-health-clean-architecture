import { Request, Response } from "express";
import { StorageUseCase } from "../../../application/storage/storage-use-case";

export class StorageController {
    constructor(private readonly storageUseCase: StorageUseCase) {
        this.getUploadPresignedUrlCtrl = this.getUploadPresignedUrlCtrl.bind(this);
        this.getDownloadPresignedUrlCtrl = this.getDownloadPresignedUrlCtrl.bind(this);
        this.deleteFileCtrl = this.deleteFileCtrl.bind(this);
    }

    /**
     * Endpoint para solicitar una URL prefirmada de subida (PUT) directa a Cloudflare R2.
     */
    public async getUploadPresignedUrlCtrl(req: Request, res: Response) {
        try {
            const authUser = (req as any).user;
            const { filename, contentType, bucketType, folder, expiresInSeconds } = req.body;
            // Prioriza usr_uuid autenticado del JWT, o toma el del cuerpo como fallback
            const usr_uuid = req.body.usr_uuid || authUser?.usr_uuid;

            const result = await this.storageUseCase.getPresignedUploadUrl({
                usr_uuid,
                filename,
                contentType,
                bucketType,
                folder,
                expiresInSeconds: expiresInSeconds ? parseInt(expiresInSeconds, 10) : undefined,
            });

            return res.status(200).send({
                success: true,
                message: 'URL prefirmada generada exitosamente.',
                data: result,
            });
        } catch (error: any) {
            console.error('Error en getUploadPresignedUrlCtrl (storage controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo generar la URL prefirmada de subida.',
                error: error.message,
            });
        }
    }

    /**
     * Endpoint para solicitar una URL prefirmada de descarga temporal para un archivo privado.
     */
    public async getDownloadPresignedUrlCtrl(req: Request, res: Response) {
        try {
            const { key, expiresInSeconds } = req.body;

            const result = await this.storageUseCase.getPresignedDownloadUrl(
                key,
                expiresInSeconds ? parseInt(expiresInSeconds, 10) : undefined
            );

            return res.status(200).send({
                success: true,
                message: 'URL prefirmada de descarga generada exitosamente.',
                data: result,
            });
        } catch (error: any) {
            console.error('Error en getDownloadPresignedUrlCtrl (storage controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo generar la URL de descarga.',
                error: error.message,
            });
        }
    }

    /**
     * Endpoint para eliminar un archivo de Cloudflare R2 dado su key.
     */
    public async deleteFileCtrl(req: Request, res: Response) {
        try {
            const { key, bucketType } = req.body;

            await this.storageUseCase.deleteFile(key, bucketType);

            return res.status(200).send({
                success: true,
                message: 'Archivo eliminado exitosamente de R2.',
            });
        } catch (error: any) {
            console.error('Error en deleteFileCtrl (storage controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el archivo.',
                error: error.message,
            });
        }
    }
}
