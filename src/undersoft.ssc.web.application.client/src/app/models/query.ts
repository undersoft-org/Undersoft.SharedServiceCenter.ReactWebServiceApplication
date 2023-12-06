import { Model } from "./model";

export interface Query extends Model {

    Filter?: Filter[];
    Sort?: Sort[];
    
}

export interface Filter extends Model {
    Property?: string
    Operand?: string 
    Data?: string
    Value?: string
    Type?: string
    Logic?: string
}

export interface Sort extends Model {

    Direction?: string;
    Property?: string;
}