

// sales register 
export class salesregisterModel {
    id: number;
    image: string;
    salesName: string;
    email: string;
    gender: string;
    mobile: string;
    adharcard: string;
    companyname: string;
    companyaddress: string;
    address: string;
    password: string;
    cpassword: string;
    isonline: boolean;
    isActive: boolean;
    createdby: number;

    userid: number;

    // latitude: string;
    // longitude: string;
    latitude: number;
    longitude: number;
    userType: number;

    pageSize: number;
    pageIndex: number;
    search: string;
}

export class sales_avatarModel {
    image: string;
}

export class LocationModel {
    userid: number;
    // Sales Location
    // latitude: string;
    // longitude: string;
    latitude: number;
    longitude: number;
}

export class changePasswordModel {
    id: number;
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
    modifiedby: number;
}

export class paginationModel {

    pageSize: number;
    pageIndex: number;
}


// export class profileModel {
//     image: any;
//     salesName: string;
//     gender: string;
//     email:string;
//     mobile: any;
//     address: string;
//     adharcard: string;
//     ImageExtn: any;
// }