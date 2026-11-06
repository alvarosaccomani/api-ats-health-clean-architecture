import { Request, Response } from 'express';
import { CompanyMenuUseCase } from '../../../application/company-menu/company-menu-use-case';

export class CompanyMenuController {
    constructor(private readonly companyMenuUseCase: CompanyMenuUseCase) {
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getOverridesCtrl = this.getOverridesCtrl.bind(this);
    }

    public async insertCtrl(req: Request, res: Response) {
        try {
            const data = await this.companyMenuUseCase.createCompanyMenu(req.body);
            return res.status(201).json({
                success: true,
                message: 'Personalización de menú creada.',
                data
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (CompanyMenuController):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo crear la personalización de menú.',
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmpmnu_uuid } = req.params;
            const data = await this.companyMenuUseCase.updateCompanyMenu(cmpmnu_uuid, req.body);
            return res.status(200).json({
                success: true,
                message: 'Personalización de menú actualizada.',
                data
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (CompanyMenuController):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la personalización de menú.',
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmpmnu_uuid } = req.params;
            const data = await this.companyMenuUseCase.deleteCompanyMenu(cmpmnu_uuid);
            return res.status(200).json({
                success: true,
                message: 'Personalización de menú eliminada.',
                data
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (CompanyMenuController):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la personalización de menú.',
                error: error.message
            });
        }
    }

    public async getOverridesCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid } = req.params;
            const data = await this.companyMenuUseCase.getCompanyOverrides(cmp_uuid);
            return res.status(200).json({
                success: true,
                message: 'Personalizaciones de menú del consorcio retornadas.',
                data
            });
        } catch (error: any) {
            console.error('Error en getOverridesCtrl (CompanyMenuController):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las personalizaciones de menú.',
                error: error.message
            });
        }
    }
}
