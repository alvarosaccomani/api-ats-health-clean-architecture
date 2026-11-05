import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CompanyItemEntity } from "./company-item.entity";

export class CompanyItemValue implements CompanyItemEntity {
    cmp_uuid: string;
    itm_uuid: string;
    cmpitm_uuid: string;
    cmpitm_createdat: Date;
    cmpitm_updatedat: Date;
    
    constructor({
            cmp_uuid,
            itm_uuid,
            cmpitm_uuid,
            cmpitm_createdat,
            cmpitm_updatedat
        }:{ 
            cmp_uuid: string;
            itm_uuid: string;
            cmpitm_uuid?: string;
            cmpitm_createdat?: Date;
            cmpitm_updatedat?: Date;
        }) {
        this.cmp_uuid = cmp_uuid;
        this.itm_uuid = itm_uuid;
        this.cmpitm_uuid = cmpitm_uuid ?? uuid();
        this.cmpitm_createdat = cmpitm_createdat ?? moment().toDate();
        this.cmpitm_updatedat = cmpitm_updatedat ?? moment().toDate();
    }
}
