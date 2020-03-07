
export class categoryDataModel {
    cid: number;
    cname: string;
    isActive: boolean;
    createdby: number;
    modifiedby:number;
}

export class subcategoryDataModel {
    sid: number;
    sname: string;
    cid: number;
    cname: string;
    isActive: boolean;
    createdby: number;
    modifiedby:number;
}

export class paginationModel {

    pageSize: number;
    pageIndex: number;
}