import { Express } from "express";
import { SequelizeCompanySettingRepository } from "../../repository/company-setting/sequelize-company-setting.repository";
import { CompanySettingUseCase } from "../../../application/company-setting/company-setting-use-case";
import { CompanySettingController } from "../../controller/company-setting/company-setting.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middlewares/auth.middleware";

function configureCompanySettingRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeCompanySettingRepository = new SequelizeCompanySettingRepository();
    const companySettingUseCase = new CompanySettingUseCase(sequelizeCompanySettingRepository);
    const companySettingCtrl = new CompanySettingController(companySettingUseCase, socketAdapter);
    
    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @swagger
     * /companies-settings/{cmp_uuid}:
     *   get:
     *     summary: Obtener configuraciones de una empresa
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/companies-settings/:cmp_uuid/:filter?/:page?/:perPage?`, authMiddleware, companySettingCtrl.getAllCtrl);

    /**
     * @swagger
     * /company-setting/{cmp_uuid}/{cmps_uuid}:
     *   get:
     *     summary: Obtener detalle de una configuración por UUID
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/company-setting/:cmp_uuid/:cmps_uuid`, authMiddleware, companySettingCtrl.getCtrl);

    /**
     * @swagger
     * /company-setting:
     *   post:
     *     summary: Registrar una nueva clave de configuración para una empresa
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     */
    app.post(`/${basePrefix}/company-setting`, authMiddleware, companySettingCtrl.insertCtrl);

    /**
     * @swagger
     * /company-setting/{cmp_uuid}/{cmps_uuid}:
     *   put:
     *     summary: Actualizar una configuración existente
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     */
    app.put(`/${basePrefix}/company-setting/:cmp_uuid/:cmps_uuid`, authMiddleware, companySettingCtrl.updateCtrl);

    /**
     * @swagger
     * /company-setting/{cmp_uuid}/{cmps_uuid}:
     *   delete:
     *     summary: Eliminar una configuración por UUID
     *     tags:
     *       - CompanySettings
     *     security:
     *       - bearerAuth: []
     */
    app.delete(`/${basePrefix}/company-setting/:cmp_uuid/:cmps_uuid`, authMiddleware, companySettingCtrl.deleteCtrl);
}

export default configureCompanySettingRoutes;
