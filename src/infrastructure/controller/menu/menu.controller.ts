import { Request, Response } from "express";
import { MenuUseCase } from "../../../application/menu/menu-use-case";
import { paginator } from "../../services/paginator.service";
import { getStringFromQuery } from "../../utils/util";

export class MenuController {
    constructor(private menuUseCase: MenuUseCase) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getDetailCtrl = this.getDetailCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getMenuItemsCtrl = this.getMenuItemsCtrl.bind(this);
        this.getDashboardItemsCtrl = this.getDashboardItemsCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { mnu_title, field_order, mnu_orderby, mnu_showondashboard } = req.query;
            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);
            
            let showOnDashboardVal: boolean | undefined = undefined;
            if (mnu_showondashboard === 'true') showOnDashboardVal = true;
            if (mnu_showondashboard === 'false') showOnDashboardVal = false;

            const menus = await this.menuUseCase.getMenus(
                getStringFromQuery(mnu_title),
                getStringFromQuery(field_order),
                getStringFromQuery(mnu_orderby),
                showOnDashboardVal
            );

            if (page && perPage) {
                return res.status(200).json({
                    success: true,
                    message: 'Menús retornados.',
                    ...paginator(menus, page, perPage)
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Menús retornados.',
                    data: menus
                });
            }
        } catch (e: any) {
            console.error('Error en getAllCtrl (controller):', e.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los menús.',
                error: e.message
            });
        }
    }

    public async getDetailCtrl({ params }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.getDetailMenu(params.mnu_uuid);
            return res.status(200).json({
                success: true,
                message: 'Menú retornado.',
                data
            });
        } catch (e: any) {
            console.error('Error en getDetailCtrl (controller):', e.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el menú.',
                error: e.message
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.createMenu(body);
            return res.status(201).json({
                success: true,
                message: 'Menú insertado.',
                data
            });
        } catch (e: any) {
            console.error('Error en insertCtrl (controller):', e.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el menú.',
                error: e.message
            });
        }
    }

    public async updateCtrl({ params, body }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.updateMenu(params.mnu_uuid, body);
            return res.status(200).json({
                success: true,
                message: 'Menú actualizado.',
                data
            });
        } catch (e: any) {
            console.error('Error en updateCtrl (controller):', e.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el menú.',
                error: e.message
            });
        }
    }

    public async deleteCtrl({ params }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.deleteMenu(params.mnu_uuid);
            return res.status(200).json({
                success: true,
                message: 'Menú eliminado.',
                data
            });
        } catch (e: any) {
            console.error('Error en deleteCtrl (controller):', e.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el menú.',
                error: e.message
            });
        }
    }
    
    public async getMenuItemsCtrl(req: Request, res: Response) {
        try {
            const data = await this.menuUseCase.getMenuItems();
            return res.status(200).json({
                success: true,
                message: 'Items de menú retornados (Árbol).',
                data
            });
        } catch (e: any) {
            console.error('Error en getMenuItemsCtrl (controller):', e.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el árbol de menús.',
                error: e.message
            });
        }
    }

    public async getDashboardItemsCtrl(req: Request, res: Response) {
        try {
            const data = await this.menuUseCase.getDashboardMenuItems();
            return res.status(200).json({
                success: true,
                message: 'Items de menú para el dashboard retornados.',
                data
            });
        } catch (e: any) {
            console.error('Error en getDashboardItemsCtrl (controller):', e.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los ítems del dashboard.',
                error: e.message
            });
        }
    }
}
