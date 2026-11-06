import { Op } from "sequelize";
import { MenuEntity, MenuUpdateData } from "../../../domain/menu/menu.entity";
import { MenuRepository } from "../../../domain/menu/menu.repository";
import { SequelizeMenu } from "../../model/menu/menu.model";
import { SequelizePermission } from "../../model/permission/permission.model";
import { SequelizeRolPermission } from "../../model/rol-permission/rol-permission.model";
import { SequelizeRol } from "../../model/rol/rol.model";
import { DbErrorHandler } from "../../utils/db-error-handler";

const includePermissions = [
    {
        model: SequelizePermission,
        as: 'permission',
        include: [
            {
                model: SequelizeRolPermission,
                as: 'rolPermissions',
                include: [
                    {
                        model: SequelizeRol,
                        as: 'rol'
                    }
                ]
            }
        ]
    }
];

export class SequelizeMenuRepository implements MenuRepository {
    async getMenus(
        mnu_title?: string, 
        field_order?: string, 
        mnu_orderby?: string, 
        mnu_showondashboard?: boolean,
        options?: { transaction?: any }
    ): Promise<MenuEntity[] | null> {
        try {
            const where: any = {};
            if (mnu_title) {
                where.mnu_title = { [Op.iLike]: `%${mnu_title}%` };
            }
            if (mnu_showondashboard !== undefined) {
                where.mnu_showondashboard = mnu_showondashboard;
            }
            const orderField = field_order || 'mnu_order';
            const orderDirection = mnu_orderby || 'ASC';
            const menus = await SequelizeMenu.findAll({ 
                where,
                order: [[orderField, orderDirection]],
                transaction: options?.transaction
            });
            if (!menus) {
                return null;
            }
            return menus.map((menu) => menu.get({ plain: true }) as MenuEntity);
        } catch (error: any) {
            console.error('Error en getMenus:', error.message);
            throw error;
        }
    }

    async findMenuById(mnu_uuid: string, options?: { transaction?: any }): Promise<MenuEntity | null> {
        try {
            const menu = await SequelizeMenu.findByPk(mnu_uuid, {
                include: includePermissions,
                transaction: options?.transaction
            });
            if (!menu) {
                return null;
            }
            return menu.get({ plain: true }) as MenuEntity;
        } catch (error: any) {
            console.error('Error en findMenuById:', error.message);
            throw error;
        }
    }

    async createMenu(menu: MenuEntity, options?: { transaction?: any }): Promise<MenuEntity | null> {
        try {
            const result = await SequelizeMenu.create(menu as any, { transaction: options?.transaction });
            if (!result) {
                throw new Error(`No se pudo insertar el menú.`);
            }
            return await this.findMenuById(result.get({ plain: true }).mnu_uuid, options);
        } catch (error: any) {
            console.error('Error en createMenu:', error.message);
            throw error;
        }
    }

    async updateMenu(mnu_uuid: string, menu: MenuUpdateData, options?: { transaction?: any }): Promise<MenuEntity | null> {
        try {
            await SequelizeMenu.update(menu, { 
                where: { mnu_uuid },
                transaction: options?.transaction
            });
            return await this.findMenuById(mnu_uuid, options);
        } catch (error: any) {
            console.error('Error en updateMenu:', error.message);
            throw error;
        }
    }

    async deleteMenu(mnu_uuid: string, options?: { transaction?: any }): Promise<MenuEntity | null> {
        try {
            const menu = await this.findMenuById(mnu_uuid, options);
            if (!menu) {
                return null;
            }
            await SequelizeMenu.destroy({ 
                where: { mnu_uuid },
                transaction: options?.transaction
            });
            return menu;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error('Error en deleteMenu:', error.message);
            throw error;
        }
    }

    async findMenuByTitle(mnu_title: string, options?: { transaction?: any }): Promise<MenuEntity | null> {
        try {
            const menu = await SequelizeMenu.findOne({ 
                where: { mnu_title },
                transaction: options?.transaction
            });
            if (!menu) {
                return null;
            }
            return menu.get({ plain: true }) as MenuEntity;
        } catch (error: any) {
            console.error('Error en findMenuByTitle:', error.message);
            throw error;
        }
    }

    async getMenuItems(options?: { transaction?: any }): Promise<MenuEntity[] | null> {
        try {
            const menus = await SequelizeMenu.findAll({ 
                where: { mnu_itemactive: true, mnu_active: true },
                order: [['mnu_order', 'ASC']],
                include: includePermissions,
                transaction: options?.transaction
            });
            if (!menus) {
                return null;
            }
            return menus.map((menu) => menu.get({ plain: true }) as MenuEntity);
        } catch (error: any) {
            console.error('Error en getMenuItems:', error.message);
            throw error;
        }
    }

    async getDashboardMenuItems(options?: { transaction?: any }): Promise<MenuEntity[] | null> {
        try {
            const menus = await SequelizeMenu.findAll({ 
                where: { mnu_showondashboard: true, mnu_active: true },
                order: [['mnu_order', 'ASC']],
                include: includePermissions,
                transaction: options?.transaction
            });
            if (!menus) {
                return null;
            }
            return menus.map((menu) => menu.get({ plain: true }) as MenuEntity);
        } catch (error: any) {
            console.error('Error en getDashboardMenuItems:', error.message);
            throw error;
        }
    }
}
