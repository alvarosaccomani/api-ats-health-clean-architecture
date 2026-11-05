import { Express } from "express";
import { SequelizeTemplateRepository } from "../../repository/template/sequelize-template.repository";
import { SequelizeSystemTemplateRepository } from "../../repository/system-template/sequelize-system-template.repository";
import { TemplateUseCase } from "../../../application/template/template-use-case";
import { TemplateController } from "../../controller/template/template.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureTemplateRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeTemplateRepository = new SequelizeTemplateRepository();
    const sequelizeSystemTemplateRepository = new SequelizeSystemTemplateRepository();
    const templateUseCase = new TemplateUseCase(sequelizeTemplateRepository, sequelizeSystemTemplateRepository);
    const templateCtrl = new TemplateController(templateUseCase, socketAdapter);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @route GET /api/templates
     * @description Obtiene las plantillas operativas de la clínica (filtrado por cmp_uuid)
     */
    app.get(`/${basePrefix}/templates`, authMiddleware, templateCtrl.getByCompanyCtrl);

    /**
     * @route GET /api/template/:tpl_uuid
     * @description Obtiene los datos detallados de una plantilla operativa
     */
    app.get(`/${basePrefix}/template/:tpl_uuid`, authMiddleware, templateCtrl.getByIdCtrl);

    /**
     * @route GET /api/template/code/:tpl_code
     * @description Obtiene una plantilla de la clínica por su código
     */
    app.get(`/${basePrefix}/template/code/:tpl_code`, authMiddleware, templateCtrl.getByCodeCtrl);

    /**
     * @route GET /api/templates/item/:itm_uuid
     * @description Obtiene las plantillas de una especialidad dentro de la clínica
     */
    app.get(`/${basePrefix}/templates/item/:itm_uuid`, authMiddleware, templateCtrl.getByItemCtrl);

    /**
     * @route POST /api/template
     * @description Crea una plantilla personalizada para la clínica
     */
    app.post(`/${basePrefix}/template`, authMiddleware, templateCtrl.createCtrl);

    /**
     * @route POST /api/template/clone
     * @description Clona un blueprint global (tplsys_SystemTemplates) hacia la clínica
     */
    app.post(`/${basePrefix}/template/clone`, authMiddleware, templateCtrl.cloneCtrl);

    /**
     * @route PUT /api/template/:tpl_uuid
     * @description Actualiza una plantilla operativa de la clínica
     */
    app.put(`/${basePrefix}/template/:tpl_uuid`, authMiddleware, templateCtrl.updateCtrl);

    /**
     * @route DELETE /api/template/:tpl_uuid
     * @description Elimina/desactiva una plantilla operativa de la clínica
     */
    app.delete(`/${basePrefix}/template/:tpl_uuid`, authMiddleware, templateCtrl.deleteCtrl);
}

export default configureTemplateRoutes;
