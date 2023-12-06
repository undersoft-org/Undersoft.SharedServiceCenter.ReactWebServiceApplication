import { Detail } from "./detail";

export interface AccountLicence extends Detail {
    security: string | null;
    alarm: string | null;
}