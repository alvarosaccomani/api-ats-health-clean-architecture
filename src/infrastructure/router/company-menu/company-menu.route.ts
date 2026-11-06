import { Express } from "express";
import { CompanyMenuUseCase } from "../../../application/company-menu/company-menu-use-case";
import { SequelizeCompanyMenuRepository } from "../../repository/company-menu/sequelize-company-menu.repository";
import { CompanyMenuController } from "../../controller/company-menu/company-menu.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureCompanyMenuRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const repository = new SequelizeCompanyMenuRepository();
    const useCase = new CompanyMenuUseCase(repository);
    const controller = new CompanyMenuController(useCase);
    
    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @swagger
     * /api/company-menu:
     *   post:
     *     summary: Crear override / personalización de menú para una clínica
     *     tags: [Company Menus]
     *     security:
     *       - bearerAuth: []
     */
    app.post(`/${basePrefix}/company-menu`, authMiddleware, controller.insertCtrl);

    /**
     * @swagger
     * /api/company-menu/{cmpmnu_uuid}:
     *   put:
     *     summary: Actualizar personalización de menú
     *     tags: [Company Menus]
     *     security:
     *       - bearerAuth: []
     */
    app.put(`/${basePrefix}/company-menu/:cmpmnu_uuid`, authMiddleware, controller.updateCtrl);

    /**
     * @swagger
     * /api/company-menu/{cmpmnu_uuid}:
     *   delete:
     *     summary: Eliminar personalización de menú
     *     tags: [Company Menus]
     *     security:
     *       - bearerAuth: []
     */
    app.delete(`/${basePrefix}/company-menu/:cmpmnu_uuid`, authMiddleware, controller.deleteCtrl);

    /**
     * @swagger
     * /api/company-menu/{cmp_uuid}:
     *   get:
     *     summary: Obtener todas las personalizaciones de menú de una clínica
     *     tags: [Company Menus]
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/company-menu/:cmp_uuid`, authMiddleware, controller.getOverridesCtrl);
}

export default configureCompanyMenuRoutes;
