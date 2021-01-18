import {
  GetAppDataRequest,
  GetPlayerDataRequest,
  SetAppDataRequest,
  SetPlayerDataRequest,
  GetPlayerDataByIDRequest,
} from "./objects/cloudDataRequest";
import Service from "./service";

export default class CloudDataService extends Service {
  constructor(api) {
    super(api);
  }

  SetAppData(dataKey, value, writeLock) {
    dataKey = dataKey || "";
    value = value || "";
    writeLock = writeLock || 0;
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new SetAppDataRequest(
      this.api.appID,
      this.api.appSecret,
      dataKey,
      value,
      writeLock
    );
    return this.ApiCall(request);
  }

  GetAppData(dataKey) {
    dataKey = dataKey || "";
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new GetAppDataRequest(
      this.api.appID,
      this.api.appSecret,
      dataKey
    );
    return this.ApiCall(request);
  }

  //Current logged in player and selected character
  SetData(dataKey, value, writeLock, privacy) {
    dataKey = dataKey || "";
    value = value || "";
    writeLock = writeLock || 0;
    privacy = privacy || -1;
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new SetPlayerDataRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      this.api.character.characterID,
      dataKey,
      value,
      writeLock,
      privacy
    );
    return this.ApiCall(request);
  }

  //Current logged in payer and specified character
  SetCharacterData(dataKey, characterID, value, writeLock, privacy) {
    characterID = characterID || 0;
    dataKey = dataKey || "";
    value = value || "";
    writeLock = writeLock || 0;
    privacy = privacy || -1;
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new SetPlayerDataRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      characterID,
      dataKey,
      value,
      writeLock,
      privacy
    );
    return this.ApiCall(request);
  }

  //Current logged in player and character = 0 same as SetCharacterData(0)
  SetPlayerData(dataKey, value, writeLock, privacy) {
    dataKey = dataKey || "";
    value = value || "";
    writeLock = writeLock || 0;
    privacy = privacy || -1;
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new SetPlayerDataRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      0,
      dataKey,
      value,
      writeLock,
      privacy
    );
    return this.ApiCall(request);
  }

  //Current logged in player and selected character
  GetData(dataKey) {
    dataKey = dataKey || "";
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new GetPlayerDataRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      this.api.character.characterID,
      dataKey
    );
    return this.ApiCall(request);
  }

  //Current logged in player and specified character
  GetCharacterData(dataKey, characterID) {
    characterID = characterID || 0;
    dataKey = dataKey || "";
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new GetPlayerDataRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      characterID,
      dataKey
    );
    return this.ApiCall(request);
  }

  //Current logged in player and character = 0 same as GetCharacterData(0)
  GetPlayerData(dataKey) {
    dataKey = dataKey || "";
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new GetPlayerDataRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      0,
      dataKey
    );
    return this.ApiCall(request);
  }

  //Specified Player
  GetCharacterDataOfPlayer(dataKey, playerID, characterID) {
    playerID = playerID || 0;
    characterID = characterID || 0;
    dataKey = dataKey || "";
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new GetPlayerDataByIDRequest(
      this.api.appID,
      this.api.appSecret,
      playerID,
      characterID,
      dataKey
    );
    return this.ApiCall(request);
  }
  GetPlayerDataOfPlayer(dataKey, playerID) {
    playerID = playerID || 0;
    dataKey = dataKey || "";
    if (dataKey === "") {
      return Promise.reject("Provide a key");
    }
    const request = new GetPlayerDataByIDRequest(
      this.api.appID,
      this.api.appSecret,
      playerID,
      0,
      dataKey
    );
    return this.ApiCall(request);
  }
}
