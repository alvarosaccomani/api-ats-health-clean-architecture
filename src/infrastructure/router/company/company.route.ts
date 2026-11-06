import { Express } from "express";
import { SequelizeCompanyRepository } from "../../repository/company/sequelize-company.repository";
import { CompanyUseCase } from "../../../application/company/company-use-case";
import { CompanyController } from "../../controller/company/company.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middlewares/auth.middleware";

function configureCompanyRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeCompanyRepository = new SequelizeCompanyRepository();
    const companyUseCase = new CompanyUseCase(sequelizeCompanyRepository);
    const companyCtrl = new CompanyController(companyUseCase, socketAdapter);
    
    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @swagger
     * /companies:
     *   get:
     *     summary: Obtener lista de empresas registradas (con paginación opcional)
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/companies/:filter?/:page?/:perPage?`, authMiddleware, companyCtrl.getAllCtrl);

    /**
     * @swagger
     * /company/{cmp_uuid}:
     *   get:
     *     summary: Obtener detalle de una empresa por UUID
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/company/:cmp_uuid`, authMiddleware, companyCtrl.getCtrl);

    /**
     * @swagger
     * /company:
     *   post:
     *     summary: Registrar una nueva empresa
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     */
    app.post(`/${basePrefix}/company`, authMiddleware, companyCtrl.insertCtrl);

    /**
     * @swagger
     * /company/{cmp_uuid}:
     *   put:
     *     summary: Actualizar una empresa existente
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     */
    app.put(`/${basePrefix}/company/:cmp_uuid`, authMiddleware, companyCtrl.updateCtrl);

    /**
     * @swagger
     * /company/{cmp_uuid}:
     *   delete:
     *     summary: Eliminar una empresa por UUID
     *     tags:
     *       - Companies
     *     security:
     *       - bearerAuth: []
     */
    app.delete(`/${basePrefix}/company/:cmp_uuid`, authMiddleware, companyCtrl.deleteCtrl);
}

export default configureCompanyRoutes;
