export interface PatientEntity {
    cmp_uuid: string;
    pat_uuid: string;
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
    pat_emergencycontact?: any | null;
    pat_active: boolean;
    pat_createdat: Date;
    pat_updatedat: Date;
}

// Update
export type PatientUpdateData = Partial<Omit<PatientEntity, 'pat_uuid' | 'pat_createdat' | 'pat_updatedat'>>;
