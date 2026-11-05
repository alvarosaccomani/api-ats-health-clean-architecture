import { SystemTemplateEntity } from "../system-template/system-template.entity";

export interface TemplateEntity {
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
    tpl_createdat?: Date;
    tpl_updatedat?: Date;

    // Relación poblada opcional
    system_template?: SystemTemplateEntity | null;
}

export interface TemplateCreateInput {
    cmp_uuid: string;
    tpl_uuid?: string;
    itm_uuid: string;
    cmpitm_uuid: string;
    tplsys_uuid?: string | null;
    tpl_code: string;
    tpl_name: string;
    tpl_version?: string;
    tpl_schema: Record<string, any>;
    tpl_isactive?: boolean;
}

export interface TemplateCloneInput {
    cmp_uuid: string;
    tplsys_uuid: string;
    cmpitm_uuid: string;
    itm_uuid?: string;
    tpl_code?: string;
    tpl_name?: string;
}

export type TemplateUpdateData = Partial<Omit<TemplateEntity, 'cmp_uuid' | 'tpl_uuid' | 'tpl_createdat' | 'tpl_updatedat' | 'system_template'>>;
