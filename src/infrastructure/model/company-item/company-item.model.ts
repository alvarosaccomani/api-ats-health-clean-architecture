import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanyItemEntity } from "../../../domain/company-item/company-item.entity";
import { SequelizeItem } from '../item/item.model';

export class SequelizeCompanyItem extends Model<CompanyItemEntity, Partial<CompanyItemEntity>> {
  declare cmp_uuid: string;
  declare itm_uuid: string;
  declare cmpitm_uuid: string;
  declare cmpitm_createdat: Date;
  declare cmpitm_updatedat: Date;
}

SequelizeCompanyItem.init({
  cmp_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true,
    allowNull: false
  },
  itm_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  cmpitm_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  cmpitm_createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  cmpitm_updatedat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cmpitm_createdat',
  updatedAt: 'cmpitm_updatedat',
  tableName: 'cmpitm_companyitems'
});

SequelizeCompanyItem.belongsTo(SequelizeItem, {
  as: 'itm',
  foreignKey: 'itm_uuid'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCompanyItem.sync();
}
