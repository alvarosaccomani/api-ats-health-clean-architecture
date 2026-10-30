import { Express } from "express";
import { SequelizeRepository as SequelizeCompanyRepository } from "../../repository/company/sequelize-company.repository";
import { CompanyUseCase } from "../../../application/company/company-use-case";
import { CompanyController } from "../../controller/company/company.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middlewares/auth.middleware";

function configureCompanyRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCompanyRepository = new SequelizeCompanyRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const companyUseCase = new CompanyUseCase(sequelizeCompanyRepository);
    
    /*
    *   Iniciar controller
    */
    
    const companyCtrl = new CompanyController(companyUseCase, socketAdapter);
    
    /**
     * @swagger
     * /companies:
     *   get:
     *     summary: Obtener lista de empresas registradas (con paginación opcional)
     *     tags:
     *       - Companies
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
     *         description: Empresas retornadas.
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
     *                     $ref: '#/components/schemas/CompanyEntity'
     *       400:
     *         description: Error al recuperar las empresas.
     */
    app.get(`/${process.env.BASE_URL_API}/companies/:filter?/:page?/:perPage?`, companyCtrl.getAllCtrl);

    /**
     * @swagger
     * /company/{cmp_uuid}:
     *   get:
     *     summary: Obtener detalle de una empresa por UUID
     *     tags:
     *       - Companies
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Empresa retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CompanyEntity'
     *       400:
     *         description: Empresa no encontrada o ID inválido.
     */
    app.get(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, companyCtrl.getCtrl);

    /**
     * @swagger
     * /company:
     *   post:
     *     summary: Registrar una nueva empresa
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCompanyDto'
     *     responses:
     *       200:
     *         description: Empresa creada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CompanyEntity'
     *       400:
     *         description: Error al registrar la empresa o slug duplicado.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/company`, authMiddleware, companyCtrl.insertCtrl);

    /**
     * @swagger
     * /company/{cmp_uuid}:
     *   put:
     *     summary: Actualizar una empresa existente
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateCompanyDto'
     *     responses:
     *       200:
     *         description: Empresa actualizada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CompanyEntity'
     *       400:
     *         description: Error al actualizar la empresa.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, authMiddleware, companyCtrl.updateCtrl);

    /**
     * @swagger
     * /company/{cmp_uuid}:
     *   delete:
     *     summary: Eliminar una empresa por UUID
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Empresa eliminada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar la empresa.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, authMiddleware, companyCtrl.deleteCtrl);
}

export default configureCompanyRoutes;
