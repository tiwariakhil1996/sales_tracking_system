// sales register 
export class salesregisterModel {
    id: number;
    image: string;
    salesName: string;
    email: string;
    gender: string;
    mobile: string;
    adharcard: string;
    address: string;
    password: string;
    cpassword: string;

    isActive: boolean;
}


export class changePasswordModel {
    id: number;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
    modifiedby: number;
}