import { v4 as uuid } from "uuid";
import moment from "moment";
import { ItemEntity, ItemCreateInput } from "./item.entity";

export class ItemValue implements ItemEntity {
    itm_uuid: string;
    itm_name: string;
    itm_description: string;
    itm_createdat: Date;
    itm_updatedat: Date;
    
    constructor({
        itm_uuid,
        itm_name,
        itm_description
    }: ItemCreateInput) {
        this.itm_uuid = itm_uuid ?? uuid();
        this.itm_name = itm_name;
        this.itm_description = itm_description;
        this.itm_createdat = moment().toDate();
        this.itm_updatedat = moment().toDate();
    }
}
