
// register form
export class registerModel {
    id: number;
    username: string;
    email: string;
    password: string;
    cpassword: string;
}

// register form
export class salesregisterModel {
    id: number;
    salesName: string;
    email: string;
    password: string;
    cpassword: string;
}
// product form
export class productModel {
    id: number;
    category: string;
    subcategory: string;
    productname: string;
    description: string;
    price: number;
    image: string;
    date: string;
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
    country: string;
    state:string;
    city: string;
    postalCode: number;
}
export class DemoModel{
    ID:number;
    Name:string;
    Email:string;
    Mobile:string;
    Address:string;
    
}