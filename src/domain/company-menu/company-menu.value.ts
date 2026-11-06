import { v4 as uuid } from "uuid";
import moment from "moment";
import { CompanyMenuEntity } from "./company-menu.entity";

export class CompanyMenuValue implements CompanyMenuEntity {
  cmp_uuid: string;
  mnu_uuid: string;
  cmpmnu_uuid: string;
  cmpmnu_title: string | null;
  cmpmnu_description: string | null;
  cmpmnu_icon: string | null;
  cmpmnu_order: number | null;
  cmpmnu_showondashboard: boolean | null;
  cmpmnu_dashboardtitle: string | null;
  cmpmnu_dashboardicon: string | null;
  cmpmnu_active: boolean | null;
  cmpmnu_createdat: Date;
  cmpmnu_updatedat: Date;

  constructor({
    cmp_uuid,
    mnu_uuid,
    cmpmnu_uuid,
    cmpmnu_title,
    cmpmnu_description,
    cmpmnu_icon,
    cmpmnu_order,
    cmpmnu_showondashboard,
    cmpmnu_dashboardtitle,
    cmpmnu_dashboardicon,
    cmpmnu_active,
    cmpmnu_createdat,
    cmpmnu_updatedat
  }: {
    cmp_uuid: string;
    mnu_uuid: string;
    cmpmnu_uuid?: string;
    cmpmnu_title?: string | null;
    cmpmnu_description?: string | null;
    cmpmnu_icon?: string | null;
    cmpmnu_order?: number | null;
    cmpmnu_showondashboard?: boolean | null;
    cmpmnu_dashboardtitle?: string | null;
    cmpmnu_dashboardicon?: string | null;
    cmpmnu_active?: boolean | null;
    cmpmnu_createdat?: Date;
    cmpmnu_updatedat?: Date;
  }) {
    this.cmp_uuid = cmp_uuid;
    this.mnu_uuid = mnu_uuid;
    this.cmpmnu_uuid = cmpmnu_uuid ?? uuid();
    this.cmpmnu_title = cmpmnu_title ?? null;
    this.cmpmnu_description = cmpmnu_description ?? null;
    this.cmpmnu_icon = cmpmnu_icon ?? null;
    this.cmpmnu_order = cmpmnu_order ?? null;
    this.cmpmnu_showondashboard = cmpmnu_showondashboard ?? null;
    this.cmpmnu_dashboardtitle = cmpmnu_dashboardtitle ?? null;
    this.cmpmnu_dashboardicon = cmpmnu_dashboardicon ?? null;
    this.cmpmnu_active = cmpmnu_active ?? true;
    this.cmpmnu_createdat = cmpmnu_createdat ?? moment().toDate();
    this.cmpmnu_updatedat = cmpmnu_updatedat ?? moment().toDate();
  }
}
