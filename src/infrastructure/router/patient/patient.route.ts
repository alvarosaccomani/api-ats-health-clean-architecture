import { Express } from "express";
import { SequelizePatientRepository } from "../../repository/patient/sequelize-patient.repository";
import { PatientUseCase } from "../../../application/patient/patient-use-case";
import { PatientController } from "../../controller/patient/patient.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import SocketAdapter from "../../services/socketAdapter";

function configurePatientRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizePatientRepository = new SequelizePatientRepository();
    const patientUseCase = new PatientUseCase(sequelizePatientRepository);
    const patientCtrl = new PatientController(patientUseCase);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @swagger
     * /patients:
     *   get:
     *     tags:
     *       - Patients
     *     summary: Obtiene la lista de pacientes registrados
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/patients/:filter?/:page?/:perPage?`, authMiddleware, patientCtrl.getAllCtrl);

    /**
     * @swagger
     * /patient/{pat_uuid}:
     *   get:
     *     tags:
     *       - Patients
     *     summary: Obtiene el detalle de un paciente por UUID
     *     security:
     *       - bearerAuth: []
     */
    app.get(`/${basePrefix}/patient/:pat_uuid`, authMiddleware, patientCtrl.getCtrl);

    /**
     * @swagger
     * /patient:
     *   post:
     *     tags:
     *       - Patients
     *     summary: Crear un nuevo paciente
     *     security:
     *       - bearerAuth: []
     */
    app.post(`/${basePrefix}/patient`, authMiddleware, patientCtrl.insertCtrl);

    /**
     * @swagger
     * /patient/{pat_uuid}:
     *   put:
     *     tags:
     *       - Patients
     *     summary: Actualizar datos de un paciente
     *     security:
     *       - bearerAuth: []
     */
    app.put(`/${basePrefix}/patient/:pat_uuid`, authMiddleware, patientCtrl.updateCtrl);

    /**
     * @swagger
     * /patient/{pat_uuid}:
     *   delete:
     *     tags:
     *       - Patients
     *     summary: Eliminar un paciente
     *     security:
     *       - bearerAuth: []
     */
    app.delete(`/${basePrefix}/patient/:pat_uuid`, authMiddleware, patientCtrl.deleteCtrl);
}

export default configurePatientRoutes;
