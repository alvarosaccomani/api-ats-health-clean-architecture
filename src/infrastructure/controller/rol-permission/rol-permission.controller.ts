import { Request, Response } from "express";
import { RolPermissionUseCase } from "../../../application/rol-permission/rol-permission-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class RolPermissionController {
    constructor(private rolPermissionUseCase: RolPermissionUseCase, private socketAdapter?: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getByRolCtrl = this.getByRolCtrl.bind(this);
        this.getByPermissionCtrl = this.getByPermissionCtrl.bind(this);
        this.assignCtrl = this.assignCtrl.bind(this);
        this.removeCtrl = this.removeCtrl.bind(this);
        this.syncCtrl = this.syncCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const list = await this.rolPermissionUseCase.getRolPermissions();
            return res.status(200).json({
                success: true,
                message: "Asignaciones rol-permiso recuperadas.",
                data: list
            });
        } catch (error: any) {
            console.error("Error en getAllCtrl (RolPermissionController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron recuperar las asignaciones.",
                error: error.message
            });
        }
    }

    public async getByRolCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            if (!rol_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "rol_uuid es requerido."
                });
            }

            const list = await this.rolPermissionUseCase.getPermissionsByRol(rol_uuid);
            return res.status(200).json({
                success: true,
                message: "Permisos del rol recuperados.",
                data: list
            });
        } catch (error: any) {
            console.error("Error en getByRolCtrl (RolPermissionController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron recuperar los permisos del rol.",
                error: error.message
            });
        }
    }

    public async getByPermissionCtrl(req: Request, res: Response) {
        try {
            const per_uuid = req.params.per_uuid;
            if (!per_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "per_uuid es requerido."
                });
            }

            const list = await this.rolPermissionUseCase.getRolesByPermission(per_uuid);
            return res.status(200).json({
                success: true,
                message: "Roles asociados al permiso recuperados.",
                data: list
            });
        } catch (error: any) {
            console.error("Error en getByPermissionCtrl (RolPermissionController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron recuperar los roles del permiso.",
                error: error.message
            });
        }
    }

    public async assignCtrl(req: Request, res: Response) {
        try {
            const { rol_uuid, per_uuid } = req.body;
            if (!rol_uuid || !per_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "Debe proporcionar rol_uuid y per_uuid."
                });
            }

            const created = await this.rolPermissionUseCase.assignPermissionToRol({ rol_uuid, per_uuid });
            return res.status(201).json({
                success: true,
                message: "Permiso asignado al rol con éxito.",
                data: created
            });
        } catch (error: any) {
            console.error("Error en assignCtrl (RolPermissionController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo asignar el permiso al rol.",
                error: error.message
            });
        }
    }

    public async removeCtrl(req: Request, res: Response) {
        try {
            const { rol_uuid, per_uuid } = req.params;
            if (!rol_uuid || !per_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "Debe proporcionar rol_uuid y per_uuid en la ruta."
                });
            }

            const deleted = await this.rolPermissionUseCase.removePermissionFromRol(rol_uuid, per_uuid);
            return res.status(200).json({
                success: true,
                message: "Permiso desvinculado del rol con éxito.",
                data: deleted
            });
        } catch (error: any) {
            console.error("Error en removeCtrl (RolPermissionController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo desvincular el permiso del rol.",
                error: error.message
            });
        }
    }

    public async syncCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            const { per_uuids } = req.body;

            if (!rol_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "rol_uuid es requerido."
                });
            }
            if (!Array.isArray(per_uuids)) {
                return res.status(400).json({
                    success: false,
                    message: "per_uuids debe ser un array de IDs de permisos."
                });
            }

            const synced = await this.rolPermissionUseCase.syncPermissionsToRol(rol_uuid, per_uuids);
            return res.status(200).json({
                success: true,
                message: "Permisos del rol sincronizados con éxito.",
                data: synced
            });
        } catch (error: any) {
            console.error("Error en syncCtrl (RolPermissionController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron sincronizar los permisos del rol.",
                error: error.message
            });
        }
    }
}
