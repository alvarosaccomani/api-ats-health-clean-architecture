import { CompanyItemEntity } from "../../../domain/company-item/company-item.entity";
import { CompanyItemRepository } from "../../../domain/company-item/company-item.repository";
import { SequelizeCompanyItem } from "../../model/company-item/company-item.model";
import { SequelizeItem } from "../../model/item/item.model";
import { DbErrorHandler } from '../../utils/db-error-handler';

export class SequelizeCompanyItemRepository implements CompanyItemRepository {
    async getCompanyItems(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity[] | null> {
        try {
            const companyItems = await SequelizeCompanyItem.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null
                },
                include: [
                    { as: 'itm', model: SequelizeItem }
                ],
                transaction: options?.transaction
            });
            if (!companyItems) {
                return null;
            }
            return companyItems.map((item) => item.get({ plain: true }) as CompanyItemEntity);
        } catch (error: any) {
            console.error('Error en getCompanyItems:', error.message);
            throw error;
        }
    }

    async findCompanyItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity | null> {
        try {
            const companyItem = await SequelizeCompanyItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cmpitm_uuid: cmpitm_uuid ?? null
                },
                include: [
                    { as: 'itm', model: SequelizeItem }
                ],
                transaction: options?.transaction
            });
            if (!companyItem) {
                return null;
            }
            return companyItem.get({ plain: true }) as CompanyItemEntity;
        } catch (error: any) {
            console.error('Error en findCompanyItemById:', error.message);
            throw error;
        }
    }

    async createCompanyItem(companyItem: CompanyItemEntity, options?: { transaction?: any }): Promise<CompanyItemEntity | null> {
        try {
            const { cmp_uuid, itm_uuid, cmpitm_uuid, cmpitm_createdat, cmpitm_updatedat } = companyItem;
            const result = await SequelizeCompanyItem.create(
                { cmp_uuid, itm_uuid, cmpitm_uuid, cmpitm_createdat, cmpitm_updatedat },
                { transaction: options?.transaction }
            );
            if (!result) {
                return null;
            }
            return result.get({ plain: true }) as CompanyItemEntity;
        } catch (error: any) {
            console.error('Error en createCompanyItem:', error.message);
            throw error;
        }
    }

    async updateCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, companyItem: CompanyItemEntity, options?: { transaction?: any }): Promise<CompanyItemEntity | null> {
        try {
            const { cmpitm_createdat, cmpitm_updatedat } = companyItem;
            const [affectedRows] = await SequelizeCompanyItem.update(
                { cmpitm_createdat, cmpitm_updatedat },
                { 
                    where: { cmp_uuid, itm_uuid, cmpitm_uuid },
                    transaction: options?.transaction
                }
            );
            if (affectedRows < 1) {
                return null;
            }
            return await this.findCompanyItemById(cmp_uuid, itm_uuid, cmpitm_uuid, options);
        } catch (error: any) {
            console.error('Error en updateCompanyItem:', error.message);
            throw error;
        }
    }

    async deleteCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity | null> {
        try {
            const companyItem = await this.findCompanyItemById(cmp_uuid, itm_uuid, cmpitm_uuid, options);
            if (!companyItem) {
                return null;
            }
            const result = await SequelizeCompanyItem.destroy({ 
                where: { cmp_uuid, itm_uuid, cmpitm_uuid },
                transaction: options?.transaction
            });
            if (!result) {
                return null;
            }
            return companyItem;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }

            console.error('Error en deleteCompanyItem:', error.message);
            throw error;
        }
    }

    async existCompanyItem(cmp_uuid: string, itm_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity | null> {
        try {
            const companyItem = await SequelizeCompanyItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null
                },
                transaction: options?.transaction
            });
            if (!companyItem) {
                return null;
            }
            return companyItem.get({ plain: true }) as CompanyItemEntity;
        } catch (error: any) {
            console.error('Error en existCompanyItem:', error.message);
            throw error;
        }
    }
}
