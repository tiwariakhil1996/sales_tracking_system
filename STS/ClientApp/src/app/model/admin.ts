// admin register
export class registerModel {
    id: number;
    image: string;
    ImageExtn: string;
    username: string;
    email: string;
    gender: string;
    mobile: string;
    password: string;
    cpassword: string;
    userType: number;
}
export class ChangeAdminPasswordModel {
    id: number;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
}