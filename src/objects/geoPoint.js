class GeoPoint
{
    constructor(obj){
        obj = obj || {};
        this.latitude = obj.latitude || obj.lat || "";
        this.longitude = obj.longitude || obj.long || "";
    }
}

export { GeoPoint };