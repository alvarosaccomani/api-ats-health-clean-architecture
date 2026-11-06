import { PatientEntity, PatientUpdateData } from "./patient.entity";

export interface PatientRepository {
    getPatients(cmp_uuid?: string, options?: { transaction?: any }): Promise<PatientEntity[] | null>;
    findPatientById(pat_uuid: string, options?: { transaction?: any }): Promise<PatientEntity | null>;
    createPatient(patient: PatientEntity, options?: { transaction?: any }): Promise<PatientEntity | null>;
    updatePatient(pat_uuid: string, patient: PatientUpdateData, options?: { transaction?: any }): Promise<PatientEntity | null>;
    deletePatient(pat_uuid: string, options?: { transaction?: any }): Promise<PatientEntity | null>;
    findPatientByName(pat_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<PatientEntity | null>;
}
