import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { RolPermissionEntity } from "../../../domain/rol-permission/rol-permission.entity";
import { SequelizePermission } from '../permission/permission.model';
import { SequelizeRol } from '../rol/rol.model';

export class SequelizeRolPermission extends Model<RolPermissionEntity> implements RolPermissionEntity {
  declare per_uuid: string;
  declare rol_uuid: string;
  declare rolper_createdat: Date;
  declare rolper_updatedat: Date;

  declare rol?: any;
  declare per?: any;
}

SequelizeRolPermission.init({
  rol_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  per_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  rolper_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  rolper_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'rolper_createdat',
  updatedAt: 'rolper_updatedat',
  tableName: 'rolper_rolespermissions'
});

SequelizeRolPermission.belongsTo(SequelizePermission, {
  as: 'per',
  foreignKey: 'per_uuid'
});

SequelizeRolPermission.belongsTo(SequelizeRol, {
  as: 'rol',
  foreignKey: 'rol_uuid'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeRolPermission.sync();
}
