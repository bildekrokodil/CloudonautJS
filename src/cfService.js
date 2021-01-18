import { GeoPoint } from "./objects/geoPoint";
import Service from "./service";

export default class CFService extends Service {
  constructor(api) {
    super(api);
  }

  GetDistance(geoPoint1, geoPoint2, unit) {
    unit = unit || "";
    if (geoPoint1 instanceof GeoPoint && geoPoint2 instanceof GeoPoint) {
      const request = {
        appID: this.api.appID,
        appSecret: this.api.appSecret,
        controller: "CF",
        action: "GetDistance",
        latitude1: geoPoint1.latitude,
        latitude2: geoPoint2.latitude,
        longitude1: geoPoint1.longitude,
        longitude2: geoPoint2.longitude,
        unit: unit,
      };
      return this.ApiCall(request);
    } else {
      return Promise.reject("Failed api call");
    }
  }

  GetRandomString() {
    const request = {
      appID: this.api.appID,
      appSecret: this.api.appSecret,
      controller: "CF",
      action: "GetRandomString",
    };
    return this.ApiCall(request);
  }

  GetGUID() {
    const request = {
      appID: this.api.appID,
      appSecret: this.api.appSecret,
      controller: "CF",
      action: "GetGUID",
    };
    return this.ApiCall(request);
  }
}
