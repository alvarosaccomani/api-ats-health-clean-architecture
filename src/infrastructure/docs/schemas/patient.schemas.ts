/**
 * @openapi
 * components:
 *   schemas:
 *     PatientEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *           example: "b1f8d424-6992-4f01-831e-450a1dfa52b8"
 *         pat_uuid:
 *           type: string
 *           format: uuid
 *           example: "e290f1b2-293e-4d43-a621-e0c45167b610"
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         pat_documentnumber:
 *           type: string
 *           example: "35441223"
 *         pat_firstname:
 *           type: string
 *           example: "Lucía"
 *         pat_lastname:
 *           type: string
 *           example: "Gómez"
 *         pat_birthdate:
 *           type: string
 *           format: date
 *           example: "1990-05-14"
 *         pat_biologicalsex:
 *           type: string
 *           enum: ["FEMALE", "MALE", "OTHER"]
 *           example: "FEMALE"
 *         pat_genderidentity:
 *           type: string
 *           nullable: true
 *           example: "Mujer cis"
 *         pat_occupation:
 *           type: string
 *           nullable: true
 *           example: "Docente"
 *         pat_phone:
 *           type: string
 *           nullable: true
 *           example: "+5491122334455"
 *         pat_email:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: "lucia.gomez@example.com"
 *         pat_medicalcoverage:
 *           type: string
 *           nullable: true
 *           example: "OSDE"
 *         pat_affiliatenumber:
 *           type: string
 *           nullable: true
 *           example: "2-4521369-01"
 *         pat_emergencycontact:
 *           type: string
 *           nullable: true
 *           example: '{"name": "Carlos Gómez", "phone": "+5491199887766", "relation": "Padre"}'
 *         pat_active:
 *           type: boolean
 *           example: true
 *         pat_createdat:
 *           type: string
 *           format: date-time
 *           example: "2026-10-25T15:30:00-03:00"
 *         pat_updatedat:
 *           type: string
 *           format: date-time
 *           example: "2026-10-25T15:30:00-03:00"
 *
 *     PatientInputDTO:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pat_documentnumber
 *         - pat_firstname
 *         - pat_lastname
 *         - pat_birthdate
 *         - pat_biologicalsex
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *           example: "b1f8d424-6992-4f01-831e-450a1dfa52b8"
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         pat_documentnumber:
 *           type: string
 *           example: "35441223"
 *         pat_firstname:
 *           type: string
 *           example: "Lucía"
 *         pat_lastname:
 *           type: string
 *           example: "Gómez"
 *         pat_birthdate:
 *           type: string
 *           format: date
 *           example: "1990-05-14"
 *         pat_biologicalsex:
 *           type: string
 *           enum: ["FEMALE", "MALE", "OTHER"]
 *           example: "FEMALE"
 *         pat_genderidentity:
 *           type: string
 *           nullable: true
 *           example: "Mujer cis"
 *         pat_occupation:
 *           type: string
 *           nullable: true
 *           example: "Docente"
 *         pat_phone:
 *           type: string
 *           nullable: true
 *           example: "+5491122334455"
 *         pat_email:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: "lucia.gomez@example.com"
 *         pat_medicalcoverage:
 *           type: string
 *           nullable: true
 *           example: "OSDE"
 *         pat_affiliatenumber:
 *           type: string
 *           nullable: true
 *           example: "2-4521369-01"
 *         pat_emergencycontact:
 *           type: string
 *           nullable: true
 *           example: '{"name": "Carlos Gómez", "phone": "+5491199887766", "relation": "Padre"}'
 *         pat_active:
 *           type: boolean
 *           example: true
 *
 *     PatientUpdateDTO:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *           example: "b1f8d424-6992-4f01-831e-450a1dfa52b8"
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         pat_documentnumber:
 *           type: string
 *           example: "35441223"
 *         pat_firstname:
 *           type: string
 *           example: "Lucía"
 *         pat_lastname:
 *           type: string
 *           example: "Gómez"
 *         pat_birthdate:
 *           type: string
 *           format: date
 *           example: "1990-05-14"
 *         pat_biologicalsex:
 *           type: string
 *           enum: ["FEMALE", "MALE", "OTHER"]
 *           example: "FEMALE"
 *         pat_genderidentity:
 *           type: string
 *           nullable: true
 *           example: "Mujer cis"
 *         pat_occupation:
 *           type: string
 *           nullable: true
 *           example: "Docente"
 *         pat_phone:
 *           type: string
 *           nullable: true
 *           example: "+5491122334455"
 *         pat_email:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: "lucia.gomez@example.com"
 *         pat_medicalcoverage:
 *           type: string
 *           nullable: true
 *           example: "OSDE"
 *         pat_affiliatenumber:
 *           type: string
 *           nullable: true
 *           example: "2-4521369-01"
 *         pat_emergencycontact:
 *           type: string
 *           nullable: true
 *           example: '{"name": "Carlos Gómez", "phone": "+5491199887766", "relation": "Padre"}'
 *         pat_active:
 *           type: boolean
 *           example: true
 */
