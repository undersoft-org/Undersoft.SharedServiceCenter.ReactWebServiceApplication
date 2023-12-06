import { Model } from "./model";
import { UserAccount } from "./userAccount";


export interface UserAccountIdentifier extends Model {
    Entity?: UserAccount;
    EntityId?: number;
    IdKind?: string;
    Name?: string;
    Value?: string;
}

