import { Express } from "express";
import { SequelizeRepository } from "../../repository/permission/sequelize-permission.repository";
import { PermissionUseCase } from "../../../application/permission/permission-use-case";
import { PermissionController } from "../../controller/permission/permission.controller";
import SocketAdapter from "../../services/socketAdapter";

function configurePermissionRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizePermissionRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const permissionUseCase = new PermissionUseCase(sequelizePermissionRepository);
    
    /*
    *   Iniciar controller
    */
    
    const permissionCtrl = new PermissionController(permissionUseCase, socketAdapter);
    
    /**
     * @swagger
     * /permissions:
     *   get:
     *     summary: Obtener lista de permisos
     *     tags:
     *       - Permissions
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
     *         description: Permisos retornados.
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
     *                     $ref: '#/components/schemas/PermissionEntity'
     *       400:
     *         description: Error al obtener permisos.
     */
    app.get(`/${process.env.BASE_URL_API}/permissions/:filter?/:page?/:perPage?`, permissionCtrl.getAllCtrl);

    /**
     * @swagger
     * /permission/{per_uuid}:
     *   get:
     *     summary: Obtener detalle de un permiso por UUID
     *     tags:
     *       - Permissions
     *     parameters:
     *       - in: path
     *         name: per_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Permiso retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/PermissionEntity'
     *       400:
     *         description: Permiso no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/permission/:per_uuid`, permissionCtrl.getCtrl);

    /**
     * @swagger
     * /permission:
     *   post:
     *     summary: Crear un nuevo permiso
     *     tags:
     *       - Permissions
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePermissionDto'
     *     responses:
     *       200:
     *         description: Permiso insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/PermissionEntity'
     *       400:
     *         description: Error al crear permiso.
     */
    app.post(`/${process.env.BASE_URL_API}/permission`, permissionCtrl.insertCtrl);

    /**
     * @swagger
     * /permission/{per_uuid}:
     *   put:
     *     summary: Actualizar un permiso existente
     *     tags:
     *       - Permissions
     *     parameters:
     *       - in: path
     *         name: per_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdatePermissionDto'
     *     responses:
     *       200:
     *         description: Permiso actualizado con éxito.
     *       400:
     *         description: Error al actualizar permiso.
     */
    app.put(`/${process.env.BASE_URL_API}/permission/:per_uuid`, permissionCtrl.updateCtrl);

    /**
     * @swagger
     * /permission/{per_uuid}:
     *   delete:
     *     summary: Eliminar un permiso por UUID
     *     tags:
     *       - Permissions
     *     parameters:
     *       - in: path
     *         name: per_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Permiso eliminado con éxito.
     *       400:
     *         description: Error al eliminar permiso.
     */
    app.delete(`/${process.env.BASE_URL_API}/permission/:per_uuid`, permissionCtrl.deleteCtrl);
}

export default configurePermissionRoutes;