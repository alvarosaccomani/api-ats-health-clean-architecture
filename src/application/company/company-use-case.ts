import { CompanyRepository } from "../../domain/company/company.repository";
import { CompanyValue } from "../../domain/company/company.value";
import { CompanyEntity, CompanyUpdateData } from "../../domain/company/company.entity";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CompanyUseCase {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {
        this.getCompanies = this.getCompanies.bind(this);
        this.getDetailCompany = this.getDetailCompany.bind(this);
        this.createCompany = this.createCompany.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.findCompanyByName = this.findCompanyByName.bind(this);
    }

    public async getCompanies(options?: { transaction?: any }) {
        try {
            const companies = await this.companyRepository.getCompanies(options);
            if (!companies) {
                return [];
            }
            return companies.map(company => ({
                cmp_uuid: company.cmp_uuid,
                cmp_name: company.cmp_name,
                cmp_address: company.cmp_address,
                cmp_lat: company.cmp_lat,
                cmp_lng: company.cmp_lng,
                cmp_phone: company.cmp_phone,
                cmp_email: company.cmp_email,
                cmp_logo: company.cmp_logo,
                cmp_banner: company.cmp_banner,
                cmp_description: company.cmp_description,
                cmp_whatsapp: company.cmp_whatsapp,
                cmp_instagram: company.cmp_instagram,
                cmp_facebook: company.cmp_facebook,
                cmp_primarycolor: company.cmp_primarycolor,
                cmp_isfeatured: company.cmp_isfeatured,
                cmp_status: company.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(company.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(company.cmp_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCompanies (use case):', error.message);
            throw error;
        }
    }

    public async getDetailCompany(cmp_uuid: string, options?: { transaction?: any }) {
        try {
            const company = await this.companyRepository.findCompanyById(cmp_uuid, options);
            if (!company) {
                throw new Error(`No hay empresa con el Id: ${cmp_uuid}`);
            }
            return {
                cmp_uuid: company.cmp_uuid,
                cmp_name: company.cmp_name,
                cmp_address: company.cmp_address,
                cmp_lat: company.cmp_lat,
                cmp_lng: company.cmp_lng,
                cmp_phone: company.cmp_phone,
                cmp_email: company.cmp_email,
                cmp_logo: company.cmp_logo,
                cmp_banner: company.cmp_banner,
                cmp_description: company.cmp_description,
                cmp_whatsapp: company.cmp_whatsapp,
                cmp_instagram: company.cmp_instagram,
                cmp_facebook: company.cmp_facebook,
                cmp_primarycolor: company.cmp_primarycolor,
                cmp_isfeatured: company.cmp_isfeatured,
                cmp_status: company.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(company.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(company.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCompany (use case):', error.message);
            throw error;
        }
    }
    
    public async createCompany(
        data: {
            cmp_uuid?: string;
            cmp_name: string;
            cmp_address?: string | null;
            cmp_lat?: number | null;
            cmp_lng?: number | null;
            cmp_phone?: string | null;
            cmp_email?: string | null;
            cmp_logo?: string | null;
            cmp_banner?: string | null;
            cmp_description?: string | null;
            cmp_whatsapp?: string | null;
            cmp_instagram?: string | null;
            cmp_facebook?: string | null;
            cmp_primarycolor?: string | null;
            cmp_isfeatured?: boolean | null;
            cmp_status?: string | null;
        },
        options?: { transaction?: any }
    ) {
        try {
            const companyValue = new CompanyValue(data);
            const companyCreated = await this.companyRepository.createCompany(companyValue, options);
            if (!companyCreated) {
                throw new Error(`No se pudo insertar la empresa.`);
            }
            return {
                cmp_uuid: companyCreated.cmp_uuid,
                cmp_name: companyCreated.cmp_name,
                cmp_address: companyCreated.cmp_address,
                cmp_lat: companyCreated.cmp_lat,
                cmp_lng: companyCreated.cmp_lng,
                cmp_phone: companyCreated.cmp_phone,
                cmp_email: companyCreated.cmp_email,
                cmp_logo: companyCreated.cmp_logo,
                cmp_banner: companyCreated.cmp_banner,
                cmp_description: companyCreated.cmp_description,
                cmp_whatsapp: companyCreated.cmp_whatsapp,
                cmp_instagram: companyCreated.cmp_instagram,
                cmp_facebook: companyCreated.cmp_facebook,
                cmp_primarycolor: companyCreated.cmp_primarycolor,
                cmp_isfeatured: companyCreated.cmp_isfeatured,
                cmp_status: companyCreated.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(companyCreated.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(companyCreated.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCompany (use case):', error.message);
            throw error;
        }
    }

    public async updateCompany(cmp_uuid: string, data: CompanyUpdateData, options?: { transaction?: any }) {
        try {
            const companyUpdated = await this.companyRepository.updateCompany(cmp_uuid, data, options);
            if (!companyUpdated) {
                throw new Error(`No se pudo actualizar la empresa.`);
            }
            return {
                cmp_uuid: companyUpdated.cmp_uuid,
                cmp_name: companyUpdated.cmp_name,
                cmp_address: companyUpdated.cmp_address,
                cmp_lat: companyUpdated.cmp_lat,
                cmp_lng: companyUpdated.cmp_lng,
                cmp_phone: companyUpdated.cmp_phone,
                cmp_email: companyUpdated.cmp_email,
                cmp_logo: companyUpdated.cmp_logo,
                cmp_banner: companyUpdated.cmp_banner,
                cmp_description: companyUpdated.cmp_description,
                cmp_whatsapp: companyUpdated.cmp_whatsapp,
                cmp_instagram: companyUpdated.cmp_instagram,
                cmp_facebook: companyUpdated.cmp_facebook,
                cmp_primarycolor: companyUpdated.cmp_primarycolor,
                cmp_isfeatured: companyUpdated.cmp_isfeatured,
                cmp_status: companyUpdated.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(companyUpdated.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(companyUpdated.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCompany (use case):', error.message);
            throw error;
        }
    }

    public async deleteCompany(cmp_uuid: string, options?: { transaction?: any }) {
        try {
            const companyDeleted = await this.companyRepository.deleteCompany(cmp_uuid, options);
            if (!companyDeleted) {
                throw new Error(`No se pudo eliminar la empresa.`);
            }
            return {
                cmp_uuid: companyDeleted.cmp_uuid,
                cmp_name: companyDeleted.cmp_name,
                cmp_address: companyDeleted.cmp_address,
                cmp_lat: companyDeleted.cmp_lat,
                cmp_lng: companyDeleted.cmp_lng,
                cmp_phone: companyDeleted.cmp_phone,
                cmp_email: companyDeleted.cmp_email,
                cmp_logo: companyDeleted.cmp_logo,
                cmp_banner: companyDeleted.cmp_banner,
                cmp_description: companyDeleted.cmp_description,
                cmp_whatsapp: companyDeleted.cmp_whatsapp,
                cmp_instagram: companyDeleted.cmp_instagram,
                cmp_facebook: companyDeleted.cmp_facebook,
                cmp_primarycolor: companyDeleted.cmp_primarycolor,
                cmp_isfeatured: companyDeleted.cmp_isfeatured,
                cmp_status: companyDeleted.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(companyDeleted.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(companyDeleted.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteCompany (use case):', error.message);
            throw error;
        }
    }

    public async findCompanyByName(cmp_name: string, excludeUuid?: string, options?: { transaction?: any }) {
        try {
            const company = await this.companyRepository.findCompanyByName(cmp_name, excludeUuid, options);
            return company;
        } catch (error: any) {
            console.error('Error en findCompanyByName (use case):', error.message);
            throw error;
        }
    }
}
