import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { PatientEntity } from "../../../domain/patient/patient.entity";

export class SequelizePatient extends Model<PatientEntity, Partial<PatientEntity>> implements PatientEntity {
  declare cmp_uuid: string;
  declare pat_uuid: string;
  declare usr_uuid: string | null;
  declare pat_documentnumber: string;
  declare pat_firstname: string;
  declare pat_lastname: string;
  declare pat_birthdate: string;
  declare pat_biologicalsex: string;
  declare pat_genderidentity: string | null;
  declare pat_occupation: string | null;
  declare pat_phone: string | null;
  declare pat_email: string | null;
  declare pat_medicalcoverage: string | null;
  declare pat_affiliatenumber: string | null;
  declare pat_emergencycontact: any | null;
  declare pat_active: boolean;
  declare pat_createdat: Date;
  declare pat_updatedat: Date;
}

SequelizePatient.init({
  cmp_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  pat_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  usr_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  pat_documentnumber: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  pat_firstname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  pat_lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  pat_birthdate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pat_biologicalsex: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  pat_genderidentity: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  pat_occupation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pat_phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  pat_email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  pat_medicalcoverage: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  pat_affiliatenumber: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  pat_emergencycontact: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  pat_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  pat_createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  pat_updatedat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'pat_createdat',
  updatedAt: 'pat_updatedat',
  tableName: 'pat_patients'
});

if (process.env.NODE_ENV !== "production") {
    SequelizePatient.sync();
}
