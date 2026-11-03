export interface EncounterTreatmentEntity {
    cmp_uuid: string;
    enc_uuid: string;
    enctr_uuid: string;
    enctr_kind: 'STANDARD_MODALITY' | 'CUSTOM_ADHOC' | string;
    enctr_code?: string | null;
    enctr_name: string;
    enctr_category?: string | null;
    enctr_targetzone?: string | null;
    enctr_dosageparameters: string;
    enctr_frequency?: string | null;
    enctr_homeprescription?: string | null;
    enctr_isactive: boolean;
    enctr_createdat?: Date;
    enctr_updatedat?: Date;
}
