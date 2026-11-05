import { TemplateCreateInput, TemplateCloneInput, TemplateUpdateData } from "../../domain/template/template.entity";
import { TemplateRepository } from "../../domain/template/template.repository";
import { TemplateValue } from "../../domain/template/template.value";
import { SystemTemplateRepository } from "../../domain/system-template/system-template.repository";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class TemplateUseCase {
    constructor(
        private readonly templateRepository: TemplateRepository,
        private readonly systemTemplateRepository?: SystemTemplateRepository
    ) {
        this.getTemplatesByCompany = this.getTemplatesByCompany.bind(this);
        this.getTemplateById = this.getTemplateById.bind(this);
        this.getTemplateByCode = this.getTemplateByCode.bind(this);
        this.getTemplatesByItem = this.getTemplatesByItem.bind(this);
        this.createTemplate = this.createTemplate.bind(this);
        this.cloneFromSystemTemplate = this.cloneFromSystemTemplate.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
    }

    public async getTemplatesByCompany(cmp_uuid: string, options?: { transaction?: any }) {
        try {
            if (!cmp_uuid) {
                throw new Error("Se requiere cmp_uuid para consultar las plantillas de la clínica.");
            }
            const list = await this.templateRepository.getTemplatesByCompany(cmp_uuid, options);
            if (!list) {
                return [];
            }
            return list.map(item => ({
                ...item,
                tpl_createdat: item.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: item.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getTemplatesByCompany (use case):', error.message);
            throw error;
        }
    }

    public async getTemplateById(cmp_uuid: string, tpl_uuid: string, options?: { transaction?: any }) {
        try {
            if (!cmp_uuid || !tpl_uuid) {
                throw new Error("Se requiere cmp_uuid y tpl_uuid.");
            }
            const item = await this.templateRepository.findTemplateById(cmp_uuid, tpl_uuid, options);
            if (!item) {
                throw new Error(`Plantilla con ID ${tpl_uuid} no encontrada para esta clínica.`);
            }
            return {
                ...item,
                tpl_createdat: item.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: item.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en getTemplateById (use case):', error.message);
            throw error;
        }
    }

    public async getTemplateByCode(cmp_uuid: string, tpl_code: string, options?: { transaction?: any }) {
        try {
            if (!cmp_uuid || !tpl_code) {
                throw new Error("Se requiere cmp_uuid y tpl_code.");
            }
            const item = await this.templateRepository.findTemplateByCode(cmp_uuid, tpl_code, options);
            if (!item) {
                throw new Error(`Plantilla con código ${tpl_code} no encontrada en la clínica.`);
            }
            return {
                ...item,
                tpl_createdat: item.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: item.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en getTemplateByCode (use case):', error.message);
            throw error;
        }
    }

    public async getTemplatesByItem(cmp_uuid: string, itm_uuid: string, options?: { transaction?: any }) {
        try {
            if (!cmp_uuid || !itm_uuid) {
                throw new Error("Se requiere cmp_uuid e itm_uuid.");
            }
            const list = await this.templateRepository.getTemplatesByItem(cmp_uuid, itm_uuid, options);
            if (!list) {
                return [];
            }
            return list.map(item => ({
                ...item,
                tpl_createdat: item.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: item.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tpl_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getTemplatesByItem (use case):', error.message);
            throw error;
        }
    }

    public async createTemplate(input: TemplateCreateInput, options?: { transaction?: any }) {
        try {
            if (!input.cmp_uuid) {
                throw new Error("Se requiere cmp_uuid.");
            }
            if (!input.itm_uuid) {
                throw new Error("Se requiere itm_uuid.");
            }
            if (!input.cmpitm_uuid) {
                throw new Error("Se requiere cmpitm_uuid.");
            }
            if (!input.tpl_code || input.tpl_code.trim() === '') {
                throw new Error("Se requiere tpl_code.");
            }
            if (!input.tpl_name || input.tpl_name.trim() === '') {
                throw new Error("Se requiere tpl_name.");
            }
            if (!input.tpl_schema || typeof input.tpl_schema !== 'object') {
                throw new Error("Se requiere un tpl_schema válido en formato JSON.");
            }

            const existing = await this.templateRepository.findTemplateByCode(input.cmp_uuid, input.tpl_code.trim(), options);
            if (existing) {
                throw new Error(`El código de plantilla ${input.tpl_code} ya existe en esta clínica.`);
            }

            const val = new TemplateValue({
                ...input,
                tpl_code: input.tpl_code.trim()
            });

            const created = await this.templateRepository.createTemplate(val, options);
            if (!created) {
                throw new Error("No se pudo crear la plantilla.");
            }

            return {
                ...created,
                tpl_createdat: created.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(created.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: created.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(created.tpl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createTemplate (use case):', error.message);
            throw error;
        }
    }

    public async cloneFromSystemTemplate(input: TemplateCloneInput, options?: { transaction?: any }) {
        try {
            if (!input.cmp_uuid) {
                throw new Error("Se requiere cmp_uuid.");
            }
            if (!input.tplsys_uuid) {
                throw new Error("Se requiere tplsys_uuid del blueprint a clonar.");
            }
            if (!input.cmpitm_uuid) {
                throw new Error("Se requiere cmpitm_uuid.");
            }
            if (!this.systemTemplateRepository) {
                throw new Error("SystemTemplateRepository no está inyectado para clonar blueprints.");
            }

            const systemTemplate = await this.systemTemplateRepository.findSystemTemplateById(input.tplsys_uuid, options);
            if (!systemTemplate) {
                throw new Error(`Blueprint global con ID ${input.tplsys_uuid} no encontrado.`);
            }

            const targetCode = input.tpl_code ? input.tpl_code.trim() : systemTemplate.tplsys_code;
            const targetName = input.tpl_name ? input.tpl_name.trim() : systemTemplate.tplsys_name;
            const targetItem = input.itm_uuid || systemTemplate.itm_uuid;

            const existing = await this.templateRepository.findTemplateByCode(input.cmp_uuid, targetCode, options);
            if (existing) {
                throw new Error(`La clínica ya posee una plantilla con el código ${targetCode}.`);
            }

            const val = new TemplateValue({
                cmp_uuid: input.cmp_uuid,
                itm_uuid: targetItem,
                cmpitm_uuid: input.cmpitm_uuid,
                tplsys_uuid: systemTemplate.tplsys_uuid,
                tpl_code: targetCode,
                tpl_name: targetName,
                tpl_version: systemTemplate.tplsys_version,
                tpl_schema: systemTemplate.tplsys_schema,
                tpl_isactive: true
            });

            const created = await this.templateRepository.createTemplate(val, options);
            if (!created) {
                throw new Error("No se pudo clonar la plantilla desde el blueprint.");
            }

            return {
                ...created,
                tpl_createdat: created.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(created.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: created.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(created.tpl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en cloneFromSystemTemplate (use case):', error.message);
            throw error;
        }
    }

    public async updateTemplate(cmp_uuid: string, tpl_uuid: string, data: TemplateUpdateData, options?: { transaction?: any }) {
        try {
            if (!cmp_uuid || !tpl_uuid) {
                throw new Error("Se requiere cmp_uuid y tpl_uuid.");
            }

            if (data.tpl_code) {
                const existing = await this.templateRepository.findTemplateByCode(cmp_uuid, data.tpl_code.trim(), options);
                if (existing && existing.tpl_uuid !== tpl_uuid) {
                    throw new Error(`El código ${data.tpl_code} ya está registrado en otra plantilla de la clínica.`);
                }
            }

            const updated = await this.templateRepository.updateTemplate(cmp_uuid, tpl_uuid, data, options);
            if (!updated) {
                throw new Error(`No se pudo actualizar la plantilla ${tpl_uuid}.`);
            }

            return {
                ...updated,
                tpl_createdat: updated.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(updated.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: updated.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(updated.tpl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateTemplate (use case):', error.message);
            throw error;
        }
    }

    public async deleteTemplate(cmp_uuid: string, tpl_uuid: string, options?: { transaction?: any }) {
        try {
            if (!cmp_uuid || !tpl_uuid) {
                throw new Error("Se requiere cmp_uuid y tpl_uuid.");
            }
            const deleted = await this.templateRepository.deleteTemplate(cmp_uuid, tpl_uuid, options);
            if (!deleted) {
                throw new Error(`No se pudo eliminar la plantilla ${tpl_uuid}.`);
            }
            return {
                ...deleted,
                tpl_createdat: deleted.tpl_createdat ? TimezoneConverter.toIsoStringInTimezone(deleted.tpl_createdat, 'America/Buenos_Aires') : undefined,
                tpl_updatedat: deleted.tpl_updatedat ? TimezoneConverter.toIsoStringInTimezone(deleted.tpl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteTemplate (use case):', error.message);
            throw error;
        }
    }
}
