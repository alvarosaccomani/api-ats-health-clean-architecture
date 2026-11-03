import { v4 as uuid } from "uuid";
import moment from "moment";
import { EncounterEntity } from "./encounter.entity";

export class EncounterValue implements EncounterEntity {
    cmp_uuid: string;
    enc_uuid: string;
    pat_uuid: string;
    usr_uuid_practitioner: string;
    tpl_uuid?: string | null;
    bkg_uuid?: string | null;
    wrk_uuid?: string | null;
    enc_number: number;
    enc_type: string;
    enc_date: Date;
    enc_status: string;
    enc_reason?: string | null;
    enc_maindiagnosiscode?: string | null;
    enc_signedat?: Date | null;
    enc_signedby?: string | null;
    enc_createdat: Date;
    enc_updatedat: Date;

    constructor({
        cmp_uuid,
        enc_uuid,
        pat_uuid,
        usr_uuid_practitioner,
        tpl_uuid,
        bkg_uuid,
        wrk_uuid,
        enc_number,
        enc_type,
        enc_date,
        enc_status,
        enc_reason,
        enc_maindiagnosiscode,
        enc_signedat,
        enc_signedby,
        enc_createdat,
        enc_updatedat
    }: {
        cmp_uuid: string;
        enc_uuid?: string;
        pat_uuid: string;
        usr_uuid_practitioner: string;
        tpl_uuid?: string | null;
        bkg_uuid?: string | null;
        wrk_uuid?: string | null;
        enc_number?: number;
        enc_type?: string;
        enc_date?: Date | string;
        enc_status?: string;
        enc_reason?: string | null;
        enc_maindiagnosiscode?: string | null;
        enc_signedat?: Date | null;
        enc_signedby?: string | null;
        enc_createdat?: Date;
        enc_updatedat?: Date;
    }) {
        const currentDate = moment().utc().toDate();

        this.cmp_uuid = cmp_uuid;
        this.enc_uuid = enc_uuid ?? uuid();
        this.pat_uuid = pat_uuid;
        this.usr_uuid_practitioner = usr_uuid_practitioner;
        this.tpl_uuid = tpl_uuid ?? null;
        this.bkg_uuid = bkg_uuid ?? null;
        this.wrk_uuid = wrk_uuid ?? null;
        this.enc_number = enc_number ?? 1;
        this.enc_type = enc_type ?? 'CONSULTATION';
        this.enc_date = enc_date ? moment(enc_date).toDate() : currentDate;
        this.enc_status = enc_status ?? 'IN_PROGRESS';
        this.enc_reason = enc_reason ?? null;
        this.enc_maindiagnosiscode = enc_maindiagnosiscode ?? null;
        this.enc_signedat = enc_signedat ?? null;
        this.enc_signedby = enc_signedby ?? null;
        this.enc_createdat = enc_createdat ?? currentDate;
        this.enc_updatedat = enc_updatedat ?? currentDate;
    }
}
