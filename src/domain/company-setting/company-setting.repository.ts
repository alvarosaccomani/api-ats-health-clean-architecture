import { CompanySettingEntity, CompanySettingUpdateData } from "./company-setting.entity";

export interface CompanySettingRepository {
    getCompaniesSettings(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanySettingEntity[] | null>;
    findCompanySettingById(cmp_uuid: string, cmps_uuid: string, options?: { transaction?: any }): Promise<CompanySettingEntity | null>;
    createCompanySetting(companySetting: CompanySettingEntity, options?: { transaction?: any }): Promise<CompanySettingEntity | null>;
    updateCompanySetting(cmp_uuid: string, cmps_uuid: string, companySetting: CompanySettingUpdateData, options?: { transaction?: any }): Promise<CompanySettingEntity | null>;
    deleteCompanySetting(cmp_uuid: string, cmps_uuid: string, options?: { transaction?: any }): Promise<CompanySettingEntity | null>;
    findCompanySettingByKey(cmp_uuid: string, cmps_key: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<CompanySettingEntity | null>;
}
