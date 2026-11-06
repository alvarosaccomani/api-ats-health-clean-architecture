import { CompanySettingEntity, CompanySettingUpdateData } from "../../../domain/company-setting/company-setting.entity";
import { CompanySettingRepository } from "../../../domain/company-setting/company-setting.repository";
import { SequelizeCompanySetting } from "../../model/company-setting/company-setting.model";
import { Op } from "sequelize";
import { DbErrorHandler } from "../../utils/db-error-handler";

export class SequelizeCompanySettingRepository implements CompanySettingRepository {
    async getCompaniesSettings(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanySettingEntity[] | null> {
        try {
            const companiesSettings = await SequelizeCompanySetting.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null
                },
                transaction: options?.transaction
            });
            if (!companiesSettings) {
                return null;
            }
            return companiesSettings.map(setting => setting.get({ plain: true }) as CompanySettingEntity);
        } catch (error: any) {
            console.error('Error en getCompaniesSettings:', error.message);
            throw error;
        }
    }

    async findCompanySettingById(cmp_uuid: string, cmps_uuid: string, options?: { transaction?: any }): Promise<CompanySettingEntity | null> {
        try {
            const companySetting = await SequelizeCompanySetting.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cmps_uuid: cmps_uuid ?? null
                },
                transaction: options?.transaction
            });
            if (!companySetting) {
                return null;
            }
            return companySetting.get({ plain: true }) as CompanySettingEntity;
        } catch (error: any) {
            console.error('Error en findCompanySettingById:', error.message);
            throw error;
        }
    }

    async createCompanySetting(companySetting: CompanySettingEntity, options?: { transaction?: any }): Promise<CompanySettingEntity | null> {
        try {
            const { cmp_uuid, cmps_uuid, cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, dtp_uuid, cmps_options, cmps_group, cmps_createdat, cmps_updatedat } = companySetting;
            const result = await SequelizeCompanySetting.create(
                { cmp_uuid, cmps_uuid, cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, dtp_uuid, cmps_options, cmps_group, cmps_createdat, cmps_updatedat },
                { transaction: options?.transaction }
            );
            if (!result) {
                return null;
            }
            return result.get({ plain: true }) as CompanySettingEntity;
        } catch (error: any) {
            console.error('Error en createCompanySetting:', error.message);
            throw error;
        }
    }

    async updateCompanySetting(cmp_uuid: string, cmps_uuid: string, companySetting: CompanySettingUpdateData, options?: { transaction?: any }): Promise<CompanySettingEntity | null> {
        try {
            const [updatedCount] = await SequelizeCompanySetting.update(
                companySetting,
                { 
                    where: { cmp_uuid, cmps_uuid },
                    transaction: options?.transaction
                }
            );
            if (updatedCount === 0) {
                return null;
            }
            return await this.findCompanySettingById(cmp_uuid, cmps_uuid, options);
        } catch (error: any) {
            console.error('Error en updateCompanySetting:', error.message);
            throw error;
        }
    }

    async deleteCompanySetting(cmp_uuid: string, cmps_uuid: string, options?: { transaction?: any }): Promise<CompanySettingEntity | null> {
        try {
            const companySetting = await this.findCompanySettingById(cmp_uuid, cmps_uuid, options);
            if (!companySetting) {
                return null;
            }
            const result = await SequelizeCompanySetting.destroy({ 
                where: { cmp_uuid, cmps_uuid },
                transaction: options?.transaction
            });
            if (!result) {
                return null;
            }
            return companySetting;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error('Error en deleteCompanySetting:', error.message);
            throw error;
        }
    }

    async findCompanySettingByKey(cmp_uuid: string, cmps_key: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<CompanySettingEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                cmps_key: cmps_key ?? null
            };
            if (excludeUuid) {
                whereCondition.cmps_uuid = { [Op.ne]: excludeUuid };
            }
            const companySetting = await SequelizeCompanySetting.findOne({ 
                where: whereCondition,
                transaction: options?.transaction
            });
            if (!companySetting) {
                return null;
            }
            return companySetting.get({ plain: true }) as CompanySettingEntity;
        } catch (error: any) {
            console.error('Error en findCompanySettingByKey:', error.message);
            throw error;
        }
    }
}
