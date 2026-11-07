import { v4 as uuid } from "uuid";
import { IStorageService, StorageBucketType } from "../../domain/storage/storage.service";

export interface PresignedUploadRequest {
    usr_uuid: string;
    filename: string;
    contentType: string;
    bucketType?: StorageBucketType;
    folder?: string;
    expiresInSeconds?: number;
}

export interface PresignedUploadResponse {
    uploadUrl: string;
    key: string;
    bucket: string;
    bucketType: StorageBucketType;
    publicUrl: string | null;
    expiresIn: number;
}

export class StorageUseCase {
    private static readonly ALLOWED_MIME_TYPES: Record<string, string> = {
        // Imágenes optimizadas y web
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/heic': 'heic',
        // Documentos clínicos, contratos y comprobantes
        'application/pdf': 'pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.ms-excel': 'xls',
    };

    constructor(
        private readonly storageService: IStorageService,
        private readonly publicBucketName: string,
        private readonly privateBucketName: string,
        private readonly appPrefix: string = process.env.STORAGE_APP_PREFIX || 'ats-health'
    ) {
        this.getPresignedUploadUrl = this.getPresignedUploadUrl.bind(this);
        this.getPresignedDownloadUrl = this.getPresignedDownloadUrl.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    /**
     * Valida los metadatos del archivo y genera una URL prefirmada para subida directa a Cloudflare R2.
     */
    public async getPresignedUploadUrl(request: PresignedUploadRequest): Promise<PresignedUploadResponse> {
        const {
            usr_uuid,
            filename,
            contentType,
            bucketType = 'private',
            folder = 'attachments',
            expiresInSeconds = 300,
        } = request;

        if (!usr_uuid) {
            throw new Error('El identificador del usuario (usr_uuid) es requerido.');
        }

        if (!filename || !contentType) {
            throw new Error('El nombre de archivo y el tipo MIME (contentType) son requeridos.');
        }

        const normalizedMime = contentType.toLowerCase().trim();
        const expectedExtension = StorageUseCase.ALLOWED_MIME_TYPES[normalizedMime];

        if (!expectedExtension) {
            throw new Error(`Tipo de archivo no permitido: ${contentType}. Formatos admitidos: WebP, JPEG, PNG, PDF, DOCX, DOC, XLSX, XLS.`);
        }

        const targetBucket = bucketType === 'public' ? this.publicBucketName : this.privateBucketName;
        const cleanAppPrefix = (this.appPrefix || 'ats-health').replace(/^\/+|\/+$/g, '');
        const sanitizedFolder = folder.replace(/^\/+|\/+$/g, '');
        const fileKey = `${cleanAppPrefix}/${sanitizedFolder}/${usr_uuid}/${Date.now()}_${uuid()}.${expectedExtension}`;

        const uploadUrl = await this.storageService.getUploadPresignedUrl({
            bucket: targetBucket,
            key: fileKey,
            contentType: normalizedMime,
            expiresInSeconds,
        });

        const publicUrl = bucketType === 'public' ? this.storageService.getPublicUrl(fileKey) : null;

        return {
            uploadUrl,
            key: fileKey,
            bucket: targetBucket,
            bucketType,
            publicUrl,
            expiresIn: expiresInSeconds,
        };
    }

    /**
     * Genera una URL prefirmada para descargar o previsualizar un archivo seguro en el bucket privado.
     */
    public async getPresignedDownloadUrl(key: string, expiresInSeconds: number = 300): Promise<{ downloadUrl: string; expiresIn: number }> {
        if (!key) {
            throw new Error('La clave (key) del archivo es requerida.');
        }

        const downloadUrl = await this.storageService.getDownloadPresignedUrl({
            bucket: this.privateBucketName,
            key,
            expiresInSeconds,
        });

        return {
            downloadUrl,
            expiresIn: expiresInSeconds,
        };
    }

    /**
     * Elimina un archivo en R2 dada su clave y tipo de bucket.
     * Utilizado para ciclos de vida (borrado de entidad o reemplazo de archivos huérfanos).
     */
    public async deleteFile(key: string, bucketType: StorageBucketType = 'private'): Promise<void> {
        if (!key) {
            return;
        }

        const targetBucket = bucketType === 'public' ? this.publicBucketName : this.privateBucketName;
        await this.storageService.deleteFile({
            bucket: targetBucket,
            key,
        });
    }
}
