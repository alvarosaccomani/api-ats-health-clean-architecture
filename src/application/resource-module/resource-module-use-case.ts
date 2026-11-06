import { ResourceModuleRepository } from "../../domain/resource-module/resource-module.repository";
import { ResourceModuleValue } from "../../domain/resource-module/resource-module.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ResourceModuleUseCase {
    constructor(
        private readonly resourceModuleRepository: ResourceModuleRepository
    ) {
        this.getResourceModules = this.getResourceModules.bind(this);
        this.getDetailResourceModule = this.getDetailResourceModule.bind(this);
        this.createResourceModule = this.createResourceModule.bind(this);
        this.updateResourceModule = this.updateResourceModule.bind(this);
        this.deleteResourceModule = this.deleteResourceModule.bind(this);
        this.findResourceModuleByName = this.findResourceModuleByName.bind(this);
    }

    public async getResourceModules(options?: { transaction?: any }) {
        try {
            const resourceModules = await this.resourceModuleRepository.getResourceModules(options);
            if (!resourceModules) {
                throw new Error('No hay módulos de recurso.');
            }
            return resourceModules.map(resourceModule => ({
                remo_uuid: resourceModule.remo_uuid,
                remo_name: resourceModule.remo_name,
                remo_description: resourceModule.remo_description,
                remo_createdat: TimezoneConverter.toIsoStringInTimezone(resourceModule.remo_createdat, 'America/Buenos_Aires'),
                remo_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceModule.remo_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getResourceModules (use case):', error.message);
            throw error;
        }
    }

    public async getDetailResourceModule(remo_uuid: string, options?: { transaction?: any }) {
        try {
            const resourceModule = await this.resourceModuleRepository.findResourceModuleById(remo_uuid, options);
            if (!resourceModule) {
                throw new Error(`No hay módulo de recurso con el Id: ${remo_uuid}`);
            }
            return {
                remo_uuid: resourceModule.remo_uuid,
                remo_name: resourceModule.remo_name,
                remo_description: resourceModule.remo_description,
                remo_createdat: TimezoneConverter.toIsoStringInTimezone(resourceModule.remo_createdat, 'America/Buenos_Aires'),
                remo_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceModule.remo_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailResourceModule (use case):', error.message);
            throw error;
        }
    }
    
    public async createResourceModule(
        { remo_uuid, remo_name, remo_description }: 
        { remo_uuid?: string; remo_name: string; remo_description: string },
        options?: { transaction?: any }
    ) {
        try {
            const resourceModuleValue = new ResourceModuleValue({ remo_uuid, remo_name, remo_description });
            const resourceModuleCreated = await this.resourceModuleRepository.createResourceModule(resourceModuleValue, options);
            if (!resourceModuleCreated) {
                throw new Error(`No se pudo insertar el módulo de recurso.`);
            }
            return {
                remo_uuid: resourceModuleCreated.remo_uuid,
                remo_name: resourceModuleCreated.remo_name,
                remo_description: resourceModuleCreated.remo_description,
                remo_createdat: TimezoneConverter.toIsoStringInTimezone(resourceModuleCreated.remo_createdat, 'America/Buenos_Aires'),
                remo_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceModuleCreated.remo_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createResourceModule (use case):', error.message);
            throw error;
        }
    }

    public async updateResourceModule(
        remo_uuid: string, 
        { remo_name, remo_description }: 
        { remo_name?: string; remo_description?: string },
        options?: { transaction?: any }
    ) {
        try {
            const resourceModuleUpdated = await this.resourceModuleRepository.updateResourceModule(remo_uuid, { remo_name, remo_description }, options);
            if (!resourceModuleUpdated) {
                throw new Error(`No se pudo actualizar el módulo de recurso.`);
            }
            return {
                remo_uuid: resourceModuleUpdated.remo_uuid,
                remo_name: resourceModuleUpdated.remo_name,
                remo_description: resourceModuleUpdated.remo_description,
                remo_createdat: TimezoneConverter.toIsoStringInTimezone(resourceModuleUpdated.remo_createdat, 'America/Buenos_Aires'),
                remo_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceModuleUpdated.remo_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateResourceModule (use case):', error.message);
            throw error;
        }
    }

    public async deleteResourceModule(remo_uuid: string, options?: { transaction?: any }) {
        try {
            const resourceModuleDeleted = await this.resourceModuleRepository.deleteResourceModule(remo_uuid, options);
            if (!resourceModuleDeleted) {
                throw new Error(`No se pudo eliminar el módulo de recurso.`);
            }
            return {
                remo_uuid: resourceModuleDeleted.remo_uuid,
                remo_name: resourceModuleDeleted.remo_name,
                remo_description: resourceModuleDeleted.remo_description,
                remo_createdat: TimezoneConverter.toIsoStringInTimezone(resourceModuleDeleted.remo_createdat, 'America/Buenos_Aires'),
                remo_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceModuleDeleted.remo_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteResourceModule (use case):', error.message);
            throw error;
        }
    }

    public async findResourceModuleByName(remo_name: string, excludeUuid?: string | null, options?: { transaction?: any }) {
        try {
            const resourceModule = await this.resourceModuleRepository.findResourceModuleByName(remo_name, excludeUuid, options);
            return resourceModule;
        } catch (error: any) {
            console.error('Error en findResourceModuleByName (use case):', error.message);
            throw error;
        }
    }
}
