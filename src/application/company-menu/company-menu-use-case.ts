import { CompanyMenuEntity } from "../../domain/company-menu/company-menu.entity";
import { CompanyMenuRepository } from "../../domain/company-menu/company-menu.repository";
import { CompanyMenuValue } from "../../domain/company-menu/company-menu.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CompanyMenuUseCase {
    constructor(private readonly companyMenuRepository: CompanyMenuRepository) {
        this.createCompanyMenu = this.createCompanyMenu.bind(this);
        this.updateCompanyMenu = this.updateCompanyMenu.bind(this);
        this.deleteCompanyMenu = this.deleteCompanyMenu.bind(this);
        this.getCompanyOverrides = this.getCompanyOverrides.bind(this);
    }

    public async createCompanyMenu(data: CompanyMenuEntity, options?: { transaction?: any }) {
        try {
            const companyMenuValue = new CompanyMenuValue(data);
            const created = await this.companyMenuRepository.createCompanyMenu(companyMenuValue, options);
            if (!created) {
                throw new Error('No se pudo crear la personalización de menú.');
            }
            return {
                ...created,
                cmpmnu_createdat: TimezoneConverter.toIsoStringInTimezone(created.cmpmnu_createdat, 'America/Buenos_Aires'),
                cmpmnu_updatedat: TimezoneConverter.toIsoStringInTimezone(created.cmpmnu_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en CompanyMenuUseCase.createCompanyMenu:', error.message);
            throw error;
        }
    }

    public async updateCompanyMenu(cmpmnu_uuid: string, data: Partial<CompanyMenuEntity>, options?: { transaction?: any }) {
        try {
            const updated = await this.companyMenuRepository.updateCompanyMenu(cmpmnu_uuid, data, options);
            if (!updated) {
                throw new Error(`No se pudo actualizar la personalización de menú con ID: ${cmpmnu_uuid}`);
            }
            return {
                ...updated,
                cmpmnu_createdat: TimezoneConverter.toIsoStringInTimezone(updated.cmpmnu_createdat, 'America/Buenos_Aires'),
                cmpmnu_updatedat: TimezoneConverter.toIsoStringInTimezone(updated.cmpmnu_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en CompanyMenuUseCase.updateCompanyMenu:', error.message);
            throw error;
        }
    }

    public async deleteCompanyMenu(cmpmnu_uuid: string, options?: { transaction?: any }) {
        try {
            const deleted = await this.companyMenuRepository.deleteCompanyMenu(cmpmnu_uuid, options);
            if (!deleted) {
                throw new Error(`No se pudo eliminar la personalización de menú con ID: ${cmpmnu_uuid}`);
            }
            return {
                ...deleted,
                cmpmnu_createdat: TimezoneConverter.toIsoStringInTimezone(deleted.cmpmnu_createdat, 'America/Buenos_Aires'),
                cmpmnu_updatedat: TimezoneConverter.toIsoStringInTimezone(deleted.cmpmnu_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en CompanyMenuUseCase.deleteCompanyMenu:', error.message);
            throw error;
        }
    }

    public async getCompanyOverrides(cmp_uuid: string, options?: { transaction?: any }) {
        try {
            const overrides = await this.companyMenuRepository.getCompanyOverrides(cmp_uuid, options);
            if (!overrides) {
                return [];
            }
            return overrides.map((override) => ({
                ...override,
                cmpmnu_createdat: TimezoneConverter.toIsoStringInTimezone(override.cmpmnu_createdat, 'America/Buenos_Aires'),
                cmpmnu_updatedat: TimezoneConverter.toIsoStringInTimezone(override.cmpmnu_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en CompanyMenuUseCase.getCompanyOverrides:', error.message);
            throw error;
        }
    }
}
