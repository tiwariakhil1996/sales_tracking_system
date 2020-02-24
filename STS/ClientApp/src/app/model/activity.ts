
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
    productList: addproductListingModel[];
}

export class addproductListingModel {
    productId: number;
    productname: string;
    price: number;
    quantity: number;
    amount: string;
    discount_per: string;
    discount_amt: string;
    total_price: string;
}
export class activityList_while_addingModel {
    image: string;
    ImageExtn: string;
    productId: number;
    productname: string;
    price: number;
    quantity: number;
    amount: string;
    discount_per: string;
    discount_amt: string;
    total_price: string;
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
    
    createdby: number;
    modifiedby: number;
    userid: number;

    followup_description: string;
    user_id: number;
    status: number;
    statusname: string;
}

export class updateactivityModel {
    // aid: number;
    // title: string;
    // description: string;
    // clientId: number;
    // clientName: string;
    // salesId: number;
    // salesName: string;
    // contact: String;
    // address: string;
    // appointmentDate: string;
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
    userid: number;

    user_id: number;

}

export class newactivityModel {
    aid: number;
    user_id: number;
}

export class latestactivityModel {
    aid: number;

}