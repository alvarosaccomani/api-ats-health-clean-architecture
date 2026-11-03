export interface EncounterDataEntity {
    cmp_uuid: string;
    enc_uuid: string;
    encd_formdata: Record<string, any>;
    encd_calculatedscores: Record<string, any>;
    encd_version?: number;
    encd_createdat?: Date;
    encd_updatedat?: Date;
}
