import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { EncounterAttachmentEntity } from '../../../domain/encounter/encounter-attachment.entity';
import { SequelizeEncounter } from './encounter.model';

export class SequelizeEncounterAttachment extends Model<EncounterAttachmentEntity> implements EncounterAttachmentEntity {
  declare cmp_uuid: string;
  declare enc_uuid: string;
  declare encatt_uuid: string;
  declare encatt_category: string;
  declare encatt_originalname: string;
  declare encatt_mimetype: string;
  declare encatt_sizebytes: number;
  declare encatt_storagekey: string;
  declare encatt_consentstatus?: string | null;
  declare encatt_signeddate?: Date | string | null;
  declare encatt_legalscope?: string | null;
  declare encatt_createdat?: Date;
  declare encatt_updatedat?: Date;
}

SequelizeEncounterAttachment.init({
  cmp_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  encatt_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  enc_uuid: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  encatt_category: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  encatt_originalname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  encatt_mimetype: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  encatt_sizebytes: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  encatt_storagekey: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  encatt_consentstatus: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  encatt_signeddate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  encatt_legalscope: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  encatt_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  encatt_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'encatt_createdat',
  updatedAt: 'encatt_updatedat',
  tableName: 'encatt_encounterattachments'
});

SequelizeEncounter.hasMany(SequelizeEncounterAttachment, {
  as: 'attachments',
  foreignKey: 'enc_uuid',
  sourceKey: 'enc_uuid'
});

SequelizeEncounterAttachment.belongsTo(SequelizeEncounter, {
  as: 'encounter',
  foreignKey: 'enc_uuid',
  targetKey: 'enc_uuid'
});
