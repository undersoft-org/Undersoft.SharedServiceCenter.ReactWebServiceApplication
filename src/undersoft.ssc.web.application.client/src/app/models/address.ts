export interface AddressEdge extends Entity {
    cityName: string | null;
    streetName: string | null;
    buildingNumber: string | null;
    apartmentNumber: string | null;
    postcode: string | null;
    notices: string | null;
    addressType: AddressType | null;
    countryId: number | null;
    country: CountryEdge | null;
    stateId: number | null;
    countryState: CountryStateEdge | null;
}