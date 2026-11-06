import { ResourceModuleEntity, ResourceModuleUpdateData } from "./resource-module.entity";

export interface ResourceModuleRepository {
    getResourceModules(options?: { transaction?: any }): Promise<ResourceModuleEntity[] | null>;
    findResourceModuleById(remo_uuid: string, options?: { transaction?: any }): Promise<ResourceModuleEntity | null>;
    createResourceModule(resourceModule: ResourceModuleEntity, options?: { transaction?: any }): Promise<ResourceModuleEntity | null>;
    updateResourceModule(remo_uuid: string, resourceModule: ResourceModuleUpdateData, options?: { transaction?: any }): Promise<ResourceModuleEntity | null>;
    deleteResourceModule(remo_uuid: string, options?: { transaction?: any }): Promise<ResourceModuleEntity | null>;
    findResourceModuleByName(remo_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<ResourceModuleEntity | null>;
}
