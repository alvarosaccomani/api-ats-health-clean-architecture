import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { UserRolCompanyEntity } from "../../../domain/user-rol-company/user-rol-company.entity";
import { SequelizeCompany } from '../company/company.model';
import { SequelizeUser } from '../user/user.model';
import { SequelizeRol } from '../rol/rol.model';
import { SequelizeRolPermission } from '../rol-permission/rol-permission.model';

export class SequelizeUserRolCompany extends Model<UserRolCompanyEntity, Omit<UserRolCompanyEntity, 'id'>> implements UserRolCompanyEntity {
  declare cmp_uuid: string;
  declare usr_uuid: string;
  declare rol_uuid: string;
  declare usrrolcmp_createdat: Date;
  declare usrrolcmp_updatedat: Date;
}

SequelizeUserRolCompany.init({
  cmp_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true
  },
  usr_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true
  },
  rol_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    allowNull: false
  },
  usrrolcmp_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  usrrolcmp_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'usrrolcmp_createdat',
  updatedAt: 'usrrolcmp_updatedat',
  tableName: 'usrrolcmp_usersrolescompanies'
});

SequelizeUserRolCompany.belongsTo(SequelizeCompany, {
  as: 'cmp',
  foreignKey: 'cmp_uuid'
});
SequelizeUserRolCompany.belongsTo(SequelizeUser, {
  as: 'usr',
  foreignKey: 'usr_uuid'
});
SequelizeUserRolCompany.belongsTo(SequelizeRol, {
  as: 'rol',
  foreignKey: 'rol_uuid'
});

//Sequelize Rol Permission Foreign Key
SequelizeUserRolCompany.hasMany(SequelizeRolPermission, {
  foreignKey: 'rol_uuid',
  sourceKey: 'rol_uuid',
  as: 'rolpers'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeUserRolCompany.sync();
}
