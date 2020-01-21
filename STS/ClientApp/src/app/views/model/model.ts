// demo page
export class demoModel {
    id: number;
    username: string;
    email: string;
    password: string;
    cpassword: string;
}


// register form
export class registerModel {
    id: number;
    username: string;
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
    image: any;
    date: any;
}
//login form
export class LoginModel{
    email:string;
    password:string;
}