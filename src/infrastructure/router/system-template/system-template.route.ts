import { Express } from "express";
import { SequelizeSystemTemplateRepository } from "../../repository/system-template/sequelize-system-template.repository";
import { SystemTemplateUseCase } from "../../../application/system-template/system-template-use-case";
import { SystemTemplateController } from "../../controller/system-template/system-template.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureSystemTemplateRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeSystemTemplateRepository = new SequelizeSystemTemplateRepository();
    const systemTemplateUseCase = new SystemTemplateUseCase(sequelizeSystemTemplateRepository);
    const systemTemplateCtrl = new SystemTemplateController(systemTemplateUseCase, socketAdapter);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @route GET /api/system-templates
     * @description Obtiene todas las plantillas maestras globales del sistema
     */
    app.get(`/${basePrefix}/system-templates`, authMiddleware, systemTemplateCtrl.getAllCtrl);

    /**
     * @route GET /api/system-template/:tplsys_uuid
     * @description Obtiene el detalle de una plantilla del sistema por UUID
     */
    app.get(`/${basePrefix}/system-template/:tplsys_uuid`, authMiddleware, systemTemplateCtrl.getByIdCtrl);

    /**
     * @route GET /api/system-template/code/:tplsys_code
     * @description Obtiene una plantilla del sistema por su código único
     */
    app.get(`/${basePrefix}/system-template/code/:tplsys_code`, authMiddleware, systemTemplateCtrl.getByCodeCtrl);

    /**
     * @route GET /api/system-templates/item/:itm_uuid
     * @description Obtiene las plantillas oficiales de una especialidad (itm_Items)
     */
    app.get(`/${basePrefix}/system-templates/item/:itm_uuid`, authMiddleware, systemTemplateCtrl.getByItemCtrl);

    /**
     * @route POST /api/system-template
     * @description Crea una nueva plantilla oficial del sistema (SysAdmin)
     */
    app.post(`/${basePrefix}/system-template`, authMiddleware, systemTemplateCtrl.createCtrl);

    /**
     * @route PUT /api/system-template/:tplsys_uuid
     * @description Actualiza una plantilla oficial del sistema (SysAdmin)
     */
    app.put(`/${basePrefix}/system-template/:tplsys_uuid`, authMiddleware, systemTemplateCtrl.updateCtrl);

    /**
     * @route DELETE /api/system-template/:tplsys_uuid
     * @description Elimina una plantilla del sistema (SysAdmin)
     */
    app.delete(`/${basePrefix}/system-template/:tplsys_uuid`, authMiddleware, systemTemplateCtrl.deleteCtrl);
}

export default configureSystemTemplateRoutes;
