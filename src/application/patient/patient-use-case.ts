import { PatientEntity, PatientUpdateData } from "../../domain/patient/patient.entity";
import { PatientRepository } from "../../domain/patient/patient.repository";
import { PatientValue } from "../../domain/patient/patient.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class PatientUseCase {
    constructor(
        private readonly patientRepository: PatientRepository
    ) {
        this.getPatients = this.getPatients.bind(this);
        this.getDetailPatient = this.getDetailPatient.bind(this);
        this.createPatient = this.createPatient.bind(this);
        this.updatePatient = this.updatePatient.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
        this.findPatientByName = this.findPatientByName.bind(this);
    }

    public async getPatients() {
        try {
            const patients = await this.patientRepository.getPatients();
            if (!patients) {
                throw new Error("No hay pacientes.");
            }
            return patients.map(patient => ({
                ...patient,
                pat_createdat: TimezoneConverter.toIsoStringInTimezone(patient.pat_createdat, 'America/Buenos_Aires'),
                pat_updatedat: TimezoneConverter.toIsoStringInTimezone(patient.pat_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error("Error en getPatients (use case):", error.message);
            throw error;
        }
    }

    public async getDetailPatient(pat_uuid: string) {
        try {
            const patient = await this.patientRepository.findPatientById(pat_uuid);
            if (!patient) {
                throw new Error(`No hay paciente con el Id: ${pat_uuid}`);
            }
            return {
                ...patient,
                pat_createdat: TimezoneConverter.toIsoStringInTimezone(patient.pat_createdat, 'America/Buenos_Aires'),
                pat_updatedat: TimezoneConverter.toIsoStringInTimezone(patient.pat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error("Error en getDetailPatient (use case):", error.message);
            throw error;
        }
    }

    public async createPatient(patientData: any) {
        try {
            const patientValue = new PatientValue(patientData);
            const patientCreated = await this.patientRepository.createPatient(patientValue);
            if (!patientCreated) {
                throw new Error("No se ha registrado el paciente");
            }
            return {
                ...patientCreated,
                pat_createdat: TimezoneConverter.toIsoStringInTimezone(patientCreated.pat_createdat, 'America/Buenos_Aires'),
                pat_updatedat: TimezoneConverter.toIsoStringInTimezone(patientCreated.pat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error("Error en createPatient (use case):", error.message);
            throw error;
        }
    }

    public async updatePatient(pat_uuid: string, patientData: PatientUpdateData) {
        try {
            const patientUpdated = await this.patientRepository.updatePatient(pat_uuid, patientData);
            if (!patientUpdated) {
                throw new Error("No se ha actualizado el paciente");
            }
            return {
                ...patientUpdated,
                pat_createdat: TimezoneConverter.toIsoStringInTimezone(patientUpdated.pat_createdat, 'America/Buenos_Aires'),
                pat_updatedat: TimezoneConverter.toIsoStringInTimezone(patientUpdated.pat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error("Error en updatePatient (use case):", error.message);
            throw error;
        }
    }

    public async deletePatient(pat_uuid: string) {
        try {
            const patientDeleted = await this.patientRepository.deletePatient(pat_uuid);
            if (!patientDeleted) {
                throw new Error("No se ha eliminado el paciente");
            }
            return patientDeleted;
        } catch (error: any) {
            console.error("Error en deletePatient (use case):", error.message);
            throw error;
        }
    }

    public async findPatientByName(pat_name: string, excludeUuid?: string | null) {
        try {
            const patient = await this.patientRepository.findPatientByName(pat_name, excludeUuid);
            return patient;
        } catch (error: any) {
            console.error("Error en findPatientByName (use case):", error.message);
            throw error;
        }
    }
}
