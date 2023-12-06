import { AccountPersonal } from "./accountPersonal";
import { Detail } from "./detail";
import { Model } from "./model";
import { AccountGroup } from "../enums/accountGroup";
import { Identifier } from "./Identifier";

export interface Account extends Model {
    Group?: AccountGroup;
    Contact?: any;
    Details?: Detail[];
    Identifiers?: Identifier<Account>[];
}
