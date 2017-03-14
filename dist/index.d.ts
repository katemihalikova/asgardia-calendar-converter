export interface Datum {
    day: number;
    month: number;
    year: number;
}
export declare function isGregorianYearLeap(year: number): boolean;
export declare function isAsgardianYearLeap(year: number): boolean;
export declare function toAsgardian({day, month, year}: Datum, mode: "non" | "feb" | "jun"): Datum;
export declare function toGregorian({day, month, year}: Datum, mode: "non" | "feb" | "jun"): Datum;
