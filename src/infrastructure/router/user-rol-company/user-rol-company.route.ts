import { Express } from "express";
import { SequelizeRepository } from "../../repository/user-rol-company/sequelize-user-rol-company.repository";
import { UserRolCompanyUseCase } from "../../../application/user-rol-company/user-rol-company-use-case";
import { UserRolCompanyController } from "../../controller/user-rol-company/user-rol-company.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureUserRolCompanyRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeUserRolCompanyRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const userRolCompanyUseCase = new UserRolCompanyUseCase(sequelizeUserRolCompanyRepository);
    
    /*
    *   Iniciar controller
    */
    
    const userRolCompanyCtrl = new UserRolCompanyController(userRolCompanyUseCase, socketAdapter);
    
    /**
     * @swagger
     * /user-roles-company/{cmp_uuid}:
     *   get:
     *     summary: Obtener asignaciones de roles por empresa
     *     tags:
     *       - User-Role-Company
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
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
     *         description: Asignaciones encontradas.
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
     *                     $ref: '#/components/schemas/UserRolCompanyEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/user-roles-company/:cmp_uuid/:filter?/:page?/:perPage?`, userRolCompanyCtrl.getAllCtrl);

    /**
     * @swagger
     * /user-rol-company/{cmp_uuid}/{usr_uuid}/{rol_uuid}:
     *   get:
     *     summary: Obtener asignación específica de rol de usuario en empresa
     *     tags:
     *       - User-Role-Company
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Asignación encontrada.
     */
    app.get(`/${process.env.BASE_URL_API}/user-rol-company/:cmp_uuid/:usr_uuid/:rol_uuid`, userRolCompanyCtrl.getCtrl);

    /**
     * @swagger
     * /user-rol-company:
     *   post:
     *     summary: Asignar un rol a un usuario en una empresa
     *     tags:
     *       - User-Role-Company
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserRolCompanyDto'
     *     responses:
     *       200:
     *         description: Rol asignado al usuario en la empresa.
     */
    app.post(`/${process.env.BASE_URL_API}/user-rol-company`, userRolCompanyCtrl.insertCtrl);

    /**
     * @swagger
     * /user-rol-company/{cmp_uuid}/{usr_uuid}/{rol_uuid}:
     *   put:
     *     summary: Actualizar asignación de rol
     *     tags:
     *       - User-Role-Company
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Asignación actualizada.
     */
    app.put(`/${process.env.BASE_URL_API}/user-rol-company/:cmp_uuid/:usr_uuid/:rol_uuid`, userRolCompanyCtrl.updateCtrl);

    /**
     * @swagger
     * /user-rol-company/{cmp_uuid}/{usr_uuid}/{rol_uuid}:
     *   delete:
     *     summary: Remover rol de un usuario en una empresa
     *     tags:
     *       - User-Role-Company
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Rol removido con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/user-rol-company/:cmp_uuid/:usr_uuid/:rol_uuid`, userRolCompanyCtrl.deleteCtrl);

    /**
     * @swagger
     * /user-roles-company-by-user/{usr_uuid}:
     *   get:
     *     summary: Obtener todas las empresas y roles asociados a un usuario
     *     tags:
     *       - User-Role-Company
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Empresas y roles retornados.
     */
    app.get(`/${process.env.BASE_URL_API}/user-roles-company-by-user/:usr_uuid`, userRolCompanyCtrl.getUserRolesCompanyByUserCtrl);

    /**
     * @swagger
     * /user-roles-company-by-company-user/{cmp_uuid}/{usr_uuid}:
     *   get:
     *     summary: Obtener roles de un usuario en una empresa específica
     *     tags:
     *       - User-Role-Company
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Roles del usuario en la empresa retornados.
     */
    app.get(`/${process.env.BASE_URL_API}/user-roles-company-by-company-user/:cmp_uuid/:usr_uuid`, userRolCompanyCtrl.getUserRolesCompanyByCompanyUserCtrl);
}

export default configureUserRolCompanyRoutes;