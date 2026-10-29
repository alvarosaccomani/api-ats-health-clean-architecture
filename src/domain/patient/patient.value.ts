import { v4 as uuid } from "uuid";
import moment from "moment";
import { PatientEntity } from "./patient.entity";

export class PatientValue implements PatientEntity {
    cmp_uuid: string;
    pat_uuid: string;
    usr_uuid: string | null;
    pat_documentnumber: string;
    pat_firstname: string;
    pat_lastname: string;
    pat_birthdate: string;
    pat_biologicalsex: string;
    pat_genderidentity: string | null;
    pat_occupation: string | null;
    pat_phone: string | null;
    pat_email: string | null;
    pat_medicalcoverage: string | null;
    pat_affiliatenumber: string | null;
    pat_emergencycontact: string | null;
    pat_active: boolean;
    pat_createdat: Date;
    pat_updatedat: Date;

    constructor({
        cmp_uuid,
        pat_uuid,
        usr_uuid,
        pat_documentnumber,
        pat_firstname,
        pat_lastname,
        pat_birthdate,
        pat_biologicalsex,
        pat_genderidentity,
        pat_occupation,
        pat_phone,
        pat_email,
        pat_medicalcoverage,
        pat_affiliatenumber,
        pat_emergencycontact,
        pat_active,
        pat_createdat,
        pat_updatedat
    }: {
        cmp_uuid: string;
        pat_uuid?: string;
        usr_uuid?: string | null;
        pat_documentnumber: string;
        pat_firstname: string;
        pat_lastname: string;
        pat_birthdate: string;
        pat_biologicalsex: string;
        pat_genderidentity?: string | null;
        pat_occupation?: string | null;
        pat_phone?: string | null;
        pat_email?: string | null;
        pat_medicalcoverage?: string | null;
        pat_affiliatenumber?: string | null;
        pat_emergencycontact?: string | null;
        pat_active?: boolean;
        pat_createdat?: Date;
        pat_updatedat?: Date;
    }) {
        this.cmp_uuid = cmp_uuid;
        this.pat_uuid = pat_uuid || uuid();
        this.usr_uuid = usr_uuid ?? null;
        this.pat_documentnumber = pat_documentnumber;
        this.pat_firstname = pat_firstname;
        this.pat_lastname = pat_lastname;
        this.pat_birthdate = pat_birthdate;
        this.pat_biologicalsex = pat_biologicalsex;
        this.pat_genderidentity = pat_genderidentity ?? null;
        this.pat_occupation = pat_occupation ?? null;
        this.pat_phone = pat_phone ?? null;
        this.pat_email = pat_email ?? null;
        this.pat_medicalcoverage = pat_medicalcoverage ?? null;
        this.pat_affiliatenumber = pat_affiliatenumber ?? null;
        this.pat_emergencycontact = pat_emergencycontact ?? null;
        this.pat_active = pat_active !== undefined ? pat_active : true;
        this.pat_createdat = pat_createdat ?? moment().toDate();
        this.pat_updatedat = pat_updatedat ?? moment().toDate();
    }
}
