import { CompanyMenuEntity } from "../../../domain/company-menu/company-menu.entity";
import { CompanyMenuRepository } from "../../../domain/company-menu/company-menu.repository";
import { SequelizeCompanyMenu } from "../../model/company-menu/company-menu.model";
import { SequelizeMenu } from "../../model/menu/menu.model";
import { DbErrorHandler } from "../../utils/db-error-handler";

export class SequelizeCompanyMenuRepository implements CompanyMenuRepository {
    async createCompanyMenu(data: CompanyMenuEntity, options?: { transaction?: any }): Promise<CompanyMenuEntity | null> {
        try {
            const result = await SequelizeCompanyMenu.create(data as any, { transaction: options?.transaction });
            if (!result) {
                return null;
            }
            return result.get({ plain: true }) as CompanyMenuEntity;
        } catch (error: any) {
            console.error('Error en createCompanyMenu:', error.message);
            throw error;
        }
    }

    async updateCompanyMenu(cmpmnu_uuid: string, data: Partial<CompanyMenuEntity>, options?: { transaction?: any }): Promise<CompanyMenuEntity | null> {
        try {
            await SequelizeCompanyMenu.update(data, { 
                where: { cmpmnu_uuid },
                transaction: options?.transaction
            });
            return await this.findOverrideById(cmpmnu_uuid, options);
        } catch (error: any) {
            console.error('Error en updateCompanyMenu:', error.message);
            throw error;
        }
    }

    async deleteCompanyMenu(cmpmnu_uuid: string, options?: { transaction?: any }): Promise<CompanyMenuEntity | null> {
        try {
            const item = await this.findOverrideById(cmpmnu_uuid, options);
            if (!item) {
                return null;
            }
            await SequelizeCompanyMenu.destroy({ 
                where: { cmpmnu_uuid },
                transaction: options?.transaction
            });
            return item;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error('Error en deleteCompanyMenu:', error.message);
            throw error;
        }
    }

    async getCompanyOverrides(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyMenuEntity[] | null> {
        try {
            const results = await SequelizeCompanyMenu.findAll({ 
                where: { cmp_uuid },
                include: [{ model: SequelizeMenu, as: 'menu' }],
                transaction: options?.transaction
            });
            if (!results) {
                return null;
            }
            return results.map(r => r.get({ plain: true }) as CompanyMenuEntity);
        } catch (error: any) {
            console.error('Error en getCompanyOverrides:', error.message);
            throw error;
        }
    }

    async findOverrideById(cmpmnu_uuid: string, options?: { transaction?: any }): Promise<CompanyMenuEntity | null> {
        try {
            const result = await SequelizeCompanyMenu.findOne({ 
                where: { cmpmnu_uuid },
                include: [{ model: SequelizeMenu, as: 'menu' }],
                transaction: options?.transaction
            });
            if (!result) {
                return null;
            }
            return result.get({ plain: true }) as CompanyMenuEntity;
        } catch (error: any) {
            console.error('Error en findOverrideById:', error.message);
            throw error;
        }
    }
}
