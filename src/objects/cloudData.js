class CloudData
{
    constructor(obj){
        obj = obj || {};
        this.dataKey = obj.dataKey || '';
        this.value = obj.value || 0;
        this.privacy = obj.privacy || 1;
        this.writeLock= obj.writeLock || 0;
    }
}

export { CloudData };