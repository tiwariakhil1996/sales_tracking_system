
// activity

export class activityModel {
    aid: number;
    title: string;
    description: string;
    productId: number;
    productname: string;
    clientId: number;
    clientName: string;
    salesId: number;
    salesName: string;
    contact: String;
    address: string;
    latitude: string;
    longitude: string;
    appointmentDate: string;

    createdby: number;
    modifiedby: number;
    userid: number;

    followup_description: string;
    user_id: number;
    status: number;
    statusname: string;
    price:string;

}
export class ActivityhistoryModel{
    id:number;
    Aid:number;
    Users_id:number;
    Old_status:number;
    New_status:number;
}


