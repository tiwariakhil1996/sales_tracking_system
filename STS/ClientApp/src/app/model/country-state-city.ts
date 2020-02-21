export class countryModel {
    cid: number;
    cname: string;
}

export class stateModel {
    sid: number;
    sname: number;
    cid: number;
}

export class cityModel {
    cityid: number;
    cityname: string;
    sid: number;
}