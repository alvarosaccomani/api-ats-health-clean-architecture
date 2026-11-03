import { EncounterEntity, EncounterCreateInput, EncounterUpdateData } from "./encounter.entity";

export interface EncounterRepository {
    createEncounter(input: EncounterCreateInput, options?: { transaction?: any }): Promise<EncounterEntity | null>;
    findEncounterById(cmp_uuid: string, enc_uuid: string, options?: { transaction?: any }): Promise<EncounterEntity | null>;
    getEncountersByPatient(cmp_uuid: string, pat_uuid: string, options?: { transaction?: any }): Promise<EncounterEntity[] | null>;
    countByPatient(cmp_uuid: string, pat_uuid: string, options?: { transaction?: any }): Promise<number>;
    updateEncounter(cmp_uuid: string, enc_uuid: string, data: EncounterUpdateData, options?: { transaction?: any }): Promise<EncounterEntity | null>;
}
