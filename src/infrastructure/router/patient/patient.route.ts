import { Express } from "express";
import { SequelizePatientRepository } from "../../repository/patient/sequelize-patient.repository";
import { PatientUseCase } from "../../../application/patient/patient-use-case";
import { PatientController } from "../../controller/patient/patient.controller";
import SocketAdapter from "../../services/socketAdapter";

function configurePatientRoutes(app: Express, socketAdapter?: SocketAdapter) {
    const sequelizePatientRepository = new SequelizePatientRepository();
    const patientUseCase = new PatientUseCase(sequelizePatientRepository);
    const patientCtrl = new PatientController(patientUseCase);

    app.get(`/${process.env.BASE_URL_API}/patients/:filter?/:page?/:perPage?`, patientCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/patient/:pat_uuid`, patientCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/patient`, patientCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/patient/:pat_uuid`, patientCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/patient/:pat_uuid`, patientCtrl.deleteCtrl);
}

export default configurePatientRoutes;
