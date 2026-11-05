import { Request, Response } from "express";
import { ItemUseCase } from "../../../application/item/item-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { getStringFromQuery } from "../../utils/util";
import { paginator } from "../../services/paginator.service";

export class ItemController {
    constructor(private itemUseCase: ItemUseCase, private socketAdapter?: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const itm_name = getStringFromQuery(req.query.itm_name) || getStringFromQuery(req.params.filter);
            const itm_description = getStringFromQuery(req.query.itm_description);
            const field_order = getStringFromQuery(req.query.field_order);
            const itm_orderby = getStringFromQuery(req.query.itm_orderby);

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const items = await this.itemUseCase.getItems(itm_name, itm_description, field_order, itm_orderby);

            if (page && perPage) {
                return res.status(200).json({
                    success: true,
                    message: 'Items retornados.',
                    ...paginator(items, page, perPage)
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Items retornados.',
                    data: items
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los items.',
                error: error.message
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const itm_uuid = req.params.itm_uuid;
            if (!itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            }

            const item = await this.itemUseCase.getDetailItem(itm_uuid);
            return res.status(200).json({
                success: true,
                message: 'Item retornado.',
                data: item
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(404).json({
                success: false,
                message: 'No se pudo recuperar el item.',
                error: error.message
            });
        }
    }

    public async insertCtrl(req: Request, res: Response) {
        try {
            const { itm_name, itm_description, itm_uuid } = req.body;
            if (!itm_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el item.',
                    error: 'Debe proporcionar un Nombre para el item.'
                });
            }

            const item = await this.itemUseCase.createItem({
                itm_uuid,
                itm_name,
                itm_description
            });

            return res.status(201).json({
                success: true,
                message: 'Item insertado con éxito.',
                data: item
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el item.',
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const itm_uuid = req.params.itm_uuid;
            const update = req.body;

            if (!itm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            }

            const item = await this.itemUseCase.updateItem(itm_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Item actualizado.',
                data: item
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el item.',
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const itm_uuid = req.params.itm_uuid;
            if (!itm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            }

            const item = await this.itemUseCase.deleteItem(itm_uuid);
            return res.status(200).json({
                success: true,
                message: 'Item eliminado.',
                data: item
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el item.',
                error: error.message
            });
        }
    }
}
