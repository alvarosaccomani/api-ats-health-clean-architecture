export interface EncounterAttachmentEntity {
    cmp_uuid: string;
    enc_uuid: string;
    encatt_uuid: string;
    encatt_category: 'INFORMED_CONSENT' | 'URODYNAMICS' | 'ULTRASOUND' | 'LAB' | string;
    encatt_originalname: string;
    encatt_mimetype: string;
    encatt_sizebytes: number;
    encatt_storagekey: string;
    encatt_consentstatus?: 'SIGNED_IN_PERSON' | 'DIGITAL_VERIFIED' | 'REVOKED' | string | null;
    encatt_signeddate?: Date | string | null;
    encatt_legalscope?: string | null;
    encatt_createdat?: Date;
    encatt_updatedat?: Date;
}
