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
    UpdateImageList: UpdateImageListModel[];

}
export class ImageListModel {
    ImageId?: number = 0;
    ImageExtn: string;
    Image: string;
    ImageData: string;

}
// This for display the image

export class ImageModel {
    Image: string;
}
export class UpdateImageListModel {
    ImageId: number;
    ImageData: string;
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
}
export class Product_Images_ListModel{
    id:number;
    image: string;
   
}
