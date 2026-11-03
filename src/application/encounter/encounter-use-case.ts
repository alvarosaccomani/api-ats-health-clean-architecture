import { EncounterCreateInput, EncounterUpdateData } from "../../domain/encounter/encounter.entity";
import { EncounterRepository } from "../../domain/encounter/encounter.repository";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class EncounterUseCase {
    constructor(
        private readonly encounterRepository: EncounterRepository
    ) {
        this.createEncounter = this.createEncounter.bind(this);
        this.getEncounterById = this.getEncounterById.bind(this);
        this.getEncountersByPatient = this.getEncountersByPatient.bind(this);
        this.updateEncounter = this.updateEncounter.bind(this);
    }

    public async createEncounter(input: EncounterCreateInput, options?: { transaction?: any }) {
        try {
            if (!input.cmp_uuid) {
                throw new Error("Se requiere cmp_uuid para registrar la consulta médica.");
            }
            if (!input.pat_uuid) {
                throw new Error("Se requiere pat_uuid para asociar la consulta al paciente.");
            }
            if (!input.usr_uuid_practitioner) {
                throw new Error("Se requiere usr_uuid_practitioner para identificar al profesional.");
            }
            if (!input.tpl_uuid) {
                throw new Error("Se requiere tpl_uuid (plantilla de historia clínica) para registrar la consulta médica.");
            }

            const created = await this.encounterRepository.createEncounter(input, options);
            if (!created) {
                throw new Error("No se pudo crear la consulta médica.");
            }

            return {
                ...created,
                enc_createdat: created.enc_createdat ? TimezoneConverter.toIsoStringInTimezone(created.enc_createdat, 'America/Buenos_Aires') : undefined,
                enc_updatedat: created.enc_updatedat ? TimezoneConverter.toIsoStringInTimezone(created.enc_updatedat, 'America/Buenos_Aires') : undefined,
            };
        } catch (error: any) {
            console.error("Error en createEncounter (use case):", error.message);
            throw error;
        }
    }

    public async getEncounterById(cmp_uuid: string, enc_uuid: string, options?: { transaction?: any }) {
        try {
            const encounter = await this.encounterRepository.findEncounterById(cmp_uuid, enc_uuid, options);
            if (!encounter) {
                throw new Error(`Consulta con ID ${enc_uuid} no encontrada.`);
            }
            return {
                ...encounter,
                enc_createdat: encounter.enc_createdat ? TimezoneConverter.toIsoStringInTimezone(encounter.enc_createdat, 'America/Buenos_Aires') : undefined,
                enc_updatedat: encounter.enc_updatedat ? TimezoneConverter.toIsoStringInTimezone(encounter.enc_updatedat, 'America/Buenos_Aires') : undefined,
            };
        } catch (error: any) {
            console.error("Error en getEncounterById (use case):", error.message);
            throw error;
        }
    }

    public async getEncountersByPatient(cmp_uuid: string, pat_uuid: string, options?: { transaction?: any }) {
        try {
            const list = await this.encounterRepository.getEncountersByPatient(cmp_uuid, pat_uuid, options);
            if (!list) {
                return [];
            }
            return list.map(enc => ({
                ...enc,
                enc_createdat: enc.enc_createdat ? TimezoneConverter.toIsoStringInTimezone(enc.enc_createdat, 'America/Buenos_Aires') : undefined,
                enc_updatedat: enc.enc_updatedat ? TimezoneConverter.toIsoStringInTimezone(enc.enc_updatedat, 'America/Buenos_Aires') : undefined,
            }));
        } catch (error: any) {
            console.error("Error en getEncountersByPatient (use case):", error.message);
            throw error;
        }
    }

    public async updateEncounter(cmp_uuid: string, enc_uuid: string, data: EncounterUpdateData, options?: { transaction?: any }) {
        try {
            const updated = await this.encounterRepository.updateEncounter(cmp_uuid, enc_uuid, data, options);
            if (!updated) {
                throw new Error(`No se pudo actualizar la consulta ${enc_uuid}.`);
            }
            return {
                ...updated,
                enc_createdat: updated.enc_createdat ? TimezoneConverter.toIsoStringInTimezone(updated.enc_createdat, 'America/Buenos_Aires') : undefined,
                enc_updatedat: updated.enc_updatedat ? TimezoneConverter.toIsoStringInTimezone(updated.enc_updatedat, 'America/Buenos_Aires') : undefined,
            };
        } catch (error: any) {
            console.error("Error en updateEncounter (use case):", error.message);
            throw error;
        }
    }
}
