import { Express } from "express";
import { SequelizeRepository as SequelizeCompanySettingRepository } from "../../repository/company-setting/sequelize-company-setting.repository";
import { CompanySettingUseCase } from "../../../application/company-setting/company-setting-use-case";
import { CompanySettingController } from "../../controller/company-setting/company-setting.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middlewares/auth.middleware";

function configureCompanySettingRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCompanySettingRepository = new SequelizeCompanySettingRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const companySettingUseCase = new CompanySettingUseCase(sequelizeCompanySettingRepository);
    
    /*
    *   Iniciar controller
    */
    
    const companySettingCtrl = new CompanySettingController(companySettingUseCase, socketAdapter);
    
    /**
     * @swagger
     * /companies-settings/{cmp_uuid}:
     *   get:
     *     summary: Obtener configuraciones de una empresa
     *     tags:
     *       - CompanySettings
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
     *         description: Configuraciones retornadas.
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
     *                     $ref: '#/components/schemas/CompanySettingEntity'
     *       400:
     *         description: Error al recuperar las configuraciones.
     */
    app.get(`/${process.env.BASE_URL_API}/companies-settings/:cmp_uuid/:filter?/:page?/:perPage?`, companySettingCtrl.getAllCtrl);

    /**
     * @swagger
     * /company-setting/{cmp_uuid}/{cmps_uuid}:
     *   get:
     *     summary: Obtener detalle de una configuración por UUID
     *     tags:
     *       - CompanySettings
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cmps_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Configuración retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CompanySettingEntity'
     *       400:
     *         description: Configuración no encontrada o parámetros inválidos.
     */
    app.get(`/${process.env.BASE_URL_API}/company-setting/:cmp_uuid/:cmps_uuid`, companySettingCtrl.getCtrl);

    /**
     * @swagger
     * /company-setting:
     *   post:
     *     summary: Registrar una nueva clave de configuración para una empresa
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCompanySettingDto'
     *     responses:
     *       200:
     *         description: Configuración creada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CompanySettingEntity'
     *       400:
     *         description: Error al crear la configuración.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/company-setting`, authMiddleware, companySettingCtrl.insertCtrl);

    /**
     * @swagger
     * /company-setting/{cmp_uuid}/{cmps_uuid}:
     *   put:
     *     summary: Actualizar una configuración existente
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cmps_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateCompanySettingDto'
     *     responses:
     *       200:
     *         description: Configuración actualizada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CompanySettingEntity'
     *       400:
     *         description: Error al actualizar la configuración.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/company-setting/:cmp_uuid/:cmps_uuid`, authMiddleware, companySettingCtrl.updateCtrl);

    /**
     * @swagger
     * /company-setting/{cmp_uuid}/{cmps_uuid}:
     *   delete:
     *     summary: Eliminar una configuración por UUID
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cmps_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Configuración eliminada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar la configuración.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/company-setting/:cmp_uuid/:cmps_uuid`, authMiddleware, companySettingCtrl.deleteCtrl);
}

export default configureCompanySettingRoutes;
