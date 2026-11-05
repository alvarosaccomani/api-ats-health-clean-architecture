import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { TemplateEntity } from '../../../domain/template/template.entity';
import { SequelizeCompany } from '../company/company.model';
import { SequelizeSystemTemplate } from '../system-template/system-template.model';

export class SequelizeTemplate extends Model<TemplateEntity> implements TemplateEntity {
  declare cmp_uuid: string;
  declare tpl_uuid: string;
  declare itm_uuid: string;
  declare cmpitm_uuid: string;
  declare tplsys_uuid: string | null;
  declare tpl_code: string;
  declare tpl_name: string;
  declare tpl_version: string;
  declare tpl_schema: Record<string, any>;
  declare tpl_isactive: boolean;
  declare tpl_createdat: Date;
  declare tpl_updatedat: Date;

  declare system_template?: any;
}

SequelizeTemplate.init({
  cmp_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  tpl_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  itm_uuid: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  cmpitm_uuid: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  tplsys_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  tpl_code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  tpl_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  tpl_version: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '1.0.0'
  },
  tpl_schema: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  },
  tpl_isactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  tpl_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  tpl_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'tpl_createdat',
  updatedAt: 'tpl_updatedat',
  tableName: 'tpl_templates'
});

SequelizeTemplate.belongsTo(SequelizeCompany, {
  as: 'company',
  foreignKey: 'cmp_uuid'
});

SequelizeTemplate.belongsTo(SequelizeSystemTemplate, {
  as: 'system_template',
  foreignKey: 'tplsys_uuid'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeTemplate.sync();
}
