import { SystemTemplateCreateInput, SystemTemplateUpdateData } from "../../domain/system-template/system-template.entity";
import { SystemTemplateRepository } from "../../domain/system-template/system-template.repository";
import { SystemTemplateValue } from "../../domain/system-template/system-template.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class SystemTemplateUseCase {
    constructor(
        private readonly systemTemplateRepository: SystemTemplateRepository
    ) {
        this.getSystemTemplates = this.getSystemTemplates.bind(this);
        this.getSystemTemplateById = this.getSystemTemplateById.bind(this);
        this.getSystemTemplateByCode = this.getSystemTemplateByCode.bind(this);
        this.getSystemTemplatesByItem = this.getSystemTemplatesByItem.bind(this);
        this.createSystemTemplate = this.createSystemTemplate.bind(this);
        this.updateSystemTemplate = this.updateSystemTemplate.bind(this);
        this.deleteSystemTemplate = this.deleteSystemTemplate.bind(this);
    }

    public async getSystemTemplates(options?: { transaction?: any }) {
        try {
            const list = await this.systemTemplateRepository.getSystemTemplates(options);
            if (!list) {
                return [];
            }
            return list.map(item => ({
                ...item,
                tplsys_createdat: item.tplsys_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_createdat, 'America/Buenos_Aires') : undefined,
                tplsys_updatedat: item.tplsys_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getSystemTemplates (use case):', error.message);
            throw error;
        }
    }

    public async getSystemTemplateById(tplsys_uuid: string, options?: { transaction?: any }) {
        try {
            if (!tplsys_uuid) {
                throw new Error("Se requiere tplsys_uuid.");
            }
            const item = await this.systemTemplateRepository.findSystemTemplateById(tplsys_uuid, options);
            if (!item) {
                throw new Error(`Plantilla del sistema con ID ${tplsys_uuid} no encontrada.`);
            }
            return {
                ...item,
                tplsys_createdat: item.tplsys_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_createdat, 'America/Buenos_Aires') : undefined,
                tplsys_updatedat: item.tplsys_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en getSystemTemplateById (use case):', error.message);
            throw error;
        }
    }

    public async getSystemTemplateByCode(tplsys_code: string, options?: { transaction?: any }) {
        try {
            if (!tplsys_code) {
                throw new Error("Se requiere tplsys_code.");
            }
            const item = await this.systemTemplateRepository.findSystemTemplateByCode(tplsys_code, options);
            if (!item) {
                throw new Error(`Plantilla del sistema con código ${tplsys_code} no encontrada.`);
            }
            return {
                ...item,
                tplsys_createdat: item.tplsys_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_createdat, 'America/Buenos_Aires') : undefined,
                tplsys_updatedat: item.tplsys_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en getSystemTemplateByCode (use case):', error.message);
            throw error;
        }
    }

    public async getSystemTemplatesByItem(itm_uuid: string, options?: { transaction?: any }) {
        try {
            if (!itm_uuid) {
                throw new Error("Se requiere itm_uuid.");
            }
            const list = await this.systemTemplateRepository.getSystemTemplatesByItem(itm_uuid, options);
            if (!list) {
                return [];
            }
            return list.map(item => ({
                ...item,
                tplsys_createdat: item.tplsys_createdat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_createdat, 'America/Buenos_Aires') : undefined,
                tplsys_updatedat: item.tplsys_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.tplsys_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getSystemTemplatesByItem (use case):', error.message);
            throw error;
        }
    }

    public async createSystemTemplate(input: SystemTemplateCreateInput, options?: { transaction?: any }) {
        try {
            if (!input.itm_uuid) {
                throw new Error("Se requiere itm_uuid para asociar la especialidad.");
            }
            if (!input.tplsys_code || input.tplsys_code.trim() === '') {
                throw new Error("Se requiere tplsys_code para identificar el blueprint.");
            }
            if (!input.tplsys_name || input.tplsys_name.trim() === '') {
                throw new Error("Se requiere tplsys_name para la plantilla.");
            }
            if (!input.tplsys_schema || typeof input.tplsys_schema !== 'object') {
                throw new Error("Se requiere un tplsys_schema válido en formato JSON.");
            }

            const existing = await this.systemTemplateRepository.findSystemTemplateByCode(input.tplsys_code.trim(), options);
            if (existing) {
                throw new Error(`El código ${input.tplsys_code} ya está registrado en otra plantilla del sistema.`);
            }

            const val = new SystemTemplateValue({
                ...input,
                tplsys_code: input.tplsys_code.trim()
            });

            const created = await this.systemTemplateRepository.createSystemTemplate(val, options);
            if (!created) {
                throw new Error("No se pudo crear la plantilla del sistema.");
            }

            return {
                ...created,
                tplsys_createdat: created.tplsys_createdat ? TimezoneConverter.toIsoStringInTimezone(created.tplsys_createdat, 'America/Buenos_Aires') : undefined,
                tplsys_updatedat: created.tplsys_updatedat ? TimezoneConverter.toIsoStringInTimezone(created.tplsys_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createSystemTemplate (use case):', error.message);
            throw error;
        }
    }

    public async updateSystemTemplate(tplsys_uuid: string, data: SystemTemplateUpdateData, options?: { transaction?: any }) {
        try {
            if (!tplsys_uuid) {
                throw new Error("Se requiere tplsys_uuid para actualizar la plantilla.");
            }

            if (data.tplsys_code) {
                const existing = await this.systemTemplateRepository.findSystemTemplateByCode(data.tplsys_code.trim(), options);
                if (existing && existing.tplsys_uuid !== tplsys_uuid) {
                    throw new Error(`El código ${data.tplsys_code} ya está registrado en otra plantilla.`);
                }
            }

            const updated = await this.systemTemplateRepository.updateSystemTemplate(tplsys_uuid, data, options);
            if (!updated) {
                throw new Error(`No se pudo actualizar la plantilla del sistema con ID ${tplsys_uuid}.`);
            }

            return {
                ...updated,
                tplsys_createdat: updated.tplsys_createdat ? TimezoneConverter.toIsoStringInTimezone(updated.tplsys_createdat, 'America/Buenos_Aires') : undefined,
                tplsys_updatedat: updated.tplsys_updatedat ? TimezoneConverter.toIsoStringInTimezone(updated.tplsys_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateSystemTemplate (use case):', error.message);
            throw error;
        }
    }

    public async deleteSystemTemplate(tplsys_uuid: string, options?: { transaction?: any }) {
        try {
            if (!tplsys_uuid) {
                throw new Error("Se requiere tplsys_uuid para eliminar la plantilla.");
            }
            const deleted = await this.systemTemplateRepository.deleteSystemTemplate(tplsys_uuid, options);
            if (!deleted) {
                throw new Error(`No se pudo eliminar la plantilla con ID ${tplsys_uuid}.`);
            }
            return {
                ...deleted,
                tplsys_createdat: deleted.tplsys_createdat ? TimezoneConverter.toIsoStringInTimezone(deleted.tplsys_createdat, 'America/Buenos_Aires') : undefined,
                tplsys_updatedat: deleted.tplsys_updatedat ? TimezoneConverter.toIsoStringInTimezone(deleted.tplsys_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteSystemTemplate (use case):', error.message);
            throw error;
        }
    }
}
