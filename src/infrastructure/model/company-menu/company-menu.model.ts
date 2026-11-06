import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanyMenuEntity } from '../../../domain/company-menu/company-menu.entity';
import { SequelizeMenu } from '../menu/menu.model';
import { SequelizeCompany } from '../company/company.model';

export class SequelizeCompanyMenu extends Model<CompanyMenuEntity, Partial<CompanyMenuEntity>> {
  declare cmp_uuid: string;
  declare mnu_uuid: string;
  declare cmpmnu_uuid: string;
  declare cmpmnu_title: string | null;
  declare cmpmnu_description: string | null;
  declare cmpmnu_icon: string | null;
  declare cmpmnu_order: number | null;
  declare cmpmnu_showondashboard: boolean | null;
  declare cmpmnu_dashboardtitle: string | null;
  declare cmpmnu_dashboardicon: string | null;
  declare cmpmnu_active: boolean | null;
  declare cmpmnu_createdat: Date;
  declare cmpmnu_updatedat: Date;
}

SequelizeCompanyMenu.init({
  cmp_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  mnu_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  cmpmnu_uuid: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  cmpmnu_title: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  cmpmnu_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cmpmnu_icon: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  cmpmnu_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cmpmnu_showondashboard: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  cmpmnu_dashboardtitle: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  cmpmnu_dashboardicon: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  cmpmnu_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true
  },
  cmpmnu_createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  cmpmnu_updatedat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cmpmnu_createdat',
  updatedAt: 'cmpmnu_updatedat',
  tableName: 'cmpmnu_companiesmenus'
});

// Associations
SequelizeCompanyMenu.belongsTo(SequelizeMenu, {
  foreignKey: 'mnu_uuid',
  as: 'menu'
});

SequelizeMenu.hasMany(SequelizeCompanyMenu, {
  foreignKey: 'mnu_uuid',
  as: 'companyOverrides'
});

SequelizeCompanyMenu.belongsTo(SequelizeCompany, {
  foreignKey: 'cmp_uuid',
  as: 'company'
});

if (process.env.NODE_ENV !== "production") {
  SequelizeCompanyMenu.sync();
}
