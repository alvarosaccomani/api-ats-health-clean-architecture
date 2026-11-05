import { Request, Response } from "express";
import { SystemTemplateUseCase } from "../../../application/system-template/system-template-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class SystemTemplateController {
    constructor(private systemTemplateUseCase: SystemTemplateUseCase, private socketAdapter?: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getByIdCtrl = this.getByIdCtrl.bind(this);
        this.getByCodeCtrl = this.getByCodeCtrl.bind(this);
        this.getByItemCtrl = this.getByItemCtrl.bind(this);
        this.createCtrl = this.createCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const list = await this.systemTemplateUseCase.getSystemTemplates();
            return res.status(200).json({
                success: true,
                message: "Plantillas del sistema retornadas.",
                data: list
            });
        } catch (error: any) {
            console.error("Error en getAllCtrl (SystemTemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron recuperar las plantillas del sistema.",
                error: error.message
            });
        }
    }

    public async getByIdCtrl(req: Request, res: Response) {
        try {
            const tplsys_uuid = req.params.tplsys_uuid;
            const item = await this.systemTemplateUseCase.getSystemTemplateById(tplsys_uuid);
            return res.status(200).json({
                success: true,
                message: "Plantilla del sistema retornada.",
                data: item
            });
        } catch (error: any) {
            console.error("Error en getByIdCtrl (SystemTemplateController):", error.message);
            return res.status(404).json({
                success: false,
                message: "No se encontró la plantilla del sistema.",
                error: error.message
            });
        }
    }

    public async getByCodeCtrl(req: Request, res: Response) {
        try {
            const tplsys_code = req.params.tplsys_code;
            const item = await this.systemTemplateUseCase.getSystemTemplateByCode(tplsys_code);
            return res.status(200).json({
                success: true,
                message: "Plantilla del sistema retornada.",
                data: item
            });
        } catch (error: any) {
            console.error("Error en getByCodeCtrl (SystemTemplateController):", error.message);
            return res.status(404).json({
                success: false,
                message: "No se encontró la plantilla del sistema con ese código.",
                error: error.message
            });
        }
    }

    public async getByItemCtrl(req: Request, res: Response) {
        try {
            const itm_uuid = req.params.itm_uuid;
            const list = await this.systemTemplateUseCase.getSystemTemplatesByItem(itm_uuid);
            return res.status(200).json({
                success: true,
                message: "Plantillas del sistema por especialidad retornadas.",
                data: list
            });
        } catch (error: any) {
            console.error("Error en getByItemCtrl (SystemTemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron recuperar las plantillas de la especialidad.",
                error: error.message
            });
        }
    }

    public async createCtrl(req: Request, res: Response) {
        try {
            const created = await this.systemTemplateUseCase.createSystemTemplate(req.body);
            return res.status(201).json({
                success: true,
                message: "Plantilla del sistema creada con éxito.",
                data: created
            });
        } catch (error: any) {
            console.error("Error en createCtrl (SystemTemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo crear la plantilla del sistema.",
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const tplsys_uuid = req.params.tplsys_uuid;
            const updated = await this.systemTemplateUseCase.updateSystemTemplate(tplsys_uuid, req.body);
            return res.status(200).json({
                success: true,
                message: "Plantilla del sistema actualizada con éxito.",
                data: updated
            });
        } catch (error: any) {
            console.error("Error en updateCtrl (SystemTemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo actualizar la plantilla del sistema.",
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const tplsys_uuid = req.params.tplsys_uuid;
            const deleted = await this.systemTemplateUseCase.deleteSystemTemplate(tplsys_uuid);
            return res.status(200).json({
                success: true,
                message: "Plantilla del sistema eliminada con éxito.",
                data: deleted
            });
        } catch (error: any) {
            console.error("Error en deleteCtrl (SystemTemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo eliminar la plantilla del sistema.",
                error: error.message
            });
        }
    }
}
