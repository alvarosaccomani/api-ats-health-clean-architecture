import { Express } from "express";
import { SequelizePatientRepository } from "../../repository/patient/sequelize-patient.repository";
import { PatientUseCase } from "../../../application/patient/patient-use-case";
import { PatientController } from "../../controller/patient/patient.controller";
import SocketAdapter from "../../services/socketAdapter";

function configurePatientRoutes(app: Express, socketAdapter?: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizePatientRepository = new SequelizePatientRepository();

    /*
    *   Iniciar casos de uso
    */
    const patientUseCase = new PatientUseCase(sequelizePatientRepository);

    /*
    *   Iniciar controller
    */
    const patientCtrl = new PatientController(patientUseCase);

    /**
     * @swagger
     * /patients:
     *   get:
     *     tags:
     *       - Patients
     *     summary: Obtiene la lista de pacientes registrados
     *     description: Retorna una lista de todos los pacientes o página de pacientes registrados.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Operación exitosa. Retorna la lista de pacientes.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: Pacientes retornados.
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/PatientEntity'
     *       400:
     *         description: Error al obtener los pacientes.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       401:
     *         description: No autorizado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.get(`/${process.env.BASE_URL_API}/patients/:filter?/:page?/:perPage?`, patientCtrl.getAllCtrl);

    /**
     * @swagger
     * /patient/{pat_uuid}:
     *   get:
     *     tags:
     *       - Patients
     *     summary: Obtiene el detalle de un paciente por UUID
     *     description: Retorna la información completa del paciente especificado por su UUID.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: pat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID del paciente a consultar
     *     responses:
     *       200:
     *         description: Paciente encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: Paciente retornado.
     *                 data:
     *                   $ref: '#/components/schemas/PatientEntity'
     *       400:
     *         description: Error al obtener el paciente o UUID inválido.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       401:
     *         description: No autorizado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.get(`/${process.env.BASE_URL_API}/patient/:pat_uuid`, patientCtrl.getCtrl);

    /**
     * @swagger
     * /patient:
     *   post:
     *     tags:
     *       - Patients
     *     summary: Crear un nuevo paciente
     *     description: Registra un nuevo paciente en el sistema.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PatientInputDTO'
     *     responses:
     *       201:
     *         description: Paciente creado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: Paciente creado con éxito.
     *                 data:
     *                   $ref: '#/components/schemas/PatientEntity'
     *       400:
     *         description: Datos inválidos o error al registrar el paciente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.post(`/${process.env.BASE_URL_API}/patient`, patientCtrl.insertCtrl);

    /**
     * @swagger
     * /patient/{pat_uuid}:
     *   put:
     *     tags:
     *       - Patients
     *     summary: Actualizar datos de un paciente
     *     description: Modifica los datos de un paciente existente identificado por su UUID.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: pat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID del paciente a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PatientUpdateDTO'
     *     responses:
     *       200:
     *         description: Paciente actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: Paciente actualizado con éxito.
     *                 data:
     *                   $ref: '#/components/schemas/PatientEntity'
     *       400:
     *         description: Datos inválidos o error en la actualización.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.put(`/${process.env.BASE_URL_API}/patient/:pat_uuid`, patientCtrl.updateCtrl);

    /**
     * @swagger
     * /patient/{pat_uuid}:
     *   delete:
     *     tags:
     *       - Patients
     *     summary: Eliminar un paciente
     *     description: Da de baja al paciente correspondiente al UUID provisto.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: pat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID del paciente a eliminar
     *     responses:
     *       200:
     *         description: Paciente eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: Paciente eliminado con éxito.
     *                 data:
     *                   $ref: '#/components/schemas/PatientEntity'
     *       400:
     *         description: Error al eliminar el paciente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.delete(`/${process.env.BASE_URL_API}/patient/:pat_uuid`, patientCtrl.deleteCtrl);
}

export default configurePatientRoutes;
