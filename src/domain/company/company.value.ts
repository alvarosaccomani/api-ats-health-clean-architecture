import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CompanyEntity } from "./company.entity";

export class CompanyValue implements CompanyEntity {
    cmp_uuid: string;
    cmp_name: string;
    cmp_address: string | null;
    cmp_lat: number | null;
    cmp_lng: number | null;
    cmp_phone: string | null;
    cmp_email: string | null;
    cmp_logo: string | null;
    cmp_banner: string | null;
    cmp_description: string | null;
    cmp_whatsapp: string | null;
    cmp_instagram: string | null;
    cmp_facebook: string | null;
    cmp_primarycolor: string | null;
    cmp_isfeatured: boolean | null;
    cmp_status: string | null;  // active, inactive, pending
    cmp_createdat: Date;
    cmp_updatedat: Date;
    
    constructor({
            cmp_uuid,
            cmp_name,
            cmp_address,
            cmp_lat,
            cmp_lng,
            cmp_phone,
            cmp_email,
            cmp_logo,
            cmp_banner,
            cmp_description,
            cmp_whatsapp,
            cmp_instagram,
            cmp_facebook,
            cmp_primarycolor,
            cmp_isfeatured,
            cmp_status,
            cmp_createdat,
            cmp_updatedat
        }:{ 
            cmp_uuid?: string;
            cmp_name: string;
            cmp_address?: string | null;
            cmp_lat?: number | null;
            cmp_lng?: number | null;
            cmp_phone?: string | null;
            cmp_email?: string | null;
            cmp_logo?: string | null;
            cmp_banner?: string | null;
            cmp_description?: string | null;
            cmp_whatsapp?: string | null;
            cmp_instagram?: string | null;
            cmp_facebook?: string | null;
            cmp_primarycolor?: string | null;
            cmp_isfeatured?: boolean | null;
            cmp_status?: string | null;
            cmp_createdat?: Date;
            cmp_updatedat?: Date;
        }) {
        this.cmp_uuid = cmp_uuid ?? uuid();
        this.cmp_name = cmp_name;
        this.cmp_address = cmp_address ?? null;
        this.cmp_lat = cmp_lat ?? null;
        this.cmp_lng = cmp_lng ?? null;
        this.cmp_phone = cmp_phone ?? null;
        this.cmp_email = cmp_email ?? null;
        this.cmp_logo = cmp_logo ?? null;
        this.cmp_banner = cmp_banner ?? null;
        this.cmp_description = cmp_description ?? null;
        this.cmp_whatsapp = cmp_whatsapp ?? null;
        this.cmp_instagram = cmp_instagram ?? null;
        this.cmp_facebook = cmp_facebook ?? null;
        this.cmp_primarycolor = cmp_primarycolor ?? '#1890ff';
        this.cmp_isfeatured = cmp_isfeatured ?? false;
        this.cmp_status = cmp_status ?? 'active';
        this.cmp_createdat = cmp_createdat ?? moment().toDate();
        this.cmp_updatedat = cmp_updatedat ?? moment().toDate();
    }
}
