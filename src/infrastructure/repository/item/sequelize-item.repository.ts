import { ItemEntity, ItemCreateInput, ItemUpdateData } from "../../../domain/item/item.entity";
import { ItemRepository } from "../../../domain/item/item.repository";
import { SequelizeItem } from "../../model/item/item.model";
import { Sequelize, Op } from "sequelize";
import { DbErrorHandler } from '../../utils/db-error-handler';

export class SequelizeItemRepository implements ItemRepository {
    async getItems(itm_name?: string, itm_description?: string, field_order?: string, itm_orderby?: string, options?: { transaction?: any }): Promise<ItemEntity[] | null> {
        try {
            const where: any = {};
            if (itm_name) {
                where.itm_name = { [Op.iLike]: `%${itm_name}%` };
            }
            if (itm_description) {
                where.itm_description = { [Op.iLike]: `%${itm_description}%` };
            }
            const items = await SequelizeItem.findAll({ 
                where,
                order: [[Sequelize.col(field_order || 'itm_name'), itm_orderby || 'ASC']],
                transaction: options?.transaction
            });
            return items.map(i => i.get({ plain: true }) as ItemEntity);
        } catch (error: any) {
            console.error('Error en getItems:', error.message);
            throw error;
        }
    }

    async findItemById(itm_uuid: string, options?: { transaction?: any }): Promise<ItemEntity | null> {
        try {
            const item = await SequelizeItem.findOne({ 
                where: { itm_uuid },
                transaction: options?.transaction
            });
            if (!item) {
                return null;
            }
            return item.get({ plain: true }) as ItemEntity;
        } catch (error: any) {
            console.error('Error en findItemById:', error.message);
            throw error;
        }
    }

    async findItemByName(itm_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<ItemEntity | null> {
        try {
            const whereCondition: any = { itm_name };
            if (excludeUuid) {
                whereCondition.itm_uuid = { [Op.ne]: excludeUuid };    
            }
            const item = await SequelizeItem.findOne({ 
                where: whereCondition,
                transaction: options?.transaction
            });
            if (!item) {
                return null;
            }
            return item.get({ plain: true }) as ItemEntity;
        } catch (error: any) {
            console.error('Error en findItemByName:', error.message);
            throw error;
        }
    }

    async createItem(item: ItemCreateInput, options?: { transaction?: any }): Promise<ItemEntity | null> {
        try {
            const result = await SequelizeItem.create({
                itm_uuid: item.itm_uuid!,
                itm_name: item.itm_name,
                itm_description: item.itm_description
            }, {
                transaction: options?.transaction
            });

            return result.get({ plain: true }) as ItemEntity;
        } catch (error: any) {
            console.error('Error en createItem:', error.message);
            throw error;
        }
    }

    async updateItem(itm_uuid: string, item: ItemUpdateData, options?: { transaction?: any }): Promise<ItemEntity | null> {
        try {
            const existing = await SequelizeItem.findOne({
                where: { itm_uuid },
                transaction: options?.transaction
            });

            if (!existing) {
                return null;
            }

            await existing.update({
                itm_name: item.itm_name ?? existing.itm_name,
                itm_description: item.itm_description !== undefined ? item.itm_description : existing.itm_description
            }, {
                transaction: options?.transaction
            });

            return existing.get({ plain: true }) as ItemEntity;
        } catch (error: any) {
            console.error('Error en updateItem:', error.message);
            throw error;
        }
    }

    async deleteItem(itm_uuid: string, options?: { transaction?: any }): Promise<ItemEntity | null> {
        try {
            const item = await this.findItemById(itm_uuid, options);
            if (!item) {
                return null;
            }

            await SequelizeItem.destroy({
                where: { itm_uuid },
                transaction: options?.transaction
            });

            return item;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }

            console.error('Error en deleteItem:', error.message);
            throw error;
        }
    }
}
