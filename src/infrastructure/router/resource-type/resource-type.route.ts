import { Express } from "express";
import { SequelizeResourceTypeRepository } from "../../repository/resource-type/sequelize-resource-type.repository";
import { ResourceTypeUseCase } from "../../../application/resource-type/resource-type-use-case";
import { ResourceTypeController } from "../../controller/resource-type/resource-type.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureResourceTypeRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeResourceTypeRepository = new SequelizeResourceTypeRepository();
    const resourceTypeUseCase = new ResourceTypeUseCase(sequelizeResourceTypeRepository);
    const resourceTypeCtrl = new ResourceTypeController(resourceTypeUseCase, socketAdapter);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @swagger
     * /resources-types:
     *   get:
     *     summary: Obtener lista de tipos de recursos
     *     tags:
     *       - Resource-Types
     */
    app.get(`/${basePrefix}/resources-types/:filter?/:page?/:perPage?`, authMiddleware, resourceTypeCtrl.getAllCtrl);

    /**
     * @swagger
     * /resource-type/{rety_uuid}:
     *   get:
     *     summary: Obtener detalle de un tipo de recurso por UUID
     *     tags:
     *       - Resource-Types
     */
    app.get(`/${basePrefix}/resource-type/:rety_uuid`, authMiddleware, resourceTypeCtrl.getCtrl);

    /**
     * @swagger
     * /resource-type:
     *   post:
     *     summary: Crear un nuevo tipo de recurso
     *     tags:
     *       - Resource-Types
     */
    app.post(`/${basePrefix}/resource-type`, authMiddleware, resourceTypeCtrl.insertCtrl);

    /**
     * @swagger
     * /resource-type/{rety_uuid}:
     *   put:
     *     summary: Actualizar un tipo de recurso
     *     tags:
     *       - Resource-Types
     */
    app.put(`/${basePrefix}/resource-type/:rety_uuid`, authMiddleware, resourceTypeCtrl.updateCtrl);

    /**
     * @swagger
     * /resource-type/{rety_uuid}:
     *   delete:
     *     summary: Eliminar un tipo de recurso por UUID
     *     tags:
     *       - Resource-Types
     */
    app.delete(`/${basePrefix}/resource-type/:rety_uuid`, authMiddleware, resourceTypeCtrl.deleteCtrl);
}

export default configureResourceTypeRoutes;
