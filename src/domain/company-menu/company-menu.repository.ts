import { CompanyMenuEntity } from "./company-menu.entity";

export interface CompanyMenuRepository {
  createCompanyMenu(data: CompanyMenuEntity, options?: { transaction?: any }): Promise<CompanyMenuEntity | null>;
  updateCompanyMenu(cmpmnu_uuid: string, data: Partial<CompanyMenuEntity>, options?: { transaction?: any }): Promise<CompanyMenuEntity | null>;
  deleteCompanyMenu(cmpmnu_uuid: string, options?: { transaction?: any }): Promise<CompanyMenuEntity | null>;
  getCompanyOverrides(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyMenuEntity[] | null>;
  findOverrideById(cmpmnu_uuid: string, options?: { transaction?: any }): Promise<CompanyMenuEntity | null>;
}
