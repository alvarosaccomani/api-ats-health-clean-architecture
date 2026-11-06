import { v4 as uuid } from "uuid";
import moment from 'moment';
import { MenuEntity } from "./menu.entity";

export class MenuValue implements MenuEntity {
    mnu_uuid: string;
    mnu_parent_uuid: string | null;
    mnu_cod: string | null;
    mnu_title: string;
    mnu_description: string | null;
    mnu_icon: string | null;
    mnu_route: string | null;
    mnu_order: number;
    mnu_showifcompanyactive: boolean;
    mnu_itemactive: boolean;
    mnu_active: boolean;
    mnu_createdat: Date;
    mnu_updatedat: Date;
    per_uuid: string | null;
    mnu_showondashboard: boolean;
    mnu_dashboardicon: string | null;
    mnu_dashboardtitle: string | null;
    
    constructor({
            mnu_uuid,
            mnu_parent_uuid,
            mnu_cod,
            mnu_title,
            mnu_description,
            mnu_icon,
            mnu_route,
            mnu_order,
            mnu_showifcompanyactive,
            mnu_itemactive,
            mnu_active,
            mnu_createdat,
            mnu_updatedat,
            per_uuid,
            mnu_showondashboard,
            mnu_dashboardicon,
            mnu_dashboardtitle
        }:{ 
            mnu_uuid?: string;
            mnu_parent_uuid?: string | null;
            mnu_cod?: string | null;
            mnu_title: string;
            mnu_description?: string | null;
            mnu_icon?: string | null;
            mnu_route?: string | null;
            mnu_order?: number;
            mnu_showifcompanyactive?: boolean;
            mnu_itemactive?: boolean;
            mnu_active?: boolean;
            mnu_createdat?: Date;
            mnu_updatedat?: Date;
            per_uuid?: string | null;
            mnu_showondashboard?: boolean;
            mnu_dashboardicon?: string | null;
            mnu_dashboardtitle?: string | null;
        }) {
        this.mnu_uuid = mnu_uuid ?? uuid();
        this.mnu_parent_uuid = mnu_parent_uuid ?? null;
        this.mnu_cod = mnu_cod ?? null;
        this.mnu_title = mnu_title;
        this.mnu_description = mnu_description ?? null;
        this.mnu_icon = mnu_icon ?? null;
        this.mnu_route = mnu_route ?? null;
        this.mnu_order = mnu_order ?? 0;
        this.mnu_showifcompanyactive = mnu_showifcompanyactive ?? false;
        this.mnu_itemactive = mnu_itemactive ?? true;
        this.mnu_active = mnu_active ?? true;
        this.mnu_createdat = mnu_createdat ?? moment().toDate();
        this.mnu_updatedat = mnu_updatedat ?? moment().toDate();
        this.per_uuid = per_uuid ?? null;
        this.mnu_showondashboard = mnu_showondashboard ?? false;
        this.mnu_dashboardicon = mnu_dashboardicon ?? null;
        this.mnu_dashboardtitle = mnu_dashboardtitle ?? null;
    }
}
