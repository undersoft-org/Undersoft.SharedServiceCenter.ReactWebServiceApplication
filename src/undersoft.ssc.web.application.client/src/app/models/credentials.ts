import { AccountIdentityClaim } from "./accountIdentityClaim";
import { AccountIdentityRole } from "./accountIdentityRole";
import { IdentityUser } from "./identityUser";
import { Model } from "./model";

export interface Credentials extends Model {
    UserName?: string;
    Email?: string;
    Password?: string;
    PhoneNumber?: string;
    EmailConfirmed?: boolean;
    PhoneNumberConfirmed?: boolean;
    SessionToken?: string;
    ResetPasswordToken?: string;
    EmailConfirmationToken?: string;
    PhoneNumberConfirmationToken?: string;
}





