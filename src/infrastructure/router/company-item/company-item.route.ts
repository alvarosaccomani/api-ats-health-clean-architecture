import { Express } from "express";
import { SequelizeCompanyItemRepository } from "../../repository/company-item/sequelize-company-item.repository";
import { CompanyItemUseCase } from "../../../application/company-item/company-item-use-case";
import { CompanyItemController } from "../../controller/company-item/company-item.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureCompanyItemRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeCompanyItemRepository = new SequelizeCompanyItemRepository();
    const companyItemUseCase = new CompanyItemUseCase(sequelizeCompanyItemRepository);
    const companyItemCtrl = new CompanyItemController(companyItemUseCase, socketAdapter);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @swagger
     * /api/company-items/{cmp_uuid}/{filter}/{page}/{perPage}:
     *   get:
     *     summary: Obtener ítems asignados a una empresa
     *     tags: [Company Items]
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/company-items/:cmp_uuid/:filter?/:page?/:perPage?`, authMiddleware, companyItemCtrl.getAllCtrl);

    /**
     * @swagger
     * /api/company-item/{cmp_uuid}/{itm_uuid}/{cmpitm_uuid}:
     *   get:
     *     summary: Obtener ítem asignado por ID
     *     tags: [Company Items]
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/company-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid`, authMiddleware, companyItemCtrl.getCtrl);

    /**
     * @swagger
     * /api/company-item:
     *   post:
     *     summary: Asignar un ítem a una empresa
     *     tags: [Company Items]
     *     security:
     *       - bearerAuth: []
     */
    app.post(`/${basePrefix}/company-item`, authMiddleware, companyItemCtrl.insertCtrl);

    /**
     * @swagger
     * /api/company-item/{cmp_uuid}/{itm_uuid}/{cmpitm_uuid}:
     *   put:
     *     summary: Actualizar asignación de ítem de empresa
     *     tags: [Company Items]
     *     security:
     *       - bearerAuth: []
     */
    app.put(`/${basePrefix}/company-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid`, authMiddleware, companyItemCtrl.updateCtrl);

    /**
     * @swagger
     * /api/company-item/{cmp_uuid}/{itm_uuid}/{cmpitm_uuid}:
     *   delete:
     *     summary: Desvincular ítem de la empresa
     *     tags: [Company Items]
     *     security:
     *       - bearerAuth: []
     */
    app.delete(`/${basePrefix}/company-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid`, authMiddleware, companyItemCtrl.deleteCtrl);
}

export default configureCompanyItemRoutes;
