import { SystemTemplateEntity, SystemTemplateCreateInput, SystemTemplateUpdateData } from "./system-template.entity";

export interface SystemTemplateRepository {
    getSystemTemplates(options?: { transaction?: any }): Promise<SystemTemplateEntity[] | null>;
    findSystemTemplateById(tplsys_uuid: string, options?: { transaction?: any }): Promise<SystemTemplateEntity | null>;
    findSystemTemplateByCode(tplsys_code: string, options?: { transaction?: any }): Promise<SystemTemplateEntity | null>;
    getSystemTemplatesByItem(itm_uuid: string, options?: { transaction?: any }): Promise<SystemTemplateEntity[] | null>;
    createSystemTemplate(input: SystemTemplateCreateInput, options?: { transaction?: any }): Promise<SystemTemplateEntity | null>;
    updateSystemTemplate(tplsys_uuid: string, data: SystemTemplateUpdateData, options?: { transaction?: any }): Promise<SystemTemplateEntity | null>;
    deleteSystemTemplate(tplsys_uuid: string, options?: { transaction?: any }): Promise<SystemTemplateEntity | null>;
}
