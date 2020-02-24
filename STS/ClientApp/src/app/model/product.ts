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
    isActive: boolean;

    createdby: number;
    modifiedby: number;
}

export class productpriceModel {
    id: number;
    price: number;
}