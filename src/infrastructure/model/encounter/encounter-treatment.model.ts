import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { EncounterTreatmentEntity } from '../../../domain/encounter/encounter-treatment.entity';
import { SequelizeEncounter } from './encounter.model';

export class SequelizeEncounterTreatment extends Model<EncounterTreatmentEntity> implements EncounterTreatmentEntity {
  declare cmp_uuid: string;
  declare enc_uuid: string;
  declare enctr_uuid: string;
  declare enctr_kind: string;
  declare enctr_code: string | null;
  declare enctr_name: string;
  declare enctr_category: string | null;
  declare enctr_targetzone: string | null;
  declare enctr_dosageparameters: string;
  declare enctr_frequency: string | null;
  declare enctr_homeprescription: string | null;
  declare enctr_isactive: boolean;
  declare enctr_createdat: Date;
  declare enctr_updatedat: Date;
}

SequelizeEncounterTreatment.init({
  cmp_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  enctr_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  enc_uuid: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  enctr_kind: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: 'STANDARD_MODALITY'
  },
  enctr_code: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  enctr_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  enctr_category: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  enctr_targetzone: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  enctr_dosageparameters: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  enctr_frequency: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  enctr_homeprescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enctr_isactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  enctr_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  enctr_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'enctr_createdat',
  updatedAt: 'enctr_updatedat',
  tableName: 'enctr_encountertreatments'
});

SequelizeEncounter.hasMany(SequelizeEncounterTreatment, {
  as: 'treatments',
  foreignKey: 'enc_uuid',
  sourceKey: 'enc_uuid'
});

SequelizeEncounterTreatment.belongsTo(SequelizeEncounter, {
  as: 'encounter',
  foreignKey: 'enc_uuid',
  targetKey: 'enc_uuid'
});
