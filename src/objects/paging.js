class Paging
{
    constructor(obj){
        obj = obj || {};
        this.limit = obj.limit || 0;
        this.page = obj.page || 1;
    }
}

export { Paging };