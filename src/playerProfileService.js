import {
  UpdatePlayerProfileRequest,
  GetPlayerProfileRequest,
  ListPlayerProfilesOfPlayersRequest,
  SearchPlayerProfileRequest,
} from "./objects/playerProfileRequest";
import { Paging } from "./objects/paging";
import Service from "./service";

export default class PlayerProfileService extends Service {
  constructor(api, paging) {
    paging = paging || {};
    super(api);
    this.paging = new Paging(paging);
  }

  UpdateProfile() {
    const request = new UpdatePlayerProfileRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player
    );
    return this.ApiCall(request);
  }

  GetProfile() {
    const request = new GetPlayerProfileRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player.playerID
    );
    return this.ApiCall(request);
  }

  GetProfileOfPlayer(playerID) {
    playerID = playerID || this.api.player.playerID;
    const request = new GetPlayerProfileRequest(
      this.api.appID,
      this.api.appSecret,
      playerID
    );
    return this.ApiCall(request);
  }

  ListProfilesOfPlayers(playerList, paging) {
    if (Array.isArray(playerList)) {
      paging = paging || {};
      paging = paging instanceof Paging ? paging : this.paging;
      const request = new ListPlayerProfilesOfPlayersRequest(
        this.api.appID,
        this.api.appSecret,
        playerList,
        paging
      );
      return this.ApiCall(request);
    } else {
      return Promise.reject("playerList must be of type array!");
    }
  }

  Search(search, paging) {
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    search = search || "";
    const request = new SearchPlayerProfileRequest(
      this.api.appID,
      this.api.appSecret,
      search,
      paging
    );
    return this.ApiCall(request);
  }
}
