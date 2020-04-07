export class chatModel {
    adminId: number;
    adminname: string;
    salesId: number;
    salesname: string;
    salesName: string;
    msg: string;
    createdon: string;
    createdby: number;
    createddate: Date;
    createdtime: string;
    isonline: boolean;
}


export class userModel {
    id: number;
    adminId: number;
    salesId: number;
    salesName: string;
    msg: string;
    createdon: string;
    createdby: number;
    isonline:boolean;
}