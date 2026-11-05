import { TemplateEntity, TemplateCreateInput, TemplateUpdateData } from "../../../domain/template/template.entity";
import { TemplateRepository } from "../../../domain/template/template.repository";
import { SequelizeTemplate } from "../../model/template/template.model";
import { SequelizeSystemTemplate } from "../../model/system-template/system-template.model";

export class SequelizeTemplateRepository implements TemplateRepository {
    async getTemplatesByCompany(cmp_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity[] | null> {
        try {
            const list = await SequelizeTemplate.findAll({
                where: { cmp_uuid },
                transaction: options?.transaction,
                order: [['tpl_createdat', 'DESC']],
                include: [
                    { model: SequelizeSystemTemplate, as: 'system_template' }
                ]
            });
            return list.map(item => item.get({ plain: true }) as TemplateEntity);
        } catch (error: any) {
            console.error('Error en getTemplatesByCompany:', error.message);
            throw error;
        }
    }

    async findTemplateById(cmp_uuid: string, tpl_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity | null> {
        try {
            const item = await SequelizeTemplate.findOne({
                where: { cmp_uuid, tpl_uuid },
                transaction: options?.transaction,
                include: [
                    { model: SequelizeSystemTemplate, as: 'system_template' }
                ]
            });
            if (!item) {
                return null;
            }
            return item.get({ plain: true }) as TemplateEntity;
        } catch (error: any) {
            console.error('Error en findTemplateById:', error.message);
            throw error;
        }
    }

    async findTemplateByCode(cmp_uuid: string, tpl_code: string, options?: { transaction?: any }): Promise<TemplateEntity | null> {
        try {
            const item = await SequelizeTemplate.findOne({
                where: { cmp_uuid, tpl_code },
                transaction: options?.transaction,
                include: [
                    { model: SequelizeSystemTemplate, as: 'system_template' }
                ]
            });
            if (!item) {
                return null;
            }
            return item.get({ plain: true }) as TemplateEntity;
        } catch (error: any) {
            console.error('Error en findTemplateByCode:', error.message);
            throw error;
        }
    }

    async getTemplatesByItem(cmp_uuid: string, itm_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity[] | null> {
        try {
            const list = await SequelizeTemplate.findAll({
                where: { cmp_uuid, itm_uuid, tpl_isactive: true },
                transaction: options?.transaction,
                order: [['tpl_name', 'ASC']],
                include: [
                    { model: SequelizeSystemTemplate, as: 'system_template' }
                ]
            });
            return list.map(item => item.get({ plain: true }) as TemplateEntity);
        } catch (error: any) {
            console.error('Error en getTemplatesByItem:', error.message);
            throw error;
        }
    }

    async createTemplate(input: TemplateCreateInput, options?: { transaction?: any }): Promise<TemplateEntity | null> {
        try {
            const created = await SequelizeTemplate.create({
                cmp_uuid: input.cmp_uuid,
                tpl_uuid: input.tpl_uuid!,
                itm_uuid: input.itm_uuid,
                cmpitm_uuid: input.cmpitm_uuid,
                tplsys_uuid: input.tplsys_uuid ?? null,
                tpl_code: input.tpl_code,
                tpl_name: input.tpl_name,
                tpl_version: input.tpl_version ?? '1.0.0',
                tpl_schema: input.tpl_schema ?? {},
                tpl_isactive: input.tpl_isactive ?? true
            }, {
                transaction: options?.transaction
            });

            return await this.findTemplateById(created.cmp_uuid, created.tpl_uuid, options);
        } catch (error: any) {
            console.error('Error en createTemplate:', error.message);
            throw error;
        }
    }

    async updateTemplate(cmp_uuid: string, tpl_uuid: string, data: TemplateUpdateData, options?: { transaction?: any }): Promise<TemplateEntity | null> {
        try {
            const item = await SequelizeTemplate.findOne({
                where: { cmp_uuid, tpl_uuid },
                transaction: options?.transaction
            });

            if (!item) {
                return null;
            }

            await item.update({
                itm_uuid: data.itm_uuid ?? item.itm_uuid,
                cmpitm_uuid: data.cmpitm_uuid ?? item.cmpitm_uuid,
                tplsys_uuid: data.tplsys_uuid !== undefined ? data.tplsys_uuid : item.tplsys_uuid,
                tpl_code: data.tpl_code ?? item.tpl_code,
                tpl_name: data.tpl_name ?? item.tpl_name,
                tpl_version: data.tpl_version ?? item.tpl_version,
                tpl_schema: data.tpl_schema ?? item.tpl_schema,
                tpl_isactive: data.tpl_isactive !== undefined ? data.tpl_isactive : item.tpl_isactive
            }, {
                transaction: options?.transaction
            });

            return await this.findTemplateById(cmp_uuid, tpl_uuid, options);
        } catch (error: any) {
            console.error('Error en updateTemplate:', error.message);
            throw error;
        }
    }

    async deleteTemplate(cmp_uuid: string, tpl_uuid: string, options?: { transaction?: any }): Promise<TemplateEntity | null> {
        try {
            const item = await this.findTemplateById(cmp_uuid, tpl_uuid, options);
            if (!item) {
                return null;
            }

            await SequelizeTemplate.destroy({
                where: { cmp_uuid, tpl_uuid },
                transaction: options?.transaction
            });

            return item;
        } catch (error: any) {
            console.error('Error en deleteTemplate:', error.message);
            throw error;
        }
    }
}
