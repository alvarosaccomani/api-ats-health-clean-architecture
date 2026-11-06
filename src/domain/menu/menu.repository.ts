import { MenuEntity, MenuUpdateData } from "./menu.entity";

export interface MenuRepository {
    getMenus(mnu_title?: string, field_order?: string, mnu_orderby?: string, mnu_showondashboard?: boolean, options?: { transaction?: any }): Promise<MenuEntity[] | null>;
    findMenuById(mnu_uuid: string, options?: { transaction?: any }): Promise<MenuEntity | null>;
    createMenu(menu: MenuEntity, options?: { transaction?: any }): Promise<MenuEntity | null>;
    updateMenu(mnu_uuid: string, menu: MenuUpdateData, options?: { transaction?: any }): Promise<MenuEntity | null>;
    deleteMenu(mnu_uuid: string, options?: { transaction?: any }): Promise<MenuEntity | null>;
    findMenuByTitle(mnu_title: string, options?: { transaction?: any }): Promise<MenuEntity | null>;
    getMenuItems(options?: { transaction?: any }): Promise<MenuEntity[] | null>;
    getDashboardMenuItems(options?: { transaction?: any }): Promise<MenuEntity[] | null>;
}
