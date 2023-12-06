import { AddressEdge } from "./address";
import { EndpointEdge } from "./endpoint";
import { Model } from "./model";

export interface ContactEdge extends Model {
    name: string | null;
    localeType: LocaleType;
    email: string | null;
    phoneType: PhoneType;
    phoneNumber: string | null;
    notices: string | null;
    addresses: AddressEdge[];
    endpoints: EndpointEdge[] | null;
}

export enum LocaleType {
    Main,
    Private,
    Bussines,
    Additional
}

export enum PhoneType {
    Main,
    Personal,
    Bussines,
    Fax
}