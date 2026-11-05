import { v4 as uuid } from "uuid";
import moment from "moment";
import { SystemTemplateEntity, SystemTemplateCreateInput } from "./system-template.entity";

export class SystemTemplateValue implements SystemTemplateEntity {
    tplsys_uuid: string;
    itm_uuid: string;
    tplsys_code: string;
    tplsys_name: string;
    tplsys_version: string;
    tplsys_description?: string | null;
    tplsys_schema: Record<string, any>;
    tplsys_isactive: boolean;
    tplsys_createdat: Date;
    tplsys_updatedat: Date;

    constructor({
        tplsys_uuid,
        itm_uuid,
        tplsys_code,
        tplsys_name,
        tplsys_version,
        tplsys_description,
        tplsys_schema,
        tplsys_isactive
    }: SystemTemplateCreateInput) {
        this.tplsys_uuid = tplsys_uuid ?? uuid();
        this.itm_uuid = itm_uuid;
        this.tplsys_code = tplsys_code;
        this.tplsys_name = tplsys_name;
        this.tplsys_version = tplsys_version ?? '1.0.0';
        this.tplsys_description = tplsys_description ?? null;
        this.tplsys_schema = tplsys_schema ?? {};
        this.tplsys_isactive = tplsys_isactive ?? true;
        this.tplsys_createdat = moment().toDate();
        this.tplsys_updatedat = moment().toDate();
    }
}
