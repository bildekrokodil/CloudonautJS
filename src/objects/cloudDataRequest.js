class SetAppDataRequest {
  constructor(appID, appSecret, dataKey, value, writeLock) {
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "CloudData";
    this.action = "SetAppData";
    this.dataKey = dataKey;
    this.value = value;
    this.writeLock = writeLock;
    this.privacy = 0;
  }
}

class GetAppDataRequest {
  constructor(appID, appSecret, dataKey) {
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "CloudData";
    this.action = "GetAppData";
    this.dataKey = dataKey;
  }
}

class SetPlayerDataRequest {
    constructor(appID, appSecret, player, characterID, dataKey, value, writeLock, privacy) {
      this.appID = appID;
      this.appSecret = appSecret;
      this.controller = "CloudData";
      this.action = "SetPlayerData";
      this.playerID = player.playerID;
      this.playerSecret = player.playerSecret;
      this.characterID = characterID;
      this.dataKey = dataKey;
      this.value = value;
      this.writeLock = writeLock;
      this.privacy = privacy;
    }
  }

  class GetPlayerDataRequest {
    constructor(appID, appSecret, player, characterID, dataKey) {
      this.appID = appID;
      this.appSecret = appSecret;
      this.controller = "CloudData";
      this.action = "GetPlayerData";
      this.playerID = player.playerID;
      this.playerSecret = player.playerSecret;
      this.characterID = characterID;
      this.dataKey = dataKey;
    }
  }

  class GetPlayerDataByIDRequest {
    constructor(appID, appSecret, playerID, characterID, dataKey) {
      this.appID = appID;
      this.appSecret = appSecret;
      this.controller = "CloudData";
      this.action = "GetPlayerDataByID";
      this.playerID = playerID;
      this.characterID = characterID;
      this.dataKey = dataKey;
    }
  }

export { SetAppDataRequest, GetAppDataRequest, SetPlayerDataRequest, GetPlayerDataRequest, GetPlayerDataByIDRequest };
