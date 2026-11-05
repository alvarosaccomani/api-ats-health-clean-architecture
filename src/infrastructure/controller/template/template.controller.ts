import { Request, Response } from "express";
import { TemplateUseCase } from "../../../application/template/template-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class TemplateController {
    constructor(private templateUseCase: TemplateUseCase, private socketAdapter?: SocketAdapter) {
        this.getByCompanyCtrl = this.getByCompanyCtrl.bind(this);
        this.getByIdCtrl = this.getByIdCtrl.bind(this);
        this.getByCodeCtrl = this.getByCodeCtrl.bind(this);
        this.getByItemCtrl = this.getByItemCtrl.bind(this);
        this.createCtrl = this.createCtrl.bind(this);
        this.cloneCtrl = this.cloneCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    private extractCompanyUuid(req: Request): string | null {
        return (req.query.cmp_uuid as string) || 
               (req.headers['x-company-uuid'] as string) || 
               req.body.cmp_uuid || 
               null;
    }

    public async getByCompanyCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido como query param o header x-company-uuid."
                });
            }

            const list = await this.templateUseCase.getTemplatesByCompany(cmp_uuid);
            return res.status(200).json({
                success: true,
                message: "Plantillas de la clínica recuperadas.",
                data: list
            });
        } catch (error: any) {
            console.error("Error en getByCompanyCtrl (TemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron recuperar las plantillas de la clínica.",
                error: error.message
            });
        }
    }

    public async getByIdCtrl(req: Request, res: Response) {
        try {
            const tpl_uuid = req.params.tpl_uuid;
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido como query param o header x-company-uuid."
                });
            }

            const item = await this.templateUseCase.getTemplateById(cmp_uuid, tpl_uuid);
            return res.status(200).json({
                success: true,
                message: "Plantilla de la clínica recuperada.",
                data: item
            });
        } catch (error: any) {
            console.error("Error en getByIdCtrl (TemplateController):", error.message);
            return res.status(404).json({
                success: false,
                message: "No se encontró la plantilla para esta clínica.",
                error: error.message
            });
        }
    }

    public async getByCodeCtrl(req: Request, res: Response) {
        try {
            const tpl_code = req.params.tpl_code;
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido como query param o header x-company-uuid."
                });
            }

            const item = await this.templateUseCase.getTemplateByCode(cmp_uuid, tpl_code);
            return res.status(200).json({
                success: true,
                message: "Plantilla de la clínica recuperada por código.",
                data: item
            });
        } catch (error: any) {
            console.error("Error en getByCodeCtrl (TemplateController):", error.message);
            return res.status(404).json({
                success: false,
                message: "No se encontró la plantilla con ese código.",
                error: error.message
            });
        }
    }

    public async getByItemCtrl(req: Request, res: Response) {
        try {
            const itm_uuid = req.params.itm_uuid;
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido como query param o header x-company-uuid."
                });
            }

            const list = await this.templateUseCase.getTemplatesByItem(cmp_uuid, itm_uuid);
            return res.status(200).json({
                success: true,
                message: "Plantillas de la especialidad recuperadas.",
                data: list
            });
        } catch (error: any) {
            console.error("Error en getByItemCtrl (TemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudieron recuperar las plantillas de la especialidad.",
                error: error.message
            });
        }
    }

    public async createCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido."
                });
            }

            const payload = {
                ...req.body,
                cmp_uuid
            };

            const created = await this.templateUseCase.createTemplate(payload);
            return res.status(201).json({
                success: true,
                message: "Plantilla personalizada creada con éxito.",
                data: created
            });
        } catch (error: any) {
            console.error("Error en createCtrl (TemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo crear la plantilla.",
                error: error.message
            });
        }
    }

    public async cloneCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido."
                });
            }

            const payload = {
                ...req.body,
                cmp_uuid
            };

            const cloned = await this.templateUseCase.cloneFromSystemTemplate(payload);
            return res.status(201).json({
                success: true,
                message: "Plantilla clonada con éxito desde el blueprint oficial.",
                data: cloned
            });
        } catch (error: any) {
            console.error("Error en cloneCtrl (TemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo clonar la plantilla del sistema.",
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const tpl_uuid = req.params.tpl_uuid;
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido."
                });
            }

            const updated = await this.templateUseCase.updateTemplate(cmp_uuid, tpl_uuid, req.body);
            return res.status(200).json({
                success: true,
                message: "Plantilla actualizada con éxito.",
                data: updated
            });
        } catch (error: any) {
            console.error("Error en updateCtrl (TemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo actualizar la plantilla.",
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const tpl_uuid = req.params.tpl_uuid;
            const cmp_uuid = this.extractCompanyUuid(req);
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "cmp_uuid es requerido."
                });
            }

            const deleted = await this.templateUseCase.deleteTemplate(cmp_uuid, tpl_uuid);
            return res.status(200).json({
                success: true,
                message: "Plantilla eliminada con éxito.",
                data: deleted
            });
        } catch (error: any) {
            console.error("Error en deleteCtrl (TemplateController):", error.message);
            return res.status(400).json({
                success: false,
                message: "No se pudo eliminar la plantilla.",
                error: error.message
            });
        }
    }
}
