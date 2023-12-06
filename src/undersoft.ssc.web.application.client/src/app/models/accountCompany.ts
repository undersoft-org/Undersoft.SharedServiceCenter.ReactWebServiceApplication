import { Model } from "./model";

export interface AccountCompany extends Model {
    taxId: string | null;
    companySize: string | null;
    revenue: string | null;
}