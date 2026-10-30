import { Express } from "express";
import { SequelizeRepository } from "../../repository/resource-module/sequelize-resource-module.repository";
import { ResourceModuleUseCase } from "../../../application/resource-module/resource-module-use-case";
import { ResourceModuleController } from "../../controller/resource-module/resource-module.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureResourceModuleRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeResourceModuleRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const resourceModuleUseCase = new ResourceModuleUseCase(sequelizeResourceModuleRepository);
    
    /*
    *   Iniciar controller
    */
    
    const resourceModuleCtrl = new ResourceModuleController(resourceModuleUseCase, socketAdapter);
    
    /**
     * @swagger
     * /resources-modules:
     *   get:
     *     summary: Obtener lista de módulos de recursos
     *     tags:
     *       - Resource-Modules
     *     parameters:
     *       - in: query
     *         name: filter
     *         schema:
     *           type: string
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *       - in: query
     *         name: perPage
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Módulos de recursos retornados.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/ResourceModuleEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/resources-modules/:filter?/:page?/:perPage?`, resourceModuleCtrl.getAllCtrl);

    /**
     * @swagger
     * /resource-module/{remo_uuid}:
     *   get:
     *     summary: Obtener detalle de un módulo de recurso por UUID
     *     tags:
     *       - Resource-Modules
     *     parameters:
     *       - in: path
     *         name: remo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Módulo encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/ResourceModuleEntity'
     *       400:
     *         description: Módulo no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/resource-module/:remo_uuid`, resourceModuleCtrl.getCtrl);

    /**
     * @swagger
     * /resource-module:
     *   post:
     *     summary: Crear un nuevo módulo de recurso
     *     tags:
     *       - Resource-Modules
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateResourceModuleDto'
     *     responses:
     *       200:
     *         description: Módulo creado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/resource-module`, resourceModuleCtrl.insertCtrl);

    /**
     * @swagger
     * /resource-module/{remo_uuid}:
     *   put:
     *     summary: Actualizar un módulo de recurso
     *     tags:
     *       - Resource-Modules
     *     parameters:
     *       - in: path
     *         name: remo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateResourceModuleDto'
     *     responses:
     *       200:
     *         description: Módulo actualizado.
     */
    app.put(`/${process.env.BASE_URL_API}/resource-module/:remo_uuid`, resourceModuleCtrl.updateCtrl);

    /**
     * @swagger
     * /resource-module/{remo_uuid}:
     *   delete:
     *     summary: Eliminar un módulo de recurso por UUID
     *     tags:
     *       - Resource-Modules
     *     parameters:
     *       - in: path
     *         name: remo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Módulo eliminado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/resource-module/:remo_uuid`, resourceModuleCtrl.deleteCtrl);
}

export default configureResourceModuleRoutes;
