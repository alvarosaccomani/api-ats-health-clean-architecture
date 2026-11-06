import { CompanyEntity, CompanyUpdateData } from "../../../domain/company/company.entity";
import { CompanyRepository } from "../../../domain/company/company.repository";
import { SequelizeCompany } from "../../model/company/company.model";
import { SequelizeCompanySetting } from "../../model/company-setting/company-setting.model";
import { Op } from "sequelize";
import { ImageOptimizer } from "../../utils/ImageOptimizer";
import { DbErrorHandler } from "../../utils/db-error-handler";

export class SequelizeCompanyRepository implements CompanyRepository {
    async getCompanies(options?: { transaction?: any }): Promise<CompanyEntity[] | null> {
        try {
            const companies = await SequelizeCompany.findAll({
                include: [{ model: SequelizeCompanySetting, as: 'companySettings' }],
                transaction: options?.transaction
            });
            if (!companies) {
                return null;
            }
            return companies.map(company => company.get({ plain: true }) as CompanyEntity);
        } catch (error: any) {
            console.error('Error en getCompanies:', error.message);
            throw error;
        }
    }

    async findCompanyById(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyEntity | null> {
        try {
            const company = await SequelizeCompany.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                },
                include: [{ model: SequelizeCompanySetting, as: 'companySettings' }],
                transaction: options?.transaction
            });
            if (!company) {
                return null;
            }
            return company.get({ plain: true }) as CompanyEntity;
        } catch (error: any) {
            console.error('Error en findCompanyById:', error.message);
            throw error;
        }
    }

    async createCompany(company: CompanyEntity, options?: { transaction?: any }): Promise<CompanyEntity | null> {
        try {
            let { cmp_uuid, cmp_name, cmp_address, cmp_lat, cmp_lng, cmp_phone, cmp_email, cmp_logo, cmp_banner, cmp_description, cmp_whatsapp, cmp_instagram, cmp_facebook, cmp_primarycolor, cmp_isfeatured, cmp_status, cmp_createdat, cmp_updatedat } = company;
            if (cmp_logo) {
                cmp_logo = await ImageOptimizer.optimizeBase64(cmp_logo);
            }
            if (cmp_banner) {
                cmp_banner = await ImageOptimizer.optimizeBase64(cmp_banner);
            }
            const result = await SequelizeCompany.create(
                { cmp_uuid, cmp_name, cmp_address, cmp_lat, cmp_lng, cmp_phone, cmp_email, cmp_logo, cmp_banner, cmp_description, cmp_whatsapp, cmp_instagram, cmp_facebook, cmp_primarycolor, cmp_isfeatured, cmp_status, cmp_createdat, cmp_updatedat },
                { transaction: options?.transaction }
            );
            if (!result) {
                return null;
            }
            return result.get({ plain: true }) as CompanyEntity;
        } catch (error: any) {
            console.error('Error en createCompany:', error.message);
            throw error;
        }
    }

    async updateCompany(cmp_uuid: string, company: CompanyUpdateData, options?: { transaction?: any }): Promise<CompanyEntity | null> {
        try {
            let cmp_logo = company.cmp_logo;
            let cmp_banner = company.cmp_banner;
            if (cmp_logo) {
                cmp_logo = await ImageOptimizer.optimizeBase64(cmp_logo);
            }
            if (cmp_banner) {
                cmp_banner = await ImageOptimizer.optimizeBase64(cmp_banner);
            }
            const updatePayload: any = { ...company };
            if (cmp_logo !== undefined) updatePayload.cmp_logo = cmp_logo;
            if (cmp_banner !== undefined) updatePayload.cmp_banner = cmp_banner;

            const [updatedCount] = await SequelizeCompany.update(
                updatePayload,
                { 
                    where: { cmp_uuid },
                    transaction: options?.transaction
                }
            );
            if (updatedCount === 0) {
                return null;
            }
            return await this.findCompanyById(cmp_uuid, options);
        } catch (error: any) {
            console.error('Error en updateCompany:', error.message);
            throw error;
        }
    }

    async deleteCompany(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyEntity | null> {
        try {
            const company = await this.findCompanyById(cmp_uuid, options);
            if (!company) {
                return null;
            }
            const result = await SequelizeCompany.destroy({ 
                where: { cmp_uuid },
                transaction: options?.transaction
            });
            if (!result) {
                return null;
            }
            return company;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error('Error en deleteCompany:', error.message);
            throw error;
        }
    }

    async findCompanyByName(cmp_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<CompanyEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_name: cmp_name ?? null
            };
            if (excludeUuid) {
                whereCondition.cmp_uuid = { [Op.ne]: excludeUuid };
            }
            const company = await SequelizeCompany.findOne({ 
                where: whereCondition,
                transaction: options?.transaction
            });
            if (!company) {
                return null;
            }
            return company.get({ plain: true }) as CompanyEntity;
        } catch (error: any) {
            console.error('Error en findCompanyByName:', error.message);
            throw error;
        }
    }

    async getFeaturedCompanies(options?: { transaction?: any }): Promise<CompanyEntity[] | null> {
        try {
            const companies = await SequelizeCompany.findAll({ 
                where: { 
                    cmp_isfeatured: true
                },
                transaction: options?.transaction
            });
            if (!companies) {
                return null;
            }
            return companies.map(company => company.get({ plain: true }) as CompanyEntity);
        } catch (error: any) {
            console.error('Error en getFeaturedCompanies:', error.message);
            throw error;
        }
    }
}
