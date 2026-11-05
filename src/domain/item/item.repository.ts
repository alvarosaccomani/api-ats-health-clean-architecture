import { ItemEntity, ItemCreateInput, ItemUpdateData } from "./item.entity";

export interface ItemRepository {
    getItems(itm_name?: string, itm_description?: string, field_order?: string, itm_orderby?: string, options?: { transaction?: any }): Promise<ItemEntity[] | null>;
    findItemById(itm_uuid: string, options?: { transaction?: any }): Promise<ItemEntity | null>;
    findItemByName(itm_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<ItemEntity | null>;
    createItem(item: ItemCreateInput, options?: { transaction?: any }): Promise<ItemEntity | null>;
    updateItem(itm_uuid: string, item: ItemUpdateData, options?: { transaction?: any }): Promise<ItemEntity | null>;
    deleteItem(itm_uuid: string, options?: { transaction?: any }): Promise<ItemEntity | null>;
}
