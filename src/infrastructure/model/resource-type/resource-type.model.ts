import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ResourceTypeEntity } from "../../../domain/resource-type/resource-type.entity";

export class SequelizeResourceType extends Model<ResourceTypeEntity> implements ResourceTypeEntity {
  declare rety_uuid: string;
  declare rety_name: string;
  declare rety_description: string | null;
  declare rety_createdat: Date;
  declare rety_updatedat: Date;
}

SequelizeResourceType.init({
  rety_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  rety_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  rety_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rety_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  rety_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'rety_createdat',
  updatedAt: 'rety_updatedat',
  tableName: 'rety_resourcestypes'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeResourceType.sync();
}
