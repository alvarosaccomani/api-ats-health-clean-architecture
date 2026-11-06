import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanyEntity } from "../../../domain/company/company.entity";
import { SequelizeCompanySetting } from '../company-setting/company-setting.model';

export class SequelizeCompany extends Model<CompanyEntity, Partial<CompanyEntity>> {
  declare cmp_uuid: string;
  declare cmp_name: string;
  declare cmp_address: string | null;
  declare cmp_lat: number | null;
  declare cmp_lng: number | null;
  declare cmp_phone: string | null;
  declare cmp_email: string | null;
  declare cmp_logo: string | null;
  declare cmp_banner: string | null;
  declare cmp_description: string | null;
  declare cmp_whatsapp: string | null;
  declare cmp_instagram: string | null;
  declare cmp_facebook: string | null;
  declare cmp_primarycolor: string | null;
  declare cmp_isfeatured: boolean | null;
  declare cmp_status: string | null;  // active, inactive, pending
  declare cmp_createdat: Date;
  declare cmp_updatedat: Date;
}

SequelizeCompany.init({
  cmp_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true,
    allowNull: false
  },
  cmp_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  cmp_address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cmp_lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cmp_lng: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cmp_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  cmp_email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  cmp_logo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cmp_banner: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cmp_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cmp_whatsapp: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  cmp_instagram: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  cmp_facebook: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  cmp_primarycolor: {
    type: DataTypes.STRING(10),
    defaultValue: '#1890ff',
    allowNull: true
  },
  cmp_isfeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  },
  cmp_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    allowNull: true
  },
  cmp_createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  cmp_updatedat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cmp_createdat', 
  updatedAt: 'cmp_updatedat',
  tableName: 'cmp_companies'
});

SequelizeCompany.hasMany(SequelizeCompanySetting, {
    foreignKey: 'cmp_uuid',
    sourceKey: 'cmp_uuid',
    as: 'companySettings'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCompany.sync();
}
