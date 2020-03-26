
export class categoryDataModel {
    userid: number;
    cid: number;
    cname: string;
    isActive: boolean;
    createdby: number;
    modifiedby: number;
    pageIndex: number;
    pageSize: number;
    search: string;
}

export class subcategoryDataModel {
    userid: number;
    sid: number;
    sname: string;
    cid: number;
    cname: string;
    isActive: boolean;
    createdby: number;
    modifiedby: number;
    pageIndex: number;
    pageSize: number;
    search: string;
}

export class paginationModel {

    pageSize: number;
    pageIndex: number;
}