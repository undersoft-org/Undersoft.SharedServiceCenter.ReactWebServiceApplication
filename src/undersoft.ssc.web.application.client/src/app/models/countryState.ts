import { Model } from "./model";

export interface CountryStateEdge extends Model {
    name: string | null;
    stateCode: string | null;
    timeZone: string | null;
}