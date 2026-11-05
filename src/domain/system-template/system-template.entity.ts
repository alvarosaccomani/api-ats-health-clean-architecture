export interface SystemTemplateEntity {
    tplsys_uuid: string;
    itm_uuid: string;
    tplsys_code: string;
    tplsys_name: string;
    tplsys_version: string;
    tplsys_description?: string | null;
    tplsys_schema: Record<string, any>;
    tplsys_isactive: boolean;
    tplsys_createdat?: Date;
    tplsys_updatedat?: Date;
}

export interface SystemTemplateCreateInput {
    tplsys_uuid?: string;
    itm_uuid: string;
    tplsys_code: string;
    tplsys_name: string;
    tplsys_version?: string;
    tplsys_description?: string | null;
    tplsys_schema: Record<string, any>;
    tplsys_isactive?: boolean;
}

export type SystemTemplateUpdateData = Partial<Omit<SystemTemplateEntity, 'tplsys_uuid' | 'tplsys_createdat' | 'tplsys_updatedat'>>;
