export interface ItemEntity {
    itm_uuid: string;
    itm_name: string;
    itm_description: string;
    itm_createdat?: Date;
    itm_updatedat?: Date;
}

export interface ItemCreateInput {
    itm_uuid?: string;
    itm_name: string;
    itm_description: string;
}

export type ItemUpdateData = Partial<Pick<ItemEntity, 'itm_name' | 'itm_description'>>;
