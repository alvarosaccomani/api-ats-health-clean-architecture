import { CompanySettingRepository } from "../../domain/company-setting/company-setting.repository";
import { CompanySettingValue } from "../../domain/company-setting/company-setting.value";
import { CompanySettingEntity, CompanySettingUpdateData } from "../../domain/company-setting/company-setting.entity";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CompanySettingUseCase {
    constructor(
        private readonly companySettingRepository: CompanySettingRepository
    ) {
        this.getCompaniesSettings = this.getCompaniesSettings.bind(this);
        this.getDetailCompanySetting = this.getDetailCompanySetting.bind(this);
        this.createCompanySetting = this.createCompanySetting.bind(this);
        this.updateCompanySetting = this.updateCompanySetting.bind(this);
        this.deleteCompanySetting = this.deleteCompanySetting.bind(this);
        this.findCompanySettingByKey = this.findCompanySettingByKey.bind(this);
    }

    public async getCompaniesSettings(cmp_uuid: string, options?: { transaction?: any }) {
        try {
            const companiesSettings = await this.companySettingRepository.getCompaniesSettings(cmp_uuid, options);
            if (!companiesSettings) {
                return [];
            }
            return companiesSettings.map(companySetting => ({
                cmp_uuid: companySetting.cmp_uuid,
                cmps_uuid: companySetting.cmps_uuid,
                cmps_key: companySetting.cmps_key,    
                cmps_parameter: companySetting.cmps_parameter,
                cmps_description: companySetting.cmps_description,
                cmps_value: companySetting.cmps_value,
                cmps_datatype: companySetting.cmps_datatype,
                dtp_uuid: companySetting.dtp_uuid,
                cmps_options: companySetting.cmps_options,
                cmps_group: companySetting.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCompaniesSettings (use case):', error.message);
            throw error;
        }
    }

    public async getDetailCompanySetting(cmp_uuid: string, cmps_uuid: string, options?: { transaction?: any }) {
        try {
            const companySetting = await this.companySettingRepository.findCompanySettingById(cmp_uuid, cmps_uuid, options);
            if (!companySetting) {
                throw new Error(`No hay configuración de empresa con el Id: ${cmps_uuid}`);
            }
            return {
                cmp_uuid: companySetting.cmp_uuid,
                cmps_uuid: companySetting.cmps_uuid,
                cmps_key: companySetting.cmps_key,    
                cmps_parameter: companySetting.cmps_parameter,
                cmps_description: companySetting.cmps_description,
                cmps_value: companySetting.cmps_value,
                cmps_datatype: companySetting.cmps_datatype,
                dtp_uuid: companySetting.dtp_uuid,
                cmps_options: companySetting.cmps_options,
                cmps_group: companySetting.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCompanySetting (use case):', error.message);
            throw error;
        }
    }
    
    public async createCompanySetting(
        data: {
            cmp_uuid: string;
            cmps_uuid?: string;
            cmps_key: string;
            cmps_parameter: string;
            cmps_description?: string | null;
            cmps_value: string;
            cmps_datatype?: string | null;
            dtp_uuid?: string | null;
            cmps_options?: string | null;
            cmps_group?: string | null;
        },
        options?: { transaction?: any }
    ) {
        try {
            const companySettingValue = new CompanySettingValue(data);
            const companySettingCreated = await this.companySettingRepository.createCompanySetting(companySettingValue, options);
            if (!companySettingCreated) {
                throw new Error(`No se pudo insertar la configuración de empresa.`);
            }
            return {
                cmp_uuid: companySettingCreated.cmp_uuid,
                cmps_uuid: companySettingCreated.cmps_uuid,
                cmps_key: companySettingCreated.cmps_key,    
                cmps_parameter: companySettingCreated.cmps_parameter,
                cmps_description: companySettingCreated.cmps_description,
                cmps_value: companySettingCreated.cmps_value,
                cmps_datatype: companySettingCreated.cmps_datatype,
                dtp_uuid: companySettingCreated.dtp_uuid,
                cmps_options: companySettingCreated.cmps_options,
                cmps_group: companySettingCreated.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySettingCreated.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySettingCreated.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCompanySetting (use case):', error.message);
            throw error;
        }
    }

    public async updateCompanySetting(cmp_uuid: string, cmps_uuid: string, data: CompanySettingUpdateData, options?: { transaction?: any }) {
        try {
            const companySettingUpdated = await this.companySettingRepository.updateCompanySetting(cmp_uuid, cmps_uuid, data, options);
            if (!companySettingUpdated) {
                throw new Error(`No se pudo actualizar la configuración de empresa.`);
            }
            return {
                cmp_uuid: companySettingUpdated.cmp_uuid,
                cmps_uuid: companySettingUpdated.cmps_uuid,
                cmps_key: companySettingUpdated.cmps_key,    
                cmps_parameter: companySettingUpdated.cmps_parameter,
                cmps_description: companySettingUpdated.cmps_description,
                cmps_value: companySettingUpdated.cmps_value,
                cmps_datatype: companySettingUpdated.cmps_datatype,
                dtp_uuid: companySettingUpdated.dtp_uuid,
                cmps_options: companySettingUpdated.cmps_options,
                cmps_group: companySettingUpdated.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySettingUpdated.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySettingUpdated.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCompanySetting (use case):', error.message);
            throw error;
        }
    }

    public async deleteCompanySetting(cmp_uuid: string, cmps_uuid: string, options?: { transaction?: any }) {
        try {
            const companySettingDeleted = await this.companySettingRepository.deleteCompanySetting(cmp_uuid, cmps_uuid, options);
            if (!companySettingDeleted) {
                throw new Error(`No se pudo eliminar la configuración de empresa.`);
            }
            return {
                cmp_uuid: companySettingDeleted.cmp_uuid,
                cmps_uuid: companySettingDeleted.cmps_uuid,
                cmps_key: companySettingDeleted.cmps_key,    
                cmps_parameter: companySettingDeleted.cmps_parameter,
                cmps_description: companySettingDeleted.cmps_description,
                cmps_value: companySettingDeleted.cmps_value,
                cmps_datatype: companySettingDeleted.cmps_datatype,
                dtp_uuid: companySettingDeleted.dtp_uuid,
                cmps_options: companySettingDeleted.cmps_options,
                cmps_group: companySettingDeleted.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySettingDeleted.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySettingDeleted.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteCompanySetting (use case):', error.message);
            throw error;
        }
    }

    public async findCompanySettingByKey(cmp_uuid: string, cmps_key: string, excludeUuid?: string, options?: { transaction?: any }) {
        try {
            const companySetting = await this.companySettingRepository.findCompanySettingByKey(cmp_uuid, cmps_key, excludeUuid, options);
            return companySetting;
        } catch (error: any) {
            console.error('Error en findCompanySettingByKey (use case):', error.message);
            throw error;
        }
    }
}
