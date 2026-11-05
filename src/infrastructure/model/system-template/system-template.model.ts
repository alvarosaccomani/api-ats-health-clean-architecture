import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { SystemTemplateEntity } from '../../../domain/system-template/system-template.entity';

export class SequelizeSystemTemplate extends Model<SystemTemplateEntity> implements SystemTemplateEntity {
  declare tplsys_uuid: string;
  declare itm_uuid: string;
  declare tplsys_code: string;
  declare tplsys_name: string;
  declare tplsys_version: string;
  declare tplsys_description: string | null;
  declare tplsys_schema: Record<string, any>;
  declare tplsys_isactive: boolean;
  declare tplsys_createdat: Date;
  declare tplsys_updatedat: Date;
}

SequelizeSystemTemplate.init({
  tplsys_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  itm_uuid: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  tplsys_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  tplsys_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  tplsys_version: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '1.0.0'
  },
  tplsys_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tplsys_schema: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  },
  tplsys_isactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  tplsys_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  tplsys_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'tplsys_createdat',
  updatedAt: 'tplsys_updatedat',
  tableName: 'tplsys_systemtemplates'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeSystemTemplate.sync();
}
