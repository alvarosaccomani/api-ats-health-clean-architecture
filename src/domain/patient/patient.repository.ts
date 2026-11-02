import { PatientEntity, PatientUpdateData } from "./patient.entity";

export interface PatientRepository {
    getPatients(cmp_uuid?: string): Promise<PatientEntity[] | null>;
    findPatientById(pat_uuid: string): Promise<PatientEntity | null>;
    createPatient(patient: PatientEntity): Promise<PatientEntity | null>;
    updatePatient(pat_uuid: string, patient: PatientUpdateData): Promise<PatientEntity | null>;
    deletePatient(pat_uuid: string): Promise<PatientEntity | null>;
    findPatientByName(pat_name: string, excludeUuid?: string | null): Promise<PatientEntity | null>;
}
