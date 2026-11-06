export interface ResourceModuleEntity {
    remo_uuid: string;
    remo_name: string;
    remo_description: string;
    remo_createdat: Date;
    remo_updatedat: Date;
}

export type ResourceModuleUpdateData = Partial<Pick<ResourceModuleEntity, 'remo_name' | 'remo_description'>>;
