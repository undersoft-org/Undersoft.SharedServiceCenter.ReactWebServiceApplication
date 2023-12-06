import { Model } from "./model";

export interface CountryData extends Model {
    name: string | null;
    countryCode: string | null;
    continent: string | null;
    timeZone: string | null;
    currencyId: number | null;
    currency: CurrencyData | null;
    languageId: number | null;
    language: LanguageData | null;
    countryStates: DataObjects<CountryStateData> | null;
}