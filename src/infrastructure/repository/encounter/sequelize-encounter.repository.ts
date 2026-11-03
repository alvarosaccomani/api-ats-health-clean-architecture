import { v4 as uuid } from 'uuid';
import { sequelize } from '../../db/sequelize';
import { EncounterEntity, EncounterCreateInput, EncounterUpdateData } from '../../../domain/encounter/encounter.entity';
import { EncounterRepository } from '../../../domain/encounter/encounter.repository';
import { EncounterValue } from '../../../domain/encounter/encounter.value';
import { SequelizeEncounter, SequelizeEncounterData, SequelizeEncounterTreatment, SequelizeEncounterAttachment } from '../../model/encounter';
import { SequelizeUser } from '../../model/user/user.model';
import { SequelizePatient } from '../../model/patient/patient.model';

export class SequelizeEncounterRepository implements EncounterRepository {
    async countByPatient(cmp_uuid: string, pat_uuid: string, options?: { transaction?: any }): Promise<number> {
        try {
            return await SequelizeEncounter.count({
                where: {
                    cmp_uuid,
                    pat_uuid
                },
                transaction: options?.transaction
            });
        } catch (error: any) {
            console.error('Error en countByPatient:', error.message);
            return 0;
        }
    }

    async createEncounter(input: EncounterCreateInput, options?: { transaction?: any }): Promise<EncounterEntity | null> {
        const isLocalTx = !options?.transaction;
        const transaction = options?.transaction || await sequelize.transaction();

        try {
            const encCount = await SequelizeEncounter.count({
                where: {
                    cmp_uuid: input.cmp_uuid,
                    pat_uuid: input.pat_uuid
                },
                transaction
            });

            const encValue = new EncounterValue({
                ...input,
                enc_number: input.enc_number ?? (encCount + 1)
            });

            await SequelizeEncounter.create({
                cmp_uuid: encValue.cmp_uuid,
                enc_uuid: encValue.enc_uuid,
                pat_uuid: encValue.pat_uuid,
                usr_uuid_practitioner: encValue.usr_uuid_practitioner,
                tpl_uuid: encValue.tpl_uuid,
                bkg_uuid: encValue.bkg_uuid,
                wrk_uuid: encValue.wrk_uuid,
                enc_number: encValue.enc_number,
                enc_type: encValue.enc_type,
                enc_date: encValue.enc_date,
                enc_status: encValue.enc_status,
                enc_reason: encValue.enc_reason,
                enc_maindiagnosiscode: encValue.enc_maindiagnosiscode,
                enc_signedat: encValue.enc_signedat,
                enc_signedby: encValue.enc_signedby,
                enc_createdat: encValue.enc_createdat,
                enc_updatedat: encValue.enc_updatedat
            }, { transaction });

            // Guardar payload clínico en encd_encounterdata
            await SequelizeEncounterData.create({
                cmp_uuid: encValue.cmp_uuid,
                enc_uuid: encValue.enc_uuid,
                encd_formdata: input.form_data ?? {},
                encd_calculatedscores: input.calculated_scores ?? {},
                encd_version: 1,
                encd_createdat: encValue.enc_createdat,
                encd_updatedat: encValue.enc_updatedat
            }, { transaction });

            // Guardar prescripciones/tratamientos si existen
            if (input.treatments && input.treatments.length > 0) {
                for (const tr of input.treatments) {
                    await SequelizeEncounterTreatment.create({
                        cmp_uuid: encValue.cmp_uuid,
                        enc_uuid: encValue.enc_uuid,
                        enctr_uuid: uuid(),
                        enctr_kind: tr.enctr_kind ?? 'STANDARD_MODALITY',
                        enctr_code: tr.enctr_code ?? null,
                        enctr_name: tr.enctr_name,
                        enctr_category: tr.enctr_category ?? null,
                        enctr_targetzone: tr.enctr_targetzone ?? null,
                        enctr_dosageparameters: tr.enctr_dosageparameters || '',
                        enctr_frequency: tr.enctr_frequency ?? null,
                        enctr_homeprescription: tr.enctr_homeprescription ?? null,
                        enctr_isactive: tr.enctr_isactive ?? true,
                        enctr_createdat: encValue.enc_createdat,
                        enctr_updatedat: encValue.enc_updatedat
                    }, { transaction });
                }
            }

            if (isLocalTx) {
                await transaction.commit();
            }

            return await this.findEncounterById(encValue.cmp_uuid, encValue.enc_uuid, { transaction: isLocalTx ? undefined : transaction });
        } catch (error: any) {
            if (isLocalTx) {
                await transaction.rollback();
            }
            console.error('Error en createEncounter:', error.message);
            throw error;
        }
    }

    async findEncounterById(cmp_uuid: string, enc_uuid: string, options?: { transaction?: any }): Promise<EncounterEntity | null> {
        try {
            const encounter = await SequelizeEncounter.findOne({
                where: {
                    cmp_uuid,
                    enc_uuid
                },
                transaction: options?.transaction,
                include: [
                    {
                        model: SequelizeEncounterData,
                        as: 'encounter_data'
                    },
                    {
                        model: SequelizeEncounterTreatment,
                        as: 'treatments'
                    },
                    {
                        model: SequelizeEncounterAttachment,
                        as: 'attachments'
                    },
                    {
                        model: SequelizeUser,
                        as: 'practitioner',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email']
                    },
                    {
                        model: SequelizePatient,
                        as: 'patient'
                    }
                ]
            });

            if (!encounter) {
                return null;
            }

            return encounter.get({ plain: true }) as EncounterEntity;
        } catch (error: any) {
            console.error('Error en findEncounterById:', error.message);
            throw error;
        }
    }

    async getEncountersByPatient(cmp_uuid: string, pat_uuid: string, options?: { transaction?: any }): Promise<EncounterEntity[] | null> {
        try {
            const encounters = await SequelizeEncounter.findAll({
                where: {
                    cmp_uuid,
                    pat_uuid
                },
                transaction: options?.transaction,
                order: [['enc_date', 'DESC'], ['enc_number', 'DESC']],
                include: [
                    {
                        model: SequelizeEncounterData,
                        as: 'encounter_data'
                    },
                    {
                        model: SequelizeEncounterTreatment,
                        as: 'treatments'
                    },
                    {
                        model: SequelizeEncounterAttachment,
                        as: 'attachments'
                    },
                    {
                        model: SequelizeUser,
                        as: 'practitioner',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname']
                    }
                ]
            });

            return encounters.map(e => e.get({ plain: true }) as EncounterEntity);
        } catch (error: any) {
            console.error('Error en getEncountersByPatient:', error.message);
            throw error;
        }
    }

    async updateEncounter(cmp_uuid: string, enc_uuid: string, data: EncounterUpdateData, options?: { transaction?: any }): Promise<EncounterEntity | null> {
        const isLocalTx = !options?.transaction;
        const transaction = options?.transaction || await sequelize.transaction();

        try {
            const encounter = await SequelizeEncounter.findOne({
                where: { cmp_uuid, enc_uuid },
                transaction
            });

            if (!encounter) {
                if (isLocalTx) await transaction.rollback();
                throw new Error(`Consulta con ID ${enc_uuid} no encontrada.`);
            }

            await encounter.update({
                enc_type: data.enc_type ?? encounter.enc_type,
                enc_status: data.enc_status ?? encounter.enc_status,
                enc_reason: data.enc_reason !== undefined ? data.enc_reason : encounter.enc_reason,
                enc_maindiagnosiscode: data.enc_maindiagnosiscode !== undefined ? data.enc_maindiagnosiscode : encounter.enc_maindiagnosiscode,
                enc_signedat: data.enc_signedat !== undefined ? data.enc_signedat : encounter.enc_signedat,
                enc_signedby: data.enc_signedby !== undefined ? data.enc_signedby : encounter.enc_signedby,
            }, { transaction });

            if (data.form_data || data.calculated_scores) {
                const encData = await SequelizeEncounterData.findOne({
                    where: { cmp_uuid, enc_uuid },
                    transaction
                });

                if (encData) {
                    await encData.update({
                        encd_formdata: data.form_data ?? encData.encd_formdata,
                        encd_calculatedscores: data.calculated_scores ?? encData.encd_calculatedscores,
                        encd_version: encData.encd_version + 1
                    }, { transaction });
                } else {
                    await SequelizeEncounterData.create({
                        cmp_uuid,
                        enc_uuid,
                        encd_formdata: data.form_data ?? {},
                        encd_calculatedscores: data.calculated_scores ?? {},
                        encd_version: 1
                    }, { transaction });
                }
            }

            if (data.treatments) {
                // Sincronización atómica de prescripciones
                await SequelizeEncounterTreatment.destroy({
                    where: { cmp_uuid, enc_uuid },
                    transaction
                });

                for (const tr of data.treatments) {
                    await SequelizeEncounterTreatment.create({
                        cmp_uuid,
                        enc_uuid,
                        enctr_uuid: uuid(),
                        enctr_kind: tr.enctr_kind ?? 'STANDARD_MODALITY',
                        enctr_code: tr.enctr_code ?? null,
                        enctr_name: tr.enctr_name,
                        enctr_category: tr.enctr_category ?? null,
                        enctr_targetzone: tr.enctr_targetzone ?? null,
                        enctr_dosageparameters: tr.enctr_dosageparameters || '',
                        enctr_frequency: tr.enctr_frequency ?? null,
                        enctr_homeprescription: tr.enctr_homeprescription ?? null,
                        enctr_isactive: tr.enctr_isactive ?? true,
                    }, { transaction });
                }
            }

            if (isLocalTx) {
                await transaction.commit();
            }

            return await this.findEncounterById(cmp_uuid, enc_uuid, { transaction: isLocalTx ? undefined : transaction });
        } catch (error: any) {
            if (isLocalTx) {
                await transaction.rollback();
            }
            console.error('Error en updateEncounter:', error.message);
            throw error;
        }
    }
}
