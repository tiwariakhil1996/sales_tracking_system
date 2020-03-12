
export class categoryDataModel {
    userid:number;
    cid: number;
    cname: string;
    isActive: boolean;
    createdby: number;
    modifiedby:number;
    pageIndex: number;
    pageSize: number;
    search: string;
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