import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { EncounterEntity } from '../../../domain/encounter/encounter.entity';
import { SequelizeCompany } from '../company/company.model';
import { SequelizePatient } from '../patient/patient.model';
import { SequelizeUser } from '../user/user.model';

export class SequelizeEncounter extends Model<EncounterEntity> implements EncounterEntity {
  declare cmp_uuid: string;
  declare enc_uuid: string;
  declare pat_uuid: string;
  declare usr_uuid_practitioner: string;
  declare tpl_uuid: string | null;
  declare bkg_uuid: string | null;
  declare wrk_uuid: string | null;
  declare enc_number: number;
  declare enc_type: string;
  declare enc_date: Date;
  declare enc_status: string;
  declare enc_reason: string | null;
  declare enc_maindiagnosiscode: string | null;
  declare enc_signedat: Date | null;
  declare enc_signedby: string | null;
  declare enc_createdat: Date;
  declare enc_updatedat: Date;

  declare encounter_data?: any;
  declare treatments?: any[];
  declare attachments?: any[];
}

SequelizeEncounter.init({
  cmp_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  enc_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  pat_uuid: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  usr_uuid_practitioner: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  tpl_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  bkg_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  wrk_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  enc_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  enc_type: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: 'CONSULTATION'
  },
  enc_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  enc_status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'IN_PROGRESS'
  },
  enc_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enc_maindiagnosiscode: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  enc_signedat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  enc_signedby: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  enc_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  enc_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'enc_createdat',
  updatedAt: 'enc_updatedat',
  tableName: 'enc_encounters'
});

SequelizeEncounter.belongsTo(SequelizeCompany, {
  as: 'company',
  foreignKey: 'cmp_uuid'
});

SequelizeEncounter.belongsTo(SequelizePatient, {
  as: 'patient',
  foreignKey: 'pat_uuid'
});

SequelizeEncounter.belongsTo(SequelizeUser, {
  as: 'practitioner',
  foreignKey: 'usr_uuid_practitioner'
});
