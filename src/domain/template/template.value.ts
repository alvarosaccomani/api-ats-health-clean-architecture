import { v4 as uuid } from "uuid";
import moment from "moment";
import { TemplateEntity, TemplateCreateInput } from "./template.entity";

export class TemplateValue implements TemplateEntity {
    cmp_uuid: string;
    tpl_uuid: string;
    itm_uuid: string;
    cmpitm_uuid: string;
    tplsys_uuid?: string | null;
    tpl_code: string;
    tpl_name: string;
    tpl_version: string;
    tpl_schema: Record<string, any>;
    tpl_isactive: boolean;
    tpl_createdat: Date;
    tpl_updatedat: Date;

    constructor({
        cmp_uuid,
        tpl_uuid,
        itm_uuid,
        cmpitm_uuid,
        tplsys_uuid,
        tpl_code,
        tpl_name,
        tpl_version,
        tpl_schema,
        tpl_isactive
    }: TemplateCreateInput) {
        this.cmp_uuid = cmp_uuid;
        this.tpl_uuid = tpl_uuid ?? uuid();
        this.itm_uuid = itm_uuid;
        this.cmpitm_uuid = cmpitm_uuid;
        this.tplsys_uuid = tplsys_uuid ?? null;
        this.tpl_code = tpl_code;
        this.tpl_name = tpl_name;
        this.tpl_version = tpl_version ?? '1.0.0';
        this.tpl_schema = tpl_schema ?? {};
        this.tpl_isactive = tpl_isactive ?? true;
        this.tpl_createdat = moment().toDate();
        this.tpl_updatedat = moment().toDate();
    }
}
