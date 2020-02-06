
// register admin form
export class registerModel {
    id: number;
    image:string;
    ImageExtn: string;
    username: string;
    email: string;
    gender:string;
    mobile: string;
    password: string;
    cpassword: string;
}

// register sales form
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
    cid: number;
    cname: string;
    sid: number;
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
   isActive:boolean;
}

export class subcategoryDataModel{
   cid:number;
   cname:string;
   sid:number;
   sname:string;

  
}

// client form
export class clientModel {
    id: number;
    clientName: string;
    email: string;
    contact: string;//procedure and table in the int
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
   contact:string;
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
// this is demo model....demo model in the all api perform do it.. 
export class DemoModel{
    id:number;
    name:string;
    email:string;
    mobile:string;
    address:string;
}

