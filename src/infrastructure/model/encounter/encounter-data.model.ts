import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { EncounterDataEntity } from '../../../domain/encounter/encounter-data.entity';
import { SequelizeEncounter } from './encounter.model';

export class SequelizeEncounterData extends Model<EncounterDataEntity> implements EncounterDataEntity {
  declare cmp_uuid: string;
  declare enc_uuid: string;
  declare encd_formdata: Record<string, any>;
  declare encd_calculatedscores: Record<string, any>;
  declare encd_version: number;
  declare encd_createdat: Date;
  declare encd_updatedat: Date;
}

SequelizeEncounterData.init({
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
  encd_formdata: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  },
  encd_calculatedscores: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  },
  encd_version: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  encd_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  encd_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'encd_createdat',
  updatedAt: 'encd_updatedat',
  tableName: 'encd_encounterdata'
});

SequelizeEncounter.hasOne(SequelizeEncounterData, {
  as: 'encounter_data',
  foreignKey: 'enc_uuid',
  sourceKey: 'enc_uuid'
});

SequelizeEncounterData.belongsTo(SequelizeEncounter, {
  as: 'encounter',
  foreignKey: 'enc_uuid',
  targetKey: 'enc_uuid'
});
