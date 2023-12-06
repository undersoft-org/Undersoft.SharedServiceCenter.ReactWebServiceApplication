export interface CurrencyEdge extends Entity {
    name: string | null;
    currencyCode: string | null;
    rate: number;
}