import { AccountGroup } from "../enums/accountGroup";
import { AccountCompany } from "./accountCompany";
import { AccountLicence } from "./accountLicence";
import { ContactEdge } from "./contact";
import { Detail } from "./detail";
import { Model } from "./model";

export interface Customer extends Model {
    email: string | null;
    name: string | null;
    fullName: string | null;
    group: AccountGroup | null;
    contact: ContactEdge | null;
    licence: AccountLicence | null;
    company: AccountCompany | null;
    details: Details<Detail> | null;
    settings: ViewModelSet<Setting> | null;
    identifiers: IdentifiersModel<Customer> | null;
}