
// register form
export class registerModel {
    id: number;
    image:string;
    ImageExtn: string;
    username: string;
    email: string;
    gender:string;
    mobile: number;
    password: string;
    cpassword: string;
}

// register form
export class salesregisterModel {
    id: number;
    image: string;
    salesName: string;
    email: string;
    gender:string;
    mobile:string;
    adharcard:string;
    address:string;
    password: string;
    cpassword: string;
}
// product form
export class productModel {
    id: number;
    cid: string;
    cname: string;
    sid: string;
    sname: string;
    productname: string;
    description: string;
    price: number;
    image: string;
    ImageExtn: string;
    date: string;
}

export class categoryDataModel{
   cid:number;
   cname:string;
}

export class subcategoryDataModel{
   sid:number;
   sname:string;
   cid:number;
}

// client form
export class clientModel {
    id: number;
    clientName: string;
    email: string;
    contact: string;
    gender: any;
    address: string;
    street: string;
    cid: number;
    cname:string;
    sid:number;
    sname:string;
    cityid: number;
    cityname:string;
    postalCode: number;
}
 //activity
export class activityModel{
    aid:number;
   productId:number;
   productname:string;
   clientId:number;
   clientName:string;
   salesId:number;
   salesName:string;
   contact:number;
   address:string;
   latLong:string;
   appointmentDate:string;
}


export class countryModel{
    cid:number;
    cname:string;
}

export class stateModel{
    sid:number;
    sname:number;
    cid:number;
}

export class cityModel{
    cityid:number;
    cityname:string;
    sid:number;
}

// export class countryListModel{
//     cid:number;
//     cname:string;

//     sid:number;
//     sname:number;

//     cityid:number;
//     cityname:string;

// }