class UpdatePlayerProfileRequest
{
    constructor(appID, appSecret, player){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "PlayerProfile";
        this.action ="Update";
        this.playerID = player.playerID;
        this.playerSecret = player.playerSecret;
        this.displayName = player.displayName;
        this.displayNameExtra =  player.displayNameExtra;
        this.avatar = player.avatar;
    }
}

class GetPlayerProfileRequest
{
    constructor(appID, appSecret, playerID){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "PlayerProfile";
        this.action ="Get";
        this.playerID = playerID;
    }
}

class ListPlayerProfilesOfPlayersRequest
{
    constructor(appID, appSecret, playerList, paging){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "PlayerProfile";
        this.action ="List";
        this.playerList = playerList;
        this.page = paging.page || 1;
        this.limit = paging.limit || 0;
    }
}

class SearchPlayerProfileRequest
{
    constructor(appID, appSecret, search, paging){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "PlayerProfile";
        this.action = "Search";
        this.search = search;
        this.page = paging.page || 1;
        this.limit = paging.limit || 0;
    }
}

export {
    UpdatePlayerProfileRequest,
    GetPlayerProfileRequest,
    ListPlayerProfilesOfPlayersRequest,
    SearchPlayerProfileRequest,
  };