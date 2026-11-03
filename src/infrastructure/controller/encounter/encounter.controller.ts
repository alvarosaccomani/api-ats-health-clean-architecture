import { Request, Response } from "express";
import { EncounterUseCase } from "../../../application/encounter/encounter-use-case";

export class EncounterController {
    constructor(private encounterUseCase: EncounterUseCase) {
        this.createCtrl = this.createCtrl.bind(this);
        this.getByIdCtrl = this.getByIdCtrl.bind(this);
        this.getByPatientCtrl = this.getByPatientCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
    }

    public async createCtrl(req: Request, res: Response) {
        try {
            const body = req.body;
            // Si el token JWT tiene el usuario autenticado y no vino en el body
            const practitionerUuid = body.usr_uuid_practitioner || (req as any).user?.usr_uuid || (req as any).user?.sub;

            const payload = {
                ...body,
                usr_uuid_practitioner: practitionerUuid
            };

            const created = await this.encounterUseCase.createEncounter(payload);

            return res.status(201).json({
                success: true,
                message: "Consulta médica guardada con éxito.",
                data: created
            });
        } catch (error: any) {
            console.error("Error en createCtrl (EncounterController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo registrar la consulta médica.",
                error: error.message
            });
        }
    }

    public async getByIdCtrl(req: Request, res: Response) {
        try {
            const enc_uuid = req.params.enc_uuid;
            const cmp_uuid = (req.query.cmp_uuid as string) || (req.headers['x-company-uuid'] as string);

            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido como query param o header x-company-uuid."
                });
            }

            const encounter = await this.encounterUseCase.getEncounterById(cmp_uuid, enc_uuid);

            return res.status(200).json({
                success: true,
                message: "Consulta médica recuperada.",
                data: encounter
            });
        } catch (error: any) {
            console.error("Error en getByIdCtrl (EncounterController):", error.message);
            return res.status(404).json({
                success: false,
                message: "No se encontró la consulta médica.",
                error: error.message
            });
        }
    }

    public async getByPatientCtrl(req: Request, res: Response) {
        try {
            const pat_uuid = req.params.pat_uuid;
            const cmp_uuid = (req.query.cmp_uuid as string) || (req.headers['x-company-uuid'] as string);

            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido como query param o header x-company-uuid."
                });
            }

            const encounters = await this.encounterUseCase.getEncountersByPatient(cmp_uuid, pat_uuid);

            return res.status(200).json({
                success: true,
                message: "Historial de consultas del paciente retornado.",
                data: encounters
            });
        } catch (error: any) {
            console.error("Error en getByPatientCtrl (EncounterController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo recuperar el historial de consultas.",
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const enc_uuid = req.params.enc_uuid;
            const cmp_uuid = req.body.cmp_uuid || (req.query.cmp_uuid as string);

            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido para actualizar la consulta médica."
                });
            }

            const updated = await this.encounterUseCase.updateEncounter(cmp_uuid, enc_uuid, req.body);

            return res.status(200).json({
                success: true,
                message: "Consulta médica actualizada con éxito.",
                data: updated
            });
        } catch (error: any) {
            console.error("Error en updateCtrl (EncounterController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo actualizar la consulta médica.",
                error: error.message
            });
        }
    }
}
