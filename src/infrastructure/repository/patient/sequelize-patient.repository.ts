import { Op } from "sequelize";
import { PatientEntity, PatientUpdateData } from "../../../domain/patient/patient.entity";
import { PatientRepository } from "../../../domain/patient/patient.repository";
import { SequelizePatient } from "../../model/patient/patient.model";

export class SequelizePatientRepository implements PatientRepository {
    async getPatients(): Promise<PatientEntity[] | null> {
        try {
            const patients = await SequelizePatient.findAll();
            if (!patients) {
                throw new Error("No hay pacientes");
            }
            return patients.map(p => p.get({ plain: true }) as PatientEntity);
        } catch (error: any) {
            console.error("Error en getPatients:", error.message);
            throw error;
        }
    }

    async findPatientById(pat_uuid: string): Promise<PatientEntity | null> {
        try {
            const patient = await SequelizePatient.findOne({
                where: {
                    pat_uuid: pat_uuid ?? null
                }
            });
            if (!patient) {
                throw new Error(`No hay paciente con el Id: ${pat_uuid}`);
            }
            return patient.get({ plain: true }) as PatientEntity;
        } catch (error: any) {
            console.error("Error en findPatientById:", error.message);
            throw error;
        }
    }

    async createPatient(patient: PatientEntity): Promise<PatientEntity | null> {
        try {
            const result = await SequelizePatient.create({
                cmp_uuid: patient.cmp_uuid,
                pat_uuid: patient.pat_uuid,
                usr_uuid: patient.usr_uuid,
                pat_documentnumber: patient.pat_documentnumber,
                pat_firstname: patient.pat_firstname,
                pat_lastname: patient.pat_lastname,
                pat_birthdate: patient.pat_birthdate,
                pat_biologicalsex: patient.pat_biologicalsex,
                pat_genderidentity: patient.pat_genderidentity,
                pat_occupation: patient.pat_occupation,
                pat_phone: patient.pat_phone,
                pat_email: patient.pat_email,
                pat_medicalcoverage: patient.pat_medicalcoverage,
                pat_affiliatenumber: patient.pat_affiliatenumber,
                pat_emergencycontact: patient.pat_emergencycontact,
                pat_active: patient.pat_active ?? true,
                pat_createdat: patient.pat_createdat,
                pat_updatedat: patient.pat_updatedat
            });

            return result ? (result.get({ plain: true }) as PatientEntity) : null;
        } catch (error: any) {
            console.error("Error en createPatient:", error.message);
            throw error;
        }
    }

    async updatePatient(pat_uuid: string, patient: PatientUpdateData): Promise<PatientEntity | null> {
        try {
            const [updatedCount, [updatedPatient]] = await SequelizePatient.update(
                {
                    cmp_uuid: patient.cmp_uuid,
                    usr_uuid: patient.usr_uuid,
                    pat_documentnumber: patient.pat_documentnumber,
                    pat_firstname: patient.pat_firstname,
                    pat_lastname: patient.pat_lastname,
                    pat_birthdate: patient.pat_birthdate,
                    pat_biologicalsex: patient.pat_biologicalsex,
                    pat_genderidentity: patient.pat_genderidentity,
                    pat_occupation: patient.pat_occupation,
                    pat_phone: patient.pat_phone,
                    pat_email: patient.pat_email,
                    pat_medicalcoverage: patient.pat_medicalcoverage,
                    pat_affiliatenumber: patient.pat_affiliatenumber,
                    pat_emergencycontact: patient.pat_emergencycontact,
                    pat_active: patient.pat_active
                },
                {
                    where: { pat_uuid },
                    returning: true
                }
            );

            if (updatedCount === 0) {
                throw new Error("No se ha actualizado el paciente");
            }

            return updatedPatient.get({ plain: true }) as PatientEntity;
        } catch (error: any) {
            console.error("Error en updatePatient:", error.message);
            throw error;
        }
    }

    async deletePatient(pat_uuid: string): Promise<PatientEntity | null> {
        try {
            const patient = await this.findPatientById(pat_uuid);
            const result = await SequelizePatient.destroy({
                where: {
                    pat_uuid: pat_uuid ?? null
                }
            });
            if (!result) {
                throw new Error("No se ha eliminado el paciente");
            }
            return patient;
        } catch (error: any) {
            console.error("Error en deletePatient:", error.message);
            throw error;
        }
    }

    async findPatientByName(pat_name: string, excludeUuid?: string | null): Promise<PatientEntity | null> {
        try {
            const whereClause: any = {
                [Op.or]: [
                    { pat_firstname: pat_name },
                    { pat_lastname: pat_name }
                ]
            };

            if (excludeUuid) {
                whereClause.pat_uuid = { [Op.ne]: excludeUuid };
            }

            const patient = await SequelizePatient.findOne({
                where: whereClause
            });

            return patient ? (patient.get({ plain: true }) as PatientEntity) : null;
        } catch (error: any) {
            console.error("Error en findPatientByName:", error.message);
            throw error;
        }
    }
}
