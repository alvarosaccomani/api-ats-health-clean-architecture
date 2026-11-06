import { Op } from "sequelize";
import { PatientEntity, PatientUpdateData } from "../../../domain/patient/patient.entity";
import { PatientRepository } from "../../../domain/patient/patient.repository";
import { SequelizePatient } from "../../model/patient/patient.model";
import { DbErrorHandler } from "../../utils/db-error-handler";

export class SequelizePatientRepository implements PatientRepository {
    async getPatients(cmp_uuid?: string, options?: { transaction?: any }): Promise<PatientEntity[] | null> {
        try {
            const whereCondition: any = {};
            if (cmp_uuid && cmp_uuid.toLowerCase() !== 'null' && cmp_uuid.toLowerCase() !== 'undefined') {
                whereCondition.cmp_uuid = cmp_uuid;
            }
            const patients = await SequelizePatient.findAll({
                where: whereCondition,
                order: [['pat_createdat', 'DESC']],
                transaction: options?.transaction
            });
            if (!patients) {
                return null;
            }
            return patients.map(p => p.get({ plain: true }) as PatientEntity);
        } catch (error: any) {
            console.error("Error en getPatients:", error.message);
            throw error;
        }
    }

    async findPatientById(pat_uuid: string, options?: { transaction?: any }): Promise<PatientEntity | null> {
        try {
            const patient = await SequelizePatient.findOne({
                where: {
                    pat_uuid: pat_uuid ?? null
                },
                transaction: options?.transaction
            });
            if (!patient) {
                return null;
            }
            return patient.get({ plain: true }) as PatientEntity;
        } catch (error: any) {
            console.error("Error en findPatientById:", error.message);
            throw error;
        }
    }

    async createPatient(patient: PatientEntity, options?: { transaction?: any }): Promise<PatientEntity | null> {
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
            }, { transaction: options?.transaction });

            return result ? (result.get({ plain: true }) as PatientEntity) : null;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error("Error en createPatient:", error.message);
            throw error;
        }
    }

    async updatePatient(pat_uuid: string, patient: PatientUpdateData, options?: { transaction?: any }): Promise<PatientEntity | null> {
        try {
            const [updatedCount] = await SequelizePatient.update(
                patient,
                {
                    where: { pat_uuid },
                    transaction: options?.transaction
                }
            );

            if (updatedCount === 0) {
                return null;
            }

            return await this.findPatientById(pat_uuid, options);
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error("Error en updatePatient:", error.message);
            throw error;
        }
    }

    async deletePatient(pat_uuid: string, options?: { transaction?: any }): Promise<PatientEntity | null> {
        try {
            const patient = await this.findPatientById(pat_uuid, options);
            if (!patient) {
                return null;
            }
            const result = await SequelizePatient.destroy({
                where: {
                    pat_uuid: pat_uuid ?? null
                },
                transaction: options?.transaction
            });
            if (!result) {
                return null;
            }
            return patient;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error("Error en deletePatient:", error.message);
            throw error;
        }
    }

    async findPatientByName(pat_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<PatientEntity | null> {
        try {
            const whereClause: any = {
                [Op.or]: [
                    { pat_firstname: { [Op.iLike]: `%${pat_name}%` } },
                    { pat_lastname: { [Op.iLike]: `%${pat_name}%` } }
                ]
            };

            if (excludeUuid) {
                whereClause.pat_uuid = { [Op.ne]: excludeUuid };
            }

            const patient = await SequelizePatient.findOne({
                where: whereClause,
                transaction: options?.transaction
            });

            return patient ? (patient.get({ plain: true }) as PatientEntity) : null;
        } catch (error: any) {
            console.error("Error en findPatientByName:", error.message);
            throw error;
        }
    }
}
