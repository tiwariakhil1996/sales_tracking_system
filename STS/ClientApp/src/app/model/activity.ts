
// activity

export class addactivityModel {
    aid: number;
    title: string;
    description: string;
    clientId: number;
    clientName: string;
    salesId: number;
    salesName: string;
    contact: String;
    appointmentDate: string;
    createdby: number;
    modifiedby: number;
    userid: number;
    followup_description: string;
    user_id: number;
    status: number;
    statusname: string;
    grand_total: number;
    advance_payment: number;
    payment_mode: number;
    pending_amount: number;
    productList: addproductListingModel[];
}

export class addproductListingModel {
    productId: number;
    price: number;
    quantity: number;
    amount: number;
    discount_per: number;
    discount_amt: number;
    total_price: number;

}


export class updateproductListingModel {
    productList: addproductListingModel[];
    modifiedby: number;
}


export class activityModel {
    aid: number;
    title: string;
    description: string;
    clientId: number;
    clientName: string;
    salesId: number;
    salesName: string;
    contact: String;
    address: string;
    appointmentDate: string;
    productId: number;
    productname: string;
    price: number;
    quantity: number;
    amount: string;
    discount_per: string;
    discount_amt: string;
    total_price: string;
    pendingamount: number;
    advancepay: number;
    paydue: number;
    payment_mode: string;
    createdby: number;
    modifiedby: number;
    latitude: any;
    longitude: any;
    userid: number;

    followup_description: string;
    user_id: number;
    pendingId: number;
    status: number;
    statusname: string;

    pageIndex: number;
    pageSize: number;
    search: string;
    from_date: string;
    to_date: string;
    description_on_Followup: string;
}

export class LocationModel {

    // Sales Location
    // latitude: any;
    // longitude: any;
    latitude: number;
    longitude: number;

    // Client Location
    // lat: any;
    // lng: any;
    lat: number;
    lng: number;
    salesname: string;
    salesimage: string;
    salescontact: string;
    clientname: string;
    clientimage: string;
    clientcontact: string;
    clientaddress: string;

}

export class sales_Location_Model {
    // Sales Location
    userId: number;
    // latitude: any;
    // longitude: any;
    salesname: string;
    latitude: number;
    longitude: number;
    image: string;
    mobile: string;

}

export class updateactivityModel {
    aid: number;
    // title: string;
    // description: string;
    // clientId: number;
    // clientName: string;
    // salesId: number;
    // salesName: string;
    // contact: String;
    // address: string;
    // appointmentDate: string;
    order_Id: number;
    productId: number;
    productname: string;
    price: number;
    quantity: number;
    amount: string;
    discount_per: string;
    discount_amt: string;
    total_price: string;

    createdby: number;
    modifiedby: number;
    // userid: number;

    // user_id: number;
    advance_payment: number;
    payment_mode: number;
    pending_amount: number;
}

export class newactivityModel {
    aid: number;
    user_id: number;
}

export class latestactivityModel {
    aid: number;
}


export class searchModel {
    aid: number;
    title: string;
    description: string;
    clientId: number;
    clientName: string;
    salesId: number;
    salesName: string;
    contact: String;
    appointmentDate: string;
}

export class paginationModel {

    pageSize: number;
    pageIndex: number;
}




export class activityDetailsModel {
    aid: number;
    title: string;
    description: string;
    clientName: string;
    contact: String;
    address: string;
    email: string;
    createdon: string;
    appointmentDate: string;
    pending_amount: number;
    advancepay: number;

    activityproduct: updateactivityModel[] = [];
    constructor() {
        this.activityproduct.push(new updateactivityModel());   
    }

}