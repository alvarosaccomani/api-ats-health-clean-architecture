import { Request, Response } from "express";
import { CompanySettingUseCase } from "../../../application/company-setting/company-setting-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CompanySettingController {
    constructor(private companySettingUseCase: CompanySettingUseCase, private socketAdapter?: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las configuraciones de la empresa.',
                    error: 'Debe proporcionar un Id de empresa válido.'
                });
            }

            const companiesSettings = await this.companySettingUseCase.getCompaniesSettings(cmp_uuid);

            if (page && perPage) {
                return res.status(200).json({
                    success: true,
                    message: 'Configuraciones de empresa retornadas.',
                    ...paginator(companiesSettings, page, perPage)
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Configuraciones de empresa retornadas.',
                    data: companiesSettings
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (company setting controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las configuraciones de la empresa.',
                error: error.message
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cmps_uuid = req.params.cmps_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la configuración de la empresa.',
                    error: 'Debe proporcionar un Id de empresa válido.'
                });
            }
            if (!cmps_uuid || cmps_uuid.toLowerCase() === 'null' || cmps_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la configuración de la empresa.',
                    error: 'Debe proporcionar un Id de configuración válido.'
                });
            }

            const companySetting = await this.companySettingUseCase.getDetailCompanySetting(cmp_uuid, cmps_uuid);
            return res.status(200).json({
                success: true,
                message: 'Configuración de empresa retornada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en getCtrl (company setting controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la configuración de la empresa.',
                error: error.message
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, cmps_key } = body;
            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la configuración de la empresa.',
                    error: 'Debe proporcionar un Id de empresa válido.'
                });
            }
            if (!cmps_key) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la configuración de la empresa.',
                    error: 'Debe proporcionar una Clave (Key) para la configuración.'
                });
            }

            const companyByKey = await this.companySettingUseCase.findCompanySettingByKey(cmp_uuid, cmps_key);
            if (companyByKey) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la configuración de la empresa.',
                    error: `La clave ${cmps_key} de configuración ya existe para esta empresa.`
                });
            }

            const companySetting = await this.companySettingUseCase.createCompanySetting(body);
            return res.status(201).json({
                success: true,
                message: 'Configuración de empresa insertada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (company setting controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la configuración de la empresa.',
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cmps_uuid } = req.params;
            const update = req.body;

            if (!cmp_uuid || !cmps_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la configuración de la empresa.',
                    error: 'Debe proporcionar cmp_uuid y cmps_uuid válidos.'
                });
            }

            if (update.cmps_key) {
                const companyByKey = await this.companySettingUseCase.findCompanySettingByKey(cmp_uuid, update.cmps_key, cmps_uuid);
                if (companyByKey) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se pudo actualizar la configuración de la empresa.',
                        error: `La clave ${update.cmps_key} ya existe para esta empresa.`
                    });
                }
            }

            const companySetting = await this.companySettingUseCase.updateCompanySetting(cmp_uuid, cmps_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Configuración de empresa actualizada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (company setting controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la configuración de la empresa.',
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cmps_uuid } = req.params;
            if (!cmp_uuid || !cmps_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la configuración de la empresa.',
                    error: 'Debe proporcionar cmp_uuid y cmps_uuid válidos.'
                });
            }

            const companySetting = await this.companySettingUseCase.deleteCompanySetting(cmp_uuid, cmps_uuid);
            return res.status(200).json({
                success: true,
                message: 'Configuración de empresa eliminada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (company setting controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la configuración de la empresa.',
                error: error.message
            });
        }
    }
}
