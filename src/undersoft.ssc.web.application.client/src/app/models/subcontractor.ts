import { AccountPersonal } from "./accountPersonal";
import { Detail } from "./detail";
import { AccountIdentity } from "./accountIdentity";
import { Model } from "./model";
import { UserAccountIdentifier } from "./userAccountIdentifier";

export interface SubcontractorAccount extends Model {
    Email?: string;
    UserName?: string;
    FullName?: string;
    Group?: string;
    Contact?: any;
    Details?: Detail[];
    Identifiers?: UserAccountIdentifier[];
    Identity?: AccountIdentity;
    Comapny?: AccountPersonal;
}
