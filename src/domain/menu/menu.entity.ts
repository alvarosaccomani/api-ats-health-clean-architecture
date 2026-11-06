export interface MenuEntity {
    mnu_uuid: string;
    mnu_parent_uuid?: string | null;
    mnu_cod?: string | null;
    mnu_title: string;
    mnu_description?: string | null;
    mnu_icon?: string | null;
    mnu_route?: string | null;
    mnu_order: number;
    mnu_itemactive: boolean;
    mnu_active: boolean;
    mnu_showifcompanyactive: boolean;
    mnu_createdat: Date;
    mnu_updatedat: Date;
    per_uuid?: string | null;
    mnu_showondashboard?: boolean;
    mnu_dashboardicon?: string | null;
    mnu_dashboardtitle?: string | null;
}

export interface MenuItemTree extends MenuEntity {
    items?: MenuItemTree[];
}

export type MenuUpdateData = Pick<MenuEntity, 'mnu_parent_uuid' | 'mnu_cod' | 'mnu_title' | 'mnu_description' | 'mnu_icon' | 'mnu_route' | 'mnu_order' | 'mnu_itemactive' | 'mnu_active' | 'mnu_showifcompanyactive' | 'per_uuid' | 'mnu_showondashboard' | 'mnu_dashboardicon' | 'mnu_dashboardtitle'>;
