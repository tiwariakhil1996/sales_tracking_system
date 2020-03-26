


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
    imageList: ImageListModel[];
    //this model for display the image
    imageListData: ImageModel[];
}

export class ImageListModel {
    Image: string;
    ImageExtn: string;
    ImageData: string;

}

export class updateproductModel {
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
    imageList: ImageListModel[];
    //this model for display the image
    imageListData: ImageModel[];
}

export class UpdateImageListModel {
    ImageId: number;
    ImageData: string;
}

// This for display the image

export class ImageModel {
    Image: string;
}

export class Product_Images_ListModel {
    id: number;
    image: string;

}

export class productpriceModel {
    id: number;
    price: string;
}

// product form
export class productListModel {
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
    userid: number;
    createdby: number;
    modifiedby: number;
    imageList: ImageListModel[];
    //this model for display the image
    imageListData: ImageModel[];

    pageIndex: number;
    pageSize: number;
    search: string;
}


export class paginationModel {

    pageSize: number;
    pageIndex: number;
}