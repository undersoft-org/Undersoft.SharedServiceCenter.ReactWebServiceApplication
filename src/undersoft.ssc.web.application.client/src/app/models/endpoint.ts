import { Model } from "./model";

export interface EndpointEdge extends Model {
    host: string | null;
    iP: string | null;
    port: number | null;
    uRI: string | null;
}