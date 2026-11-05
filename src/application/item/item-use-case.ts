import { ItemCreateInput, ItemUpdateData } from "../../domain/item/item.entity";
import { ItemRepository } from "../../domain/item/item.repository";
import { ItemValue } from "../../domain/item/item.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepository
    ) {
        this.getItems = this.getItems.bind(this);
        this.getDetailItem = this.getDetailItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.findItemByName = this.findItemByName.bind(this);
    }

    public async getItems(itm_name?: string, itm_description?: string, field_order?: string, itm_orderby?: string, options?: { transaction?: any }) {
        try {
            const items = await this.itemRepository.getItems(itm_name, itm_description, field_order, itm_orderby, options);
            if (!items) {
                return [];
            }
            return items.map(item => ({
                itm_uuid: item.itm_uuid,
                itm_name: item.itm_name,
                itm_description: item.itm_description,
                itm_createdat: item.itm_createdat ? TimezoneConverter.toIsoStringInTimezone(item.itm_createdat, 'America/Buenos_Aires') : undefined,
                itm_updatedat: item.itm_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.itm_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getItems (use case):', error.message);
            throw error;
        }
    }

    public async getDetailItem(itm_uuid: string, options?: { transaction?: any }) {
        try {
            if (!itm_uuid) {
                throw new Error("Se requiere itm_uuid.");
            }
            const item = await this.itemRepository.findItemById(itm_uuid, options);
            if (!item) {
                throw new Error(`No hay ítem con el ID: ${itm_uuid}`);
            }
            return {
                itm_uuid: item.itm_uuid,
                itm_name: item.itm_name,
                itm_description: item.itm_description,
                itm_createdat: item.itm_createdat ? TimezoneConverter.toIsoStringInTimezone(item.itm_createdat, 'America/Buenos_Aires') : undefined,
                itm_updatedat: item.itm_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.itm_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en getDetailItem (use case):', error.message);
            throw error;
        }
    }
    
    public async createItem(input: ItemCreateInput, options?: { transaction?: any }) {
        try {
            if (!input.itm_name || input.itm_name.trim() === '') {
                throw new Error('Debe proporcionar un Nombre para el ítem.');
            }
            if (!input.itm_description || input.itm_description.trim() === '') {
                throw new Error('Debe proporcionar una Descripción para el ítem.');
            }

            const existing = await this.itemRepository.findItemByName(input.itm_name.trim(), null, options);
            if (existing) {
                throw new Error(`Ya existe un ítem con el nombre ${input.itm_name}.`);
            }

            const itemValue = new ItemValue({
                itm_uuid: input.itm_uuid,
                itm_name: input.itm_name.trim(),
                itm_description: input.itm_description.trim()
            });

            const itemCreated = await this.itemRepository.createItem(itemValue, options);
            if (!itemCreated) {
                throw new Error('No se pudo insertar el ítem.');
            }

            return {
                itm_uuid: itemCreated.itm_uuid,
                itm_name: itemCreated.itm_name,
                itm_description: itemCreated.itm_description,
                itm_createdat: itemCreated.itm_createdat ? TimezoneConverter.toIsoStringInTimezone(itemCreated.itm_createdat, 'America/Buenos_Aires') : undefined,
                itm_updatedat: itemCreated.itm_updatedat ? TimezoneConverter.toIsoStringInTimezone(itemCreated.itm_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createItem (use case):', error.message);
            throw error;
        }
    }

    public async updateItem(itm_uuid: string, update: ItemUpdateData, options?: { transaction?: any }) {
        try {
            if (!itm_uuid) {
                throw new Error("Se requiere itm_uuid para actualizar.");
            }

            if (update.itm_name && update.itm_name.trim() !== '') {
                const existing = await this.itemRepository.findItemByName(update.itm_name.trim(), itm_uuid, options);
                if (existing) {
                    throw new Error(`Ya existe un ítem con el nombre ${update.itm_name}.`);
                }
            }

            const itemUpdated = await this.itemRepository.updateItem(itm_uuid, update, options);
            if (!itemUpdated) {
                throw new Error(`No se pudo actualizar el ítem con ID ${itm_uuid}.`);
            }

            return {
                itm_uuid: itemUpdated.itm_uuid,
                itm_name: itemUpdated.itm_name,
                itm_description: itemUpdated.itm_description,
                itm_createdat: itemUpdated.itm_createdat ? TimezoneConverter.toIsoStringInTimezone(itemUpdated.itm_createdat, 'America/Buenos_Aires') : undefined,
                itm_updatedat: itemUpdated.itm_updatedat ? TimezoneConverter.toIsoStringInTimezone(itemUpdated.itm_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateItem (use case):', error.message);
            throw error;
        }
    }

    public async deleteItem(itm_uuid: string, options?: { transaction?: any }) {
        try {
            if (!itm_uuid) {
                throw new Error("Se requiere itm_uuid para eliminar.");
            }
            const itemDeleted = await this.itemRepository.deleteItem(itm_uuid, options);
            if (!itemDeleted) {
                throw new Error(`No se pudo eliminar el ítem con ID ${itm_uuid}.`);
            }
            return {
                itm_uuid: itemDeleted.itm_uuid,
                itm_name: itemDeleted.itm_name,
                itm_description: itemDeleted.itm_description,
                itm_createdat: itemDeleted.itm_createdat ? TimezoneConverter.toIsoStringInTimezone(itemDeleted.itm_createdat, 'America/Buenos_Aires') : undefined,
                itm_updatedat: itemDeleted.itm_updatedat ? TimezoneConverter.toIsoStringInTimezone(itemDeleted.itm_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteItem (use case):', error.message);
            throw error;
        }
    }

    public async findItemByName(itm_name: string, excludeUuid?: string | null, options?: { transaction?: any }) {
        try {
            return await this.itemRepository.findItemByName(itm_name, excludeUuid, options);
        } catch (error: any) {
            console.error('Error en findItemByName (use case):', error.message);
            throw error;
        }
    }
}
