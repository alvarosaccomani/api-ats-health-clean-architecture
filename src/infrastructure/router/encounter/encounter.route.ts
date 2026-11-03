import { Express } from "express";
import { SequelizeEncounterRepository } from "../../repository/encounter/sequelize-encounter.repository";
import { EncounterUseCase } from "../../../application/encounter/encounter-use-case";
import { EncounterController } from "../../controller/encounter/encounter.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configureEncounterRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizeEncounterRepository = new SequelizeEncounterRepository();
    const encounterUseCase = new EncounterUseCase(sequelizeEncounterRepository);
    const encounterCtrl = new EncounterController(encounterUseCase);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @route POST /api/encounter
     * @description Guarda una consulta médica clínica (enc_Encounters, encd_EncounterData, enctr_EncounterTreatments)
     */
    app.post(`/${basePrefix}/encounter`, authMiddleware, encounterCtrl.createCtrl);

    /**
     * @route GET /api/encounters/patient/:pat_uuid
     * @description Obtiene el historial de consultas de un paciente en la clínica
     */
    app.get(`/${basePrefix}/encounters/patient/:pat_uuid`, authMiddleware, encounterCtrl.getByPatientCtrl);

    /**
     * @route GET /api/encounter/:enc_uuid
     * @description Obtiene los datos detallados de una consulta específica
     */
    app.get(`/${basePrefix}/encounter/:enc_uuid`, authMiddleware, encounterCtrl.getByIdCtrl);

    /**
     * @route PUT /api/encounter/:enc_uuid
     * @description Actualiza una consulta médica existente
     */
    app.put(`/${basePrefix}/encounter/:enc_uuid`, authMiddleware, encounterCtrl.updateCtrl);
}

export default configureEncounterRoutes;
