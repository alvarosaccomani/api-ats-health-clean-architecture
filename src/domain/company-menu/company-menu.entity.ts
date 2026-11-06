import { MenuEntity } from "../menu/menu.entity";

export interface CompanyMenuEntity {
  cmp_uuid: string;
  mnu_uuid: string;
  menu?: MenuEntity;
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
}
