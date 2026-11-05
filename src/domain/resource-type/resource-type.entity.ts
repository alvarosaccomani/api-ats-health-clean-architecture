export interface ResourceTypeEntity {
    rety_uuid: string;
    rety_name: string;
    rety_description?: string | null;
    rety_createdat?: Date;
    rety_updatedat?: Date;
}

export interface ResourceTypeCreateInput {
    rety_uuid?: string;
    rety_name: string;
    rety_description?: string | null;
}

export type ResourceTypeUpdateData = Partial<Pick<ResourceTypeEntity, 'rety_name' | 'rety_description'>>;
