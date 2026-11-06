import { CompanyEntity, CompanyUpdateData } from "./company.entity";

export interface CompanyRepository {
    getCompanies(options?: { transaction?: any }): Promise<CompanyEntity[] | null>;
    findCompanyById(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyEntity | null>;
    createCompany(company: CompanyEntity, options?: { transaction?: any }): Promise<CompanyEntity | null>;
    updateCompany(cmp_uuid: string, company: CompanyUpdateData, options?: { transaction?: any }): Promise<CompanyEntity | null>;
    deleteCompany(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyEntity | null>;
    findCompanyByName(cmp_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<CompanyEntity | null>;
    getFeaturedCompanies?(options?: { transaction?: any }): Promise<CompanyEntity[] | null>;
}
