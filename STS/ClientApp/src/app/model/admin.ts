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

export class avatarModel {
    image: string;
    ImageId: number;
    ImageData: string;
}

export class changePasswordModel {
    id: number;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
}


export class userModel {
    id: number;
}