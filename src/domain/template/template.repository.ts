import { TemplateEntity, TemplateCreateInput, TemplateUpdateData } from "./template.entity";

export interface TemplateRepository {
    getTemplatesByCompany(cmp_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity[] | null>;
    findTemplateById(cmp_uuid: string, tpl_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity | null>;
    findTemplateByCode(cmp_uuid: string, tpl_code: string, options?: { transaction?: any }): Promise<TemplateEntity | null>;
    getTemplatesByItem(cmp_uuid: string, itm_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity[] | null>;
    createTemplate(input: TemplateCreateInput, options?: { transaction?: any }): Promise<TemplateEntity | null>;
    updateTemplate(cmp_uuid: string, tpl_uuid: string, data: TemplateUpdateData, options?: { transaction?: any }): Promise<TemplateEntity | null>;
    deleteTemplate(cmp_uuid: string, tpl_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity | null>;
}
