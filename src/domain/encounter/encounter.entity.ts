import { EncounterDataEntity } from "./encounter-data.entity";
import { EncounterTreatmentEntity } from "./encounter-treatment.entity";
import { EncounterAttachmentEntity } from "./encounter-attachment.entity";

export * from "./encounter-data.entity";
export * from "./encounter-treatment.entity";
export * from "./encounter-attachment.entity";

export interface EncounterEntity {
    cmp_uuid: string;
    enc_uuid: string;
    pat_uuid: string;
    usr_uuid_practitioner: string;
    tpl_uuid?: string | null;
    bkg_uuid?: string | null;
    wrk_uuid?: string | null;
    enc_number: number;
    enc_type: 'FIRST_TIME' | 'FOLLOW_UP' | 'DISCHARGE' | string;
    enc_date: Date | string;
    enc_status: 'IN_PROGRESS' | 'SIGNED_LOCKED' | 'VOID' | string;
    enc_reason?: string | null;
    enc_maindiagnosiscode?: string | null;
    enc_signedat?: Date | null;
    enc_signedby?: string | null;
    enc_createdat?: Date;
    enc_updatedat?: Date;

    // Relaciones pobladas
    encounter_data?: EncounterDataEntity | null;
    treatments?: EncounterTreatmentEntity[];
    attachments?: EncounterAttachmentEntity[];
}

export interface EncounterCreateInput {
    cmp_uuid: string;
    enc_uuid?: string;
    pat_uuid: string;
    usr_uuid_practitioner: string;
    tpl_uuid: string;
    bkg_uuid?: string | null;
    wrk_uuid?: string | null;
    enc_number?: number;
    enc_type?: string;
    enc_date?: Date | string;
    enc_status?: string;
    enc_reason?: string | null;
    enc_maindiagnosiscode?: string | null;

    // Payload clínico
    form_data?: Record<string, any>;
    calculated_scores?: Record<string, any>;

    // Prescripciones
    treatments?: Array<Omit<EncounterTreatmentEntity, 'cmp_uuid' | 'enc_uuid' | 'enctr_uuid' | 'enctr_createdat' | 'enctr_updatedat'>>;
}

export type EncounterUpdateData = Partial<Omit<EncounterEntity, 'cmp_uuid' | 'enc_uuid' | 'pat_uuid' | 'enc_createdat' | 'enc_updatedat'>> & {
    form_data?: Record<string, any>;
    calculated_scores?: Record<string, any>;
    treatments?: Array<Omit<EncounterTreatmentEntity, 'cmp_uuid' | 'enc_uuid' | 'enctr_uuid' | 'enctr_createdat' | 'enctr_updatedat'>>;
};
