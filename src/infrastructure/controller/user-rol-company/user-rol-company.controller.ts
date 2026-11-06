import { Request, Response } from "express";
import { UserRolCompanyUseCase } from "../../../application/user-rol-company/user-rol-company-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class UserRolCompanyController {
    constructor(private userRolCompanyUseCase: UserRolCompanyUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getUserRolesCompanyByUserCtrl = this.getUserRolesCompanyByUserCtrl.bind(this);
        this.getUserRolesCompanyByCompanyUserCtrl = this.getUserRolesCompanyByCompanyUserCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los user roles company.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const userRolesCompany = await this.userRolCompanyUseCase.getUserRolesCompany(cmp_uuid);
                return res.status(200).send({
                    success: true,
                    message: 'User roles company retornados.',
                    ...paginator(userRolesCompany, page, perPage)
                });
            } else {
                const userRolesCompany = await this.userRolCompanyUseCase.getUserRolesCompany(cmp_uuid);
                return res.status(200).send({
                    success: true,
                    message: 'User roles company retornados.',
                    data: userRolesCompany
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los user roles company.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const usr_uuid = req.params.usr_uuid;
            const rol_uuid = req.params.rol_uuid;
            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined' || 
                !usr_uuid || usr_uuid.toLowerCase() === 'null' || usr_uuid.toLowerCase() === 'undefined' || 
                !rol_uuid || rol_uuid.toLowerCase() === 'null' || rol_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el user rol company.',
                    error: 'Debe proporcionar cmp_uuid, usr_uuid y rol_uuid.'
                });
            }
            const userRolCompany = await this.userRolCompanyUseCase.getDetailUserRolCompany(cmp_uuid, usr_uuid, rol_uuid);
            return res.status(200).send({
                success: true,
                message: 'User rol company retornada.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el user rol company.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const usr_uuid = body.usr_uuid;
            const rol_uuid = body.rol_uuid;
            if (!cmp_uuid || !usr_uuid || !rol_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el user rol company.',
                    error: 'Debe proporcionar cmp_uuid, usr_uuid y rol_uuid.'
                });
            }
            const userRolCompanyExist = await this.userRolCompanyUseCase.existUserRolCompany(cmp_uuid, usr_uuid, rol_uuid);
            if (userRolCompanyExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el user rol company.',
                    error: 'El user rol company ya existe.'
                });
            }
            const userRolCompany = await this.userRolCompanyUseCase.createUserRolCompany(body);
            return res.status(201).json({
                success: true,
                message: 'User rol company insertado.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el user rol company.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid || req.body.cmp_uuid;
            const usr_uuid = req.params.usr_uuid || req.body.usr_uuid;
            const rol_uuid = req.params.rol_uuid || req.body.rol_uuid;
            if (!cmp_uuid || !usr_uuid || !rol_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el user rol company.',
                    error: 'Debe proporcionar cmp_uuid, usr_uuid y rol_uuid.'
                });
            }
            const update = req.body;
            const userRolCompany = await this.userRolCompanyUseCase.updateUserRolCompany(cmp_uuid, usr_uuid, rol_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'User rol company actualizado.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el user rol company.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const usr_uuid = req.params.usr_uuid;
            const rol_uuid = req.params.rol_uuid;
            if (!cmp_uuid || !usr_uuid || !rol_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el user rol company.',
                    error: 'Debe proporcionar cmp_uuid, usr_uuid y rol_uuid.'
                });
            }
            const userRolCompany = await this.userRolCompanyUseCase.deleteUserRolCompany(cmp_uuid, usr_uuid, rol_uuid);
            return res.status(200).json({
                success: true,
                message: 'User rol company eliminado.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el user rol company.',
                error: error.message,
            });
        }
    }

    public async getUserRolesCompanyByUserCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const userRolesCompany = await this.userRolCompanyUseCase.getUserRolesCompanyByUser(usr_uuid);
            return res.status(200).send({
                success: true,
                message: 'User roles company retornados.',
                data: userRolesCompany
            });
        } catch (error: any) {
            console.error('Error en getUserRolesCompanyByUserCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los user roles company',
                error: error.message,
            });
        }
    }

    public async getUserRolesCompanyByCompanyUserCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const usr_uuid = req.params.usr_uuid;
            const userRolesCompany = await this.userRolCompanyUseCase.getUserRolesCompanyByCompanyUser(cmp_uuid, usr_uuid);
            return res.status(200).send({
                success: true,
                message: 'User roles company retornados.',
                data: userRolesCompany
            });
        } catch (error: any) {
            console.error('Error en getUserRolesCompanyByCompanyUserCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los user roles company por company user.',
                error: error.message,
            });
        }
    }
}
