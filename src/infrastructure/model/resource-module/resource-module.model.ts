import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ResourceModuleEntity } from "../../../domain/resource-module/resource-module.entity";

export class SequelizeResourceModule extends Model<ResourceModuleEntity, Omit<ResourceModuleEntity, 'id'>> implements ResourceModuleEntity {
  declare remo_uuid: string;
  declare remo_name: string;
  declare remo_description: string;
  declare remo_createdat: Date;
  declare remo_updatedat: Date;
}

SequelizeResourceModule.init({
  remo_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true
  },
  remo_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  remo_description: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  remo_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  remo_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'remo_createdat',
  updatedAt: 'remo_updatedat',
  tableName: 'remo_resourcesmodules'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeResourceModule.sync();
}
