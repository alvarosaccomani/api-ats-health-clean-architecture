import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanySettingEntity } from "../../../domain/company-setting/company-setting.entity";

export class SequelizeCompanySetting extends Model<CompanySettingEntity, Partial<CompanySettingEntity>> {
  declare cmp_uuid: string;
  declare cmps_uuid: string;
  declare cmps_key: string;
  declare cmps_parameter: string;
  declare cmps_description: string | null;
  declare cmps_value: string;
  declare cmps_datatype: string | null;
  declare dtp_uuid: string | null;
  declare cmps_options: string | null;
  declare cmps_group: string | null;
  declare cmps_createdat: Date;
  declare cmps_updatedat: Date;
}

SequelizeCompanySetting.init({
  cmp_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true,
    allowNull: false
  },
  cmps_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true,
    allowNull: false
  },
  cmps_key: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cmps_parameter: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cmps_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cmps_value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cmps_datatype: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  dtp_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  cmps_options: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cmps_group: {
    type: DataTypes.STRING(50),
    defaultValue: 'General',
    allowNull: true
  },
  cmps_createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  cmps_updatedat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cmps_createdat', 
  updatedAt: 'cmps_updatedat',
  tableName: 'cmps_companiessettings'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCompanySetting.sync();
}
