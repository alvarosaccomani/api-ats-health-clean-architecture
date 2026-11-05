import { SystemTemplateEntity, SystemTemplateCreateInput, SystemTemplateUpdateData } from "../../../domain/system-template/system-template.entity";
import { SystemTemplateRepository } from "../../../domain/system-template/system-template.repository";
import { SequelizeSystemTemplate } from "../../model/system-template/system-template.model";

export class SequelizeSystemTemplateRepository implements SystemTemplateRepository {
    async getSystemTemplates(options?: { transaction?: any }): Promise<SystemTemplateEntity[] | null> {
        try {
            const list = await SequelizeSystemTemplate.findAll({
                transaction: options?.transaction,
                order: [['tplsys_createdat', 'DESC']]
            });
            return list.map(item => item.get({ plain: true }) as SystemTemplateEntity);
        } catch (error: any) {
            console.error('Error en getSystemTemplates:', error.message);
            throw error;
        }
    }

    async findSystemTemplateById(tplsys_uuid: string, options?: { transaction?: any }): Promise<SystemTemplateEntity | null> {
        try {
            const item = await SequelizeSystemTemplate.findOne({
                where: { tplsys_uuid },
                transaction: options?.transaction
            });
            if (!item) {
                return null;
            }
            return item.get({ plain: true }) as SystemTemplateEntity;
        } catch (error: any) {
            console.error('Error en findSystemTemplateById:', error.message);
            throw error;
        }
    }

    async findSystemTemplateByCode(tplsys_code: string, options?: { transaction?: any }): Promise<SystemTemplateEntity | null> {
        try {
            const item = await SequelizeSystemTemplate.findOne({
                where: { tplsys_code },
                transaction: options?.transaction
            });
            if (!item) {
                return null;
            }
            return item.get({ plain: true }) as SystemTemplateEntity;
        } catch (error: any) {
            console.error('Error en findSystemTemplateByCode:', error.message);
            throw error;
        }
    }

    async getSystemTemplatesByItem(itm_uuid: string, options?: { transaction?: any }): Promise<SystemTemplateEntity[] | null> {
        try {
            const list = await SequelizeSystemTemplate.findAll({
                where: { itm_uuid, tplsys_isactive: true },
                transaction: options?.transaction,
                order: [['tplsys_name', 'ASC']]
            });
            return list.map(item => item.get({ plain: true }) as SystemTemplateEntity);
        } catch (error: any) {
            console.error('Error en getSystemTemplatesByItem:', error.message);
            throw error;
        }
    }

    async createSystemTemplate(input: SystemTemplateCreateInput, options?: { transaction?: any }): Promise<SystemTemplateEntity | null> {
        try {
            const created = await SequelizeSystemTemplate.create({
                tplsys_uuid: input.tplsys_uuid!,
                itm_uuid: input.itm_uuid,
                tplsys_code: input.tplsys_code,
                tplsys_name: input.tplsys_name,
                tplsys_version: input.tplsys_version ?? '1.0.0',
                tplsys_description: input.tplsys_description ?? null,
                tplsys_schema: input.tplsys_schema ?? {},
                tplsys_isactive: input.tplsys_isactive ?? true
            }, {
                transaction: options?.transaction
            });

            return created.get({ plain: true }) as SystemTemplateEntity;
        } catch (error: any) {
            console.error('Error en createSystemTemplate:', error.message);
            throw error;
        }
    }

    async updateSystemTemplate(tplsys_uuid: string, data: SystemTemplateUpdateData, options?: { transaction?: any }): Promise<SystemTemplateEntity | null> {
        try {
            const item = await SequelizeSystemTemplate.findOne({
                where: { tplsys_uuid },
                transaction: options?.transaction
            });

            if (!item) {
                return null;
            }

            await item.update({
                itm_uuid: data.itm_uuid ?? item.itm_uuid,
                tplsys_code: data.tplsys_code ?? item.tplsys_code,
                tplsys_name: data.tplsys_name ?? item.tplsys_name,
                tplsys_version: data.tplsys_version ?? item.tplsys_version,
                tplsys_description: data.tplsys_description !== undefined ? data.tplsys_description : item.tplsys_description,
                tplsys_schema: data.tplsys_schema ?? item.tplsys_schema,
                tplsys_isactive: data.tplsys_isactive !== undefined ? data.tplsys_isactive : item.tplsys_isactive
            }, {
                transaction: options?.transaction
            });

            return item.get({ plain: true }) as SystemTemplateEntity;
        } catch (error: any) {
            console.error('Error en updateSystemTemplate:', error.message);
            throw error;
        }
    }

    async deleteSystemTemplate(tplsys_uuid: string, options?: { transaction?: any }): Promise<SystemTemplateEntity | null> {
        try {
            const item = await this.findSystemTemplateById(tplsys_uuid, options);
            if (!item) {
                return null;
            }

            await SequelizeSystemTemplate.destroy({
                where: { tplsys_uuid },
                transaction: options?.transaction
            });

            return item;
        } catch (error: any) {
            console.error('Error en deleteSystemTemplate:', error.message);
            throw error;
        }
    }
}
