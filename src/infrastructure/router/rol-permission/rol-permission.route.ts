import { Express } from "express";
import { SequelizeRolPermissionRepository } from "../../repository/rol-permission/sequelize-rol-permission.repository";
import { RolPermissionUseCase } from "../../../application/rol-permission/rol-permission-use-case";
import { RolPermissionController } from "../../controller/rol-permission/rol-permission.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureRolPermissionRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeRolPermissionRepository = new SequelizeRolPermissionRepository();
    const rolPermissionUseCase = new RolPermissionUseCase(sequelizeRolPermissionRepository);
    const rolPermissionCtrl = new RolPermissionController(rolPermissionUseCase, socketAdapter);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @route GET /api/roles-permissions
     * @description Obtiene todas las asignaciones de rol y permiso
     */
    app.get(`/${basePrefix}/roles-permissions`, authMiddleware, rolPermissionCtrl.getAllCtrl);

    /**
     * @route GET /api/roles-permissions/rol/:rol_uuid
     * @description Obtiene los permisos asignados a un rol
     */
    app.get(`/${basePrefix}/roles-permissions/rol/:rol_uuid`, authMiddleware, rolPermissionCtrl.getByRolCtrl);

    /**
     * @route GET /api/roles-permissions/permission/:per_uuid
     * @description Obtiene los roles que poseen un permiso
     */
    app.get(`/${basePrefix}/roles-permissions/permission/:per_uuid`, authMiddleware, rolPermissionCtrl.getByPermissionCtrl);

    /**
     * @route POST /api/rol-permission
     * @description Asigna un permiso a un rol
     */
    app.post(`/${basePrefix}/rol-permission`, authMiddleware, rolPermissionCtrl.assignCtrl);

    /**
     * @route DELETE /api/rol-permission/:rol_uuid/:per_uuid
     * @description Desvincula un permiso de un rol
     */
    app.delete(`/${basePrefix}/rol-permission/:rol_uuid/:per_uuid`, authMiddleware, rolPermissionCtrl.removeCtrl);

    /**
     * @route PUT /api/roles-permissions/sync/:rol_uuid
     * @description Sincroniza en bloque los permisos asignados a un rol
     */
    app.put(`/${basePrefix}/roles-permissions/sync/:rol_uuid`, authMiddleware, rolPermissionCtrl.syncCtrl);
}

export default configureRolPermissionRoutes;
