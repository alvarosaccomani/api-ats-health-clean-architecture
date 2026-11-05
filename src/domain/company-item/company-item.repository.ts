import { CompanyItemEntity } from "./company-item.entity";

export interface CompanyItemRepository {
    getCompanyItems(cmp_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity[] | null>;
    findCompanyItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity | null>;
    createCompanyItem(companyItem: CompanyItemEntity, options?: { transaction?: any }): Promise<CompanyItemEntity | null>;
    updateCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, companyItem: CompanyItemEntity, options?: { transaction?: any }): Promise<CompanyItemEntity | null>;
    deleteCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity | null>;
    existCompanyItem(cmp_uuid: string, itm_uuid: string, options?: { transaction?: any }): Promise<CompanyItemEntity | null>;
}
