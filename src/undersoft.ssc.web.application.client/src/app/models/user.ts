import { AccountPersonal } from "./accountPersonal";
import { Detail } from "./detail";
import { AccountIdentity } from "./accountIdentity";
import { Model } from "./model";
import { UserAccountIdentifier } from "./userAccountIdentifier";

export interface UserAccount extends Model {
    Group?: string;
    Active: boolean;
    Locked: boolean;
    Contact?: any;
    Details?: Detail[];
    Identifiers?: UserAccountIdentifier[];
    Identity?: AccountIdentity;
    Personal?: AccountPersonal;
    IsAuthorized: boolean;
}
