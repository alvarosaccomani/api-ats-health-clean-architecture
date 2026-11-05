import { Request, Response } from "express";
import { CompanyItemUseCase } from "../../../application/company-item/company-item-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CompanyItemController {
    constructor(private companyItemUseCase: CompanyItemUseCase, private socketAdapter?: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los company items.',
                    error: 'Debe proporcionar un Id de empresa válido.'
                });
            }

            const companyItems = await this.companyItemUseCase.getCompanyItems(cmp_uuid);

            if (page && perPage) {
                return res.status(200).json({
                    success: true,
                    message: 'Company items retornados.',
                    ...paginator(companyItems, page, perPage)
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Company items retornados.',
                    data: companyItems
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los company items.',
                error: error.message
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cmpitm_uuid = req.params.cmpitm_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined' ||
                !itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined' ||
                !cmpitm_uuid || cmpitm_uuid.toLowerCase() === 'null' || cmpitm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el company item.',
                    error: 'Debe proporcionar cmp_uuid, itm_uuid y cmpitm_uuid válidos.'
                });
            }

            const companyItem = await this.companyItemUseCase.getDetailCompanyItem(cmp_uuid, itm_uuid, cmpitm_uuid);
            return res.status(200).json({
                success: true,
                message: 'Company Item retornado con éxito.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el company item.',
                error: error.message
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, itm_uuid } = body;
            if (!cmp_uuid || !itm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el company item.',
                    error: 'Debe proporcionar cmp_uuid e itm_uuid.'
                });
            }

            const companyItemExist = await this.companyItemUseCase.existCompanyItem(cmp_uuid, itm_uuid);
            if (companyItemExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el company item.',
                    error: 'El company item ya existe para esta empresa.'
                });
            }

            const companyItem = await this.companyItemUseCase.createCompanyItem(body);
            return res.status(201).json({
                success: true,
                message: 'Company Item insertado.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el company item.',
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, itm_uuid, cmpitm_uuid } = req.params;
            const update = req.body;

            if (!cmp_uuid || !itm_uuid || !cmpitm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el company item.',
                    error: 'Debe proporcionar cmp_uuid, itm_uuid y cmpitm_uuid.'
                });
            }

            const companyItem = await this.companyItemUseCase.updateCompanyItem(cmp_uuid, itm_uuid, cmpitm_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Company Item actualizado.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el company item.',
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, itm_uuid, cmpitm_uuid } = req.params;

            if (!cmp_uuid || !itm_uuid || !cmpitm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el company item.',
                    error: 'Debe proporcionar cmp_uuid, itm_uuid y cmpitm_uuid.'
                });
            }

            const companyItem = await this.companyItemUseCase.deleteCompanyItem(cmp_uuid, itm_uuid, cmpitm_uuid);
            return res.status(200).json({
                success: true,
                message: 'Company Item eliminado.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el company item.',
                error: error.message
            });
        }
    }
}
