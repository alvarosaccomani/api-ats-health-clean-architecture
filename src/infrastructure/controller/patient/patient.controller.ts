import { Request, Response } from "express";
import { PatientUseCase } from "../../../application/patient/patient-use-case";
import { paginator } from "../../services/paginator.service";

export class PatientController {
    constructor(private patientUseCase: PatientUseCase) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = req.params.page ? parseInt(req.params.page) : null;
            const perPage = req.params.perPage ? parseInt(req.params.perPage) : null;

            if (page && perPage) {
                const patients = await this.patientUseCase.getPatients();
                return res.status(200).send({
                    success: true,
                    message: "Pacientes retornados.",
                    ...paginator(patients, page, perPage)
                });
            } else {
                const patients = await this.patientUseCase.getPatients();
                return res.status(200).send({
                    success: true,
                    message: "Pacientes retornados.",
                    data: patients
                });
            }
        } catch (error: any) {
            console.error("Error en getAllCtrl (controller):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo recuperar los pacientes.",
                error: error.message
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const pat_uuid = req.params.pat_uuid;
            if (!pat_uuid || pat_uuid.toLowerCase() === "null" || pat_uuid.toLowerCase() === "undefined") {
                return res.status(400).json({
                    success: false,
                    message: "No se pudo recuperar el paciente.",
                    error: "UUID inválido"
                });
            }

            const patient = await this.patientUseCase.getDetailPatient(pat_uuid);
            return res.status(200).send({
                success: true,
                message: "Paciente retornado.",
                data: patient
            });
        } catch (error: any) {
            console.error("Error en getCtrl (controller):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo recuperar el paciente.",
                error: error.message
            });
        }
    }

    public async insertCtrl(req: Request, res: Response) {
        try {
            const patient = await this.patientUseCase.createPatient(req.body);
            return res.status(201).send({
                success: true,
                message: "Paciente creado con éxito.",
                data: patient
            });
        } catch (error: any) {
            console.error("Error en insertCtrl (controller):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo registrar el paciente.",
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const pat_uuid = req.params.pat_uuid;
            const patient = await this.patientUseCase.updatePatient(pat_uuid, req.body);
            return res.status(200).send({
                success: true,
                message: "Paciente actualizado con éxito.",
                data: patient
            });
        } catch (error: any) {
            console.error("Error en updateCtrl (controller):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo actualizar el paciente.",
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const pat_uuid = req.params.pat_uuid;
            const patient = await this.patientUseCase.deletePatient(pat_uuid);
            return res.status(200).send({
                success: true,
                message: "Paciente eliminado con éxito.",
                data: patient
            });
        } catch (error: any) {
            console.error("Error en deleteCtrl (controller):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo eliminar el paciente.",
                error: error.message
            });
        }
    }
}
