import { Model } from "./model";


export interface AccountPersonal extends Model {
    FirstName?: string;
    SecondName?: string;
    LastName?: string;
    BirthDate?: string;
    Age?: number;
    Gender?: string;
}

