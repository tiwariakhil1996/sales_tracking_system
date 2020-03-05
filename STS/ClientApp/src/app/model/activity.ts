
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
    // address: string;
    // latitude: string;
    // longitude: string;
    appointmentDate: string;
    createdby: number;
    modifiedby: number;
    userid: number;
    followup_description: string;
    user_id: number;
    status: number;
    statusname: string;
    productList: addproductListingModel[];
}

export class addproductListingModel {
    productId: number;
    productname: string;
    price: number;
    quantity: number;
    amount: number;
    discount_per: number;
    discount_amt: number;
    total_price: number;
}


// export class activityList_while_addingModel {
//     image: string;
//     ImageExtn: string;
//     productId: number;
//     productname: string;
//     price: number;
//     quantity: number;
//     amount: string;
//     discount_per: string;
//     discount_amt: string;
//     total_price: string;
// }


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

    createdby: number;
    modifiedby: number;

    latitude: any;
    longitude: any;
    userid: number;

    followup_description: string;
    user_id: number;
    status: number;
    statusname: string;
}

export class LocationModel {

    // Sales Location
    latitude: any;
    longitude: any;

    // Client Location
    lat: any;
    lng: any;
}

export class sales_Location_Model {
    // Sales Location
    userId: number;
    latitude: any;
    longitude: any;
    image: string;

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