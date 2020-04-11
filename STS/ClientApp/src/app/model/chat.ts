export class chatModel {
    id: number;
    adminId: number;
    adminname: string;
    salesId: number;
    salesname: string;
    salesName: string;
    senderId: number;
    receiverId: number;
    msg: string;
    createdon: string;
    createdby: number;
    createddate: Date;
    createdtime: string;
    isonline: boolean;

seen: boolean;
status: string;

modifiedby:number;
    senderType: number;
    // clientuniqueid: string;
    // type: string;
    // message: string;
    // date: Date;
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