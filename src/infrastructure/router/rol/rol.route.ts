import { Express } from "express";
import { SequelizeRepository } from "../../repository/rol/sequelize-rol.repository";
import { RolUseCase } from "../../../application/rol/rol-use-case";
import { RolController } from "../../controller/rol/rol.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureRolRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeRolRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const rolUseCase = new RolUseCase(sequelizeRolRepository);
    
    /*
    *   Iniciar controller
    */
    
    const rolCtrl = new RolController(rolUseCase, socketAdapter);
    
    /**
     * @swagger
     * /roles:
     *   get:
     *     summary: Obtener lista de roles
     *     tags:
     *       - Roles
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
     *         description: Roles retornados.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/RolEntity'
     *       400:
     *         description: Error al obtener roles.
     */
    app.get(`/${process.env.BASE_URL_API}/roles/:filter?/:page?/:perPage?`, rolCtrl.getAllCtrl);

    /**
     * @swagger
     * /rol/{rol_uuid}:
     *   get:
     *     summary: Obtener detalle de un rol por UUID
     *     tags:
     *       - Roles
     *     parameters:
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Rol retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/RolEntity'
     *       400:
     *         description: Rol no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/rol/:rol_uuid`, rolCtrl.getCtrl);

    /**
     * @swagger
     * /rol:
     *   post:
     *     summary: Crear un nuevo rol
     *     tags:
     *       - Roles
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateRolDto'
     *     responses:
     *       200:
     *         description: Rol insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/RolEntity'
     *       400:
     *         description: Error al crear rol.
     */
    app.post(`/${process.env.BASE_URL_API}/rol`, rolCtrl.insertCtrl);

    /**
     * @swagger
     * /rol/{rol_uuid}:
     *   put:
     *     summary: Actualizar un rol
     *     tags:
     *       - Roles
     *     parameters:
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateRolDto'
     *     responses:
     *       200:
     *         description: Rol actualizado con éxito.
     *       400:
     *         description: Error al actualizar rol.
     */
    app.put(`/${process.env.BASE_URL_API}/rol/:rol_uuid`, rolCtrl.updateCtrl);

    /**
     * @swagger
     * /rol/{rol_uuid}:
     *   delete:
     *     summary: Eliminar un rol por UUID
     *     tags:
     *       - Roles
     *     parameters:
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Rol eliminado con éxito.
     *       400:
     *         description: Error al eliminar rol.
     */
    app.delete(`/${process.env.BASE_URL_API}/rol/:rol_uuid`, rolCtrl.deleteCtrl);
}

export default configureRolRoutes;