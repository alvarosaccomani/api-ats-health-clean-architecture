import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ItemEntity } from "../../../domain/item/item.entity";

export class SequelizeItem extends Model<ItemEntity> implements ItemEntity {
  declare itm_uuid: string;
  declare itm_name: string;
  declare itm_description: string;
  declare itm_createdat: Date;
  declare itm_updatedat: Date;
}

SequelizeItem.init({
  itm_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true,
    allowNull: false
  },
  itm_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  itm_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  itm_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  itm_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'itm_createdat',
  updatedAt: 'itm_updatedat',
  tableName: 'itm_items'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeItem.sync();
}
