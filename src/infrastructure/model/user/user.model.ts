import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { UserEntity } from "../../../domain/user/user.entity";

export class SequelizeUser extends Model<UserEntity> implements UserEntity {
  declare usr_uuid: string;
  declare usr_name: string;
  declare usr_surname: string;
  declare usr_password: string;
  declare usr_image: string | null;
  declare usr_email: string;
  declare usr_nick: string;
  declare usr_bio: string | null;
  declare usr_socket: string | null;
  declare usr_online: boolean;
  declare usr_createdat: Date;
  declare usr_updatedat: Date;
}

SequelizeUser.init({
  usr_uuid: {
    type: DataTypes.STRING(40), 
    primaryKey: true
  }, 
  usr_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  usr_surname: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  usr_password: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  usr_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  usr_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  usr_nick: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  usr_bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  usr_socket: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  usr_online: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  usr_createdat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  usr_updatedat: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'usr_createdat',
  updatedAt: 'usr_updatedat',
  tableName: 'usr_users'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeUser.sync();
}
