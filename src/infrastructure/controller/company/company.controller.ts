import { Request, Response } from "express";
import { CompanyUseCase } from "../../../application/company/company-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CompanyController {
    constructor(private companyUseCase: CompanyUseCase, private socketAdapter?: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);
            const companies = await this.companyUseCase.getCompanies();

            if (page && perPage) {
                return res.status(200).json({
                    success: true,
                    message: 'Empresas retornadas.',
                    ...paginator(companies, page, perPage)
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Empresas retornadas.',
                    data: companies
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (company controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las empresas.',
                error: error.message
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la empresa.',
                    error: 'Debe proporcionar un Id de empresa válido.'
                });
            }
            const company = await this.companyUseCase.getDetailCompany(cmp_uuid);
            return res.status(200).json({
                success: true,
                message: 'Empresa retornada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en getCtrl (company controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la empresa.',
                error: error.message
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_name = body.cmp_name;
            if (!cmp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la empresa.',
                    error: 'Debe proporcionar un Nombre para la empresa.'
                });
            }
            const companyByName = await this.companyUseCase.findCompanyByName(cmp_name);
            if (companyByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la empresa.',
                    error: `El nombre ${cmp_name} de empresa ya existe.`
                });
            }
            const company = await this.companyUseCase.createCompany(body);
            return res.status(201).json({
                success: true,
                message: 'Empresa insertada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (company controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la empresa.',
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const update = req.body;
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la empresa.',
                    error: 'Debe proporcionar un Id de empresa.'
                });
            }
            if (update.cmp_name) {
                const companyByName = await this.companyUseCase.findCompanyByName(update.cmp_name, cmp_uuid);
                if (companyByName) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se pudo actualizar la empresa.',
                        error: `El nombre ${update.cmp_name} de empresa ya existe.`
                    });
                }
            }
            const company = await this.companyUseCase.updateCompany(cmp_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Empresa actualizada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (company controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la empresa.',
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la empresa.',
                    error: 'Debe proporcionar un Id de empresa.'
                });
            }
            const company = await this.companyUseCase.deleteCompany(cmp_uuid);
            return res.status(200).json({
                success: true,
                message: 'Empresa eliminada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (company controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la empresa.',
                error: error.message
            });
        }
    }
}
