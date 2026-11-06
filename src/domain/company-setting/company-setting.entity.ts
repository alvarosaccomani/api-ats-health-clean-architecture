export interface CompanySettingEntity {
    cmp_uuid: string;
    cmps_uuid: string;
    cmps_key: string;
    cmps_parameter: string;
    cmps_description?: string | null;
    cmps_value: string;
    cmps_datatype?: string | null;
    dtp_uuid?: string | null;
    cmps_options?: string | null;
    cmps_group?: string | null;
    cmps_createdat: Date;
    cmps_updatedat: Date;
}

export type CompanySettingUpdateData = Partial<Pick<CompanySettingEntity, 'cmps_key' | 'cmps_parameter' | 'cmps_description' | 'cmps_value' | 'cmps_datatype' | 'dtp_uuid' | 'cmps_options' | 'cmps_group'>>;
