import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { PermissionEntity } from "../../../domain/permission/permission.entity";
import { SequelizeResourceType } from '../resource-type/resource-type.model';
import { SequelizeResourceModule } from '../resource-module/resource-module.model';

export class SequelizePermission extends Model<PermissionEntity, Omit<PermissionEntity, 'id'>> implements PermissionEntity {
  declare per_uuid: string;
  declare per_slug: string;
  declare per_description: string;
  declare rety_uuid: string;
  declare remo_uuid: string;
  declare per_createdat: Date;
  declare per_updatedat: Date;
}

SequelizePermission.init({
  per_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true
  },
  per_slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  per_description: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  rety_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  remo_uuid: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  per_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  per_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'per_createdat',
  updatedAt: 'per_updatedat',
  tableName: 'per_permissions'
});

//Sequelize Permission Foreign Key
SequelizePermission.belongsTo(SequelizeResourceType, {
    foreignKey: "rety_uuid",
    targetKey: "rety_uuid",
    as: 'rety'
});

SequelizePermission.belongsTo(SequelizeResourceModule, {
    foreignKey: "remo_uuid",
    targetKey: "remo_uuid",
    as: 'remo'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizePermission.sync();
}
