import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { MenuEntity } from "../../../domain/menu/menu.entity";
import { SequelizePermission } from '../permission/permission.model';

export class SequelizeMenu extends Model<MenuEntity, Partial<MenuEntity>> {
  declare mnu_uuid: string;
  declare mnu_parent_uuid: string | null;
  declare mnu_cod: string | null;
  declare mnu_title: string;
  declare mnu_description: string | null;
  declare mnu_icon: string | null;
  declare mnu_route: string | null;
  declare mnu_order: number;
  declare mnu_showifcompanyactive: boolean;
  declare mnu_itemactive: boolean;
  declare mnu_active: boolean;
  declare mnu_createdat: Date;
  declare mnu_updatedat: Date;
  declare per_uuid: string | null;
  declare mnu_showondashboard: boolean;
  declare mnu_dashboardicon: string | null;
  declare mnu_dashboardtitle: string | null;
}

SequelizeMenu.init({
    mnu_uuid: { 
        type: DataTypes.STRING(40), 
        primaryKey: true,
        allowNull: false
    },
    mnu_parent_uuid: { 
        type: DataTypes.STRING(40), 
        allowNull: true 
    },
    mnu_cod: { 
        type: DataTypes.STRING(50), 
        allowNull: true 
    },
    mnu_title: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    mnu_description: { 
        type: DataTypes.TEXT,
        allowNull: true
    },
    mnu_icon: { 
        type: DataTypes.STRING(50),
        allowNull: true
    },
    mnu_route: { 
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mnu_order: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0,
        allowNull: false
    },
    mnu_showifcompanyactive: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        allowNull: false
    },
    mnu_itemactive: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
        allowNull: false
    },
    mnu_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        allowNull: false
    },
    per_uuid: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    mnu_showondashboard: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    mnu_dashboardicon: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    mnu_dashboardtitle: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    mnu_createdat: { 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    mnu_updatedat: { 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: 'mnu_createdat',
    updatedAt: 'mnu_updatedat',
    tableName: 'mnu_menus'
});

SequelizeMenu.belongsTo(SequelizePermission, {
    foreignKey: 'per_uuid',
    targetKey: 'per_uuid',
    as: 'permission'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeMenu.sync();
}
