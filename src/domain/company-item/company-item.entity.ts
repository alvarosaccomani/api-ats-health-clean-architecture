import { ItemEntity } from "../item/item.entity";

export interface CompanyItemEntity {
    cmp_uuid: string;
    itm_uuid: string;
    itm?: ItemEntity;
    cmpitm_uuid: string;
    cmpitm_createdat: Date;
    cmpitm_updatedat: Date;
}
