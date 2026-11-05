import { Express } from "express";
import { SequelizeItemRepository } from "../../repository/item/sequelize-item.repository";
import { ItemUseCase } from "../../../application/item/item-use-case";
import { ItemController } from "../../controller/item/item.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureItemRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeItemRepository = new SequelizeItemRepository();
    const itemUseCase = new ItemUseCase(sequelizeItemRepository);
    const itemCtrl = new ItemController(itemUseCase, socketAdapter);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @route GET /api/items
     * @description Obtener catálogo maestro de ítems / especialidades
     */
    app.get(`/${basePrefix}/items/:filter?/:page?/:perPage?`, authMiddleware, itemCtrl.getAllCtrl);

    /**
     * @route GET /api/item/:itm_uuid
     * @description Obtener detalle de un ítem por UUID
     */
    app.get(`/${basePrefix}/item/:itm_uuid`, authMiddleware, itemCtrl.getCtrl);

    /**
     * @route POST /api/item
     * @description Crear un nuevo ítem en el catálogo
     */
    app.post(`/${basePrefix}/item`, authMiddleware, itemCtrl.insertCtrl);

    /**
     * @route PUT /api/item/:itm_uuid
     * @description Actualizar un ítem existente
     */
    app.put(`/${basePrefix}/item/:itm_uuid`, authMiddleware, itemCtrl.updateCtrl);

    /**
     * @route DELETE /api/item/:itm_uuid
     * @description Eliminar un ítem del catálogo
     */
    app.delete(`/${basePrefix}/item/:itm_uuid`, authMiddleware, itemCtrl.deleteCtrl);
}

export default configureItemRoutes;
