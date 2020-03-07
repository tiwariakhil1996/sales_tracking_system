

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
    createdby: number;

    userid: number;

    latitude: string;
    longitude: string;

    userType: number;
}

export class sales_avatarModel {
    image: string;
}

export class LocationModel {
    userid: number;
    // Sales Location
    latitude: string;
    longitude: string;
}

export class changePasswordModel {
    id: number;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
    modifiedby: number;
}