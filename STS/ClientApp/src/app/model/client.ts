// client 
export class clientModel {
    id: number;
    // clientId:number;
    clientName: string;
    email: string;
    contact: string;
    gender: any;
    address: string;
    street: string;
    cid: number;
    cname: string;
    sid: number;
    sname: string;
    cityid: number;
    cityname: string;
    postalCode: number;
    isActive: boolean;

    createdby: number;
    modifiedby: number;
    latitude: number;
    longitude: number;
}

export class clientListModel {
    id: number;
    // clientId:number;
    clientName: string;
    email: string;
    contact: string;
    gender: any;
    address: string;
    street: string;
    cid: number;
    cname: string;
    sid: number;
    sname: string;
    cityid: number;
    cityname: string;
    postalCode: number;
    isActive: boolean;
    userid: number;
    latitude: number;
    longitude: number;

    createdby: number;
    modifiedby: number;

    pageSize: number;
    pageIndex: number;
    search: string;
}

export class paginationModel {

    pageSize: number;
    pageIndex: number;
}