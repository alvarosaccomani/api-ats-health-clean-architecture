import { CompanySettingEntity } from "../company-setting/company-setting.entity";

export interface CompanyEntity {
    cmp_uuid: string;
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
    cmp_status?: string | null;  // active, inactive, pending
    cmp_createdat: Date;
    cmp_updatedat: Date;
    companySettings?: CompanySettingEntity[];
}

export type CompanyUpdateData = Partial<Pick<CompanyEntity, 'cmp_name' | 'cmp_address' | 'cmp_lat' | 'cmp_lng' | 'cmp_phone' | 'cmp_email' | 'cmp_logo' | 'cmp_banner' | 'cmp_description' | 'cmp_whatsapp' | 'cmp_instagram' | 'cmp_facebook' | 'cmp_primarycolor' | 'cmp_isfeatured' | 'cmp_status'>>;
