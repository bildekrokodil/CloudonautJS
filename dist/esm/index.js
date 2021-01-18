class Leaderboard {
  constructor(obj) {
    obj = obj || {};
    this.level = obj.level || 0;
    this.leaderboardID = obj.leaderboardID || 0;
    this.startDate = obj.startDate || "";
    this.endDate = obj.endDate || "";
    this.periodicity = obj.periodicity || "";
    this.function = obj.function || "MAX";
    this.sort = obj.sort || "";
  }
}
//Requests
class ListScoresRequest extends Leaderboard {
  constructor(appID, appSecret, playerID, characterID, obj, paging) {
    super(obj);
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "Leaderboard";
    this.action = "List";
    this.page = paging.page || 1;
    this.limit = paging.limit || 0;
    this.playerID = playerID;
    this.characterID = characterID;
  }
}
class CountScoresRequest extends Leaderboard {
  constructor(appID, appSecret, obj) {
    super(obj);
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "Leaderboard";
    this.action = "Count";
    /*this.playerID = 0;
    this.characterID = 0;*/
  }
}

class ListScoresOfFriendsRequest extends Leaderboard {
  constructor(appID, appSecret, player, obj, paging) {
    super(obj);
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "Leaderboard";
    this.action = "ListFriends";
    this.page = paging.page || 1;
    this.limit = paging.limit || 0;
    this.playerID = player.playerID;
    this.playerSecret = player.playerSecret;
  }
}

class CountScoresOfFriendsRequest extends Leaderboard {
  constructor(appID, appSecret, player, obj) {
    super(obj);
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "Leaderboard";
    this.action = "CountFriends";
    this.playerID = player.playerID;
    this.playerSecret = player.playerSecret;
  }
}

class AddScoreRequest extends Leaderboard {
  constructor(appID, appSecret, player, characterID, obj, score) {
    super(obj);
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "Leaderboard";
    this.action = "Add";
    this.playerID = player.playerID;
    this.playerSecret = player.playerSecret;
    this.characterID = characterID;
    this.score = score;
  }
}

class GetScoreRequest extends Leaderboard {
  constructor(appID, appSecret, playerID, characterID, obj) {
    super(obj);
    this.appID = appID;
    this.appSecret = appSecret;
    this.controller = "Leaderboard";
    this.action = "Get";
    this.playerID = playerID;
    this.characterID = characterID;
  }
}

class GeoPoint
{
    constructor(obj){
        obj = obj || {};
        this.latitude = obj.latitude || obj.lat || "";
        this.longitude = obj.longitude || obj.long || "";
    }
}

class Paging
{
    constructor(obj){
        obj = obj || {};
        this.limit = obj.limit || 0;
        this.page = obj.page || 1;
    }
}

class Player
{
    constructor(obj){
        obj = obj || {};
        this.providerUID = obj.providerUID || '';
        this.playerID = obj.playerID || 0;
        this.playerSecret = obj.playerSecret || '';
        this.displayName= obj.displayName || '';
        this.displayNameExtra= obj.displayNameExtra || '';
        this.avatar='';
    }
}

class Character
{
    constructor(obj){
        obj = obj || {};
        this.characterID = obj.characterID || 0;
        this.characterName = obj.characterName || "";
        this.characterNameExtra =  obj.characterNameExtra || "";
        this.characterAvatar = obj.characterAvatar || "";
    }
}

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

class AuthRequestFull
{
    constructor(appID, appSecret, obj)
    {
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Auth";
        this.action ="Authenticate";
        this.providerUID = obj.providerUID;
        this.displayName =obj.displayName;
        this.displayNameExtra=obj.displayNameExtra;
    }
}

class AnonymousAuthRequestFull extends AuthRequestFull
{
    constructor(appID, appSecret, obj){
        super(appID,appSecret,obj);
        this.provider = 0;
    }
}

class FacebookAuthRequestFull extends AuthRequestFull
{
    constructor(appID, appSecret, obj){
        super(appID,appSecret,obj);
        this.provider = 1;
        this.playerID = obj.playerID;
        this.playerSecret =obj.playerSecret;
    }
}

class FirebaseAuthRequestFull extends AuthRequestFull
{
    constructor(appID, appSecret, obj){
        super(appID,appSecret,obj);
        this.provider = 2;
        this.playerID = obj.playerID;
        this.playerSecret =obj.playerSecret;
    }
}

class Service {
  constructor(api) {
    this.api = api;
  }

  ApiCall(obj) {
    return fetch(this.api.url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (!response.ok || response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        throw error;
      });
  }
}

class AuthService extends Service {
  constructor(api) {
    super(api);
  }

  Anonymous() {
    const request = new AnonymousAuthRequestFull(
      this.api.appID,
      this.api.appSecret,
      this.api.player
    );
    return this.ApiCall(request).then((data) => {
      if (data.success) {
        this.api.player.playerID = data.player.playerID;
        this.api.player.playerSecret = data.player.playerSecret;
        this.api.player.displayName = data.player.displayName;
        this.api.player.displayNameExtra = data.player.displayNameExtra;
      }
      return data;
    });
  }

  WithFacebook(token) {
    this.api.player.playerSecret = token || this.api.player.playerSecret;
    const request = new FacebookAuthRequestFull(
      this.api.appID,
      this.api.appSecret,
      this.api.player
    );
    return this.ApiCall(request).then((data) => {
      if (data.success) {
        this.api.player.playerID = data.player.playerID;
        this.api.player.playerSecret = data.player.playerSecret;
        this.api.player.displayName = data.player.displayName;
        this.api.player.displayNameExtra = data.player.displayNameExtra;
      }
      return data;
    });
  }

  WithFirebase(token) {
    this.api.player.playerSecret = token || this.api.player.playerSecret;
    const request = new FirebaseAuthRequestFull(
      this.api.appID,
      this.api.appSecret,
      this.api.player
    );
    return this.ApiCall(request).then((data) => {
      if (data.success) {
        this.api.player.playerID = data.player.playerID;
        this.api.player.playerSecret = data.player.playerSecret;
        this.api.player.displayName = data.player.displayName;
        this.api.player.displayNameExtra = data.player.displayNameExtra;
      }
      return data;
    });
  }
}

class LeaderboardService extends Service {
  constructor(api, obj, paging) {
    super(api);
    obj = obj || {};
    paging = paging || {};
    this.data = new Leaderboard(obj);
    this.paging = new Paging(paging);
  }

  ListScores(paging) {
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    const request = new ListScoresRequest(
      this.api.appID,
      this.api.appSecret,
      0,
      0,
      this.data,
      paging
    );
    return this.ApiCall(request);
  }

  ListScoresAroundMe(paging) {
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    const request = new ListScoresRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player.playerID,
      this.api.character.characterID,
      this.data,
      paging
    );
    return this.ApiCall(request);
  }

  ListScoresAroundPlayer(playerID, characterID, paging) {
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    playerID = playerID || 0;
    characterID = characterID || 0;
    const request = new ListScoresRequest(
      this.api.appID,
      this.api.appSecret,
      playerID,
      characterID,
      this.data,
      paging
    );
    return this.ApiCall(request);
  }

  CountScores() {
    const request = new CountScoresRequest(
      this.api.appID,
      this.api.appSecret,
      this.data
    );
    return this.ApiCall(request);
  }

  ListScoresOfFriends(paging) {
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    const request = new ListScoresOfFriendsRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      this.data,
      paging
    );
    return this.ApiCall(request);
  }

  CountScoresOfFriends() {
    const request = new CountScoresOfFriendsRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      this.data
    );
    return this.ApiCall(request);
  }

  GetScore() {
    const request = new GetScoreRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player.playerID,
      this.api.character.characterID,
      this.data
    );
    return this.ApiCall(request);
  }

  GetScoreOfPlayer(playerID, characterID) {
    playerID = playerID || 0;
    characterID = characterID || 0; 
    const request = new GetScoreRequest(
      this.api.appID,
      this.api.appSecret,
      playerID,
      characterID,
      this.data
    );
    return this.ApiCall(request);
  }

  AddScore(score) {
    score = parseFloat(score) || null;
    if (score === null) {
      return Promise.reject("Provide a score");
    }
    const request = new AddScoreRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      this.api.character.characterID,
      this.data,
      score
    );
    return this.ApiCall(request);
  }
}

class AddFriendRequest
{
    constructor(appID, appSecret, player, friendID){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Friends";
        this.action = "Add";
        this.playerID = player.playerID;
        this.playerSecret = player.playerSecret;
        this.friendID = friendID;
    }
}

class AddFriendsFromFacebookRequest
{
    constructor(appID, appSecret, player, friendList){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Friends";
        this.action = "AddFromFacebook";
        this.playerID = player.playerID;
        this.playerSecret = player.playerSecret;
        this.friendList = friendList;
    }
}

class RemoveFriendRequest
{
    constructor(appID, appSecret, player, friendID){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Friends";
        this.action = "Remove";
        this.playerID = player.playerID;
        this.playerSecret = player.playerSecret;
        this.friendID = friendID;
    }
}

class ListFriendsRequest
{
    constructor(appID, appSecret, player, paging){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Friends";
        this.action = "List";
        this.playerID = player.playerID;
        this.playerSecret = player.playerSecret;
        this.page = paging.page || 1;
        this.limit = paging.limit || 0;
    }
}

class CountFriendsRequest {
    constructor(appID, appSecret, player) {
      this.appID = appID;
      this.appSecret = appSecret;
      this.controller = "Friends";
      this.action = "Count";
      this.playerID = player.playerID;
      this.playerSecret = player.playerSecret;
    }
  }

class FriendService  extends Service{
  constructor(api, paging) {
    paging = paging || {};
    super(api);
    this.paging = new Paging(paging);
  }

  AddFriend(friendID) {
    friendID = parseInt(friendID) || null;
    if (friendID === null) {
      return Promise.reject("Provide a friendID");
    }
    const request = new AddFriendRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      friendID
    );
    return this.ApiCall(request);
  }

  RemoveFriend(friendID) {
    friendID = parseInt(friendID) || null;
    if (friendID === null) {
      return Promise.reject("Provide a friendID");
    }
    const request = new RemoveFriendRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      friendID
    );
    return this.ApiCall(request);
  }

  AddFriendsFromFacebook(friendList) {
    if (Array.isArray(friendList)) {
      const request = new AddFriendsFromFacebookRequest(
        this.api.appID,
        this.api.appSecret,
        this.api.player,
        friendList
      );
      return this.ApiCall(request);
    } else {
      return Promise.reject("friendList must be of type array!");
    }
  }

  ListFriends(paging) {
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    const request = new ListFriendsRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      paging
    );
    return this.ApiCall(request);
  }

  Count() {
    const request = new CountFriendsRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player
    );
    return this.ApiCall(request);
  }
  
}

class CFService extends Service {
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

class AddCharacterRequest
{
    constructor(appID, appSecret, player, character){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Character";
        this.action ="Add";
        this.playerID = player.playerID;
        this.playerSecret = player.playerSecret;
        this.characterName = character.characterName;
        this.characterNameExtra =  character.characterNameExtra;
        this.characterAvatar = character.characterAvatar;
    }
}

class UpdateCharacterRequest
{
    constructor(appID, appSecret, player, character){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Character";
        this.action ="Update";
        this.playerID = player.playerID;
        this.playerSecret = player.playerSecret;
        this.characterID = character.characterID;
        this.characterName = character.characterName;
        this.characterNameExtra =  character.characterNameExtra;
        this.characterAvatar = character.characterAvatar;
    }
}

class GetCharacterRequest
{
    constructor(appID, appSecret, playerID, characterID){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Character";
        this.action ="Get";
        this.playerID = playerID;
        this.characterID = characterID;
    }
}

class ListCharactersRequest
{
    constructor(appID, appSecret, playerID, paging){
        this.appID = appID;
        this.appSecret = appSecret;
        this.controller = "Character";
        this.action ="List";
        this.playerID = playerID;
        this.page = paging.page;
        this.limit = paging.limit;
    }
}

class CountCharactersRequest {
    constructor(appID, appSecret, playerID) {
      this.appID = appID;
      this.appSecret = appSecret;
      this.controller = "Character";
      this.action = "Count";
      this.playerID = playerID;
    }
  }

class CharacterService extends Service {
  constructor(api, paging) {
    super(api);
    paging = paging || {};
    this.paging = new Paging(paging);
  }

  AddCharacter(character) {
    character = character || {};
    if (!(character instanceof Character)) {
      return Promise.reject("Provide a character");
    }
    if (character.characterID != 0) {
      return Promise.reject("Provide a new character. CharacterID must be 0");
    }
    const request = new AddCharacterRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      character
    );
    return this.ApiCall(request);
  }

  UpdateCharacter(character) {
    character = character || {};
    if (!(character instanceof Character)) {
      character = this.api.character;
    }
    const request = new UpdateCharacterRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player,
      character
    );
    return this.ApiCall(request);
  }

  GetCharacter(characterID) {
    characterID = characterID || this.api.character.characterID;
    const request = new GetCharacterRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player.playerID,
      characterID
    );
    return this.ApiCall(request);
  }

  SetCharacter(characterID) {
    characterID = characterID || 0;
    if (characterID == 0)
    {
      this.api.character.characterID = 0;
      this.api.character.characterName = "";
      this.api.character.characterNameExtra = "";
      this.api.character.characterAvatar = "";
      const obj = {"success":true};
      return Promise.resolve(obj);
    } 
    const request = new GetCharacterRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player.playerID,
      characterID
    );
    return this.ApiCall(request).then((data) => {
      if (data.success) {
        this.api.character.characterID = data.character.characterID;
        this.api.character.characterName = data.character.characterName;
        this.api.character.characterNameExtra = data.character.characterNameExtra;
        this.api.character.characterAvatar = data.character.characterAvatar;
      }
      return data;
    });
  }

  GetCharacterOfPlayer(playerID, characterID) {
    playerID = playerID || this.api.player.playerID;
    characterID = characterID || this.api.character.characterID;
    const request = new GetCharacterRequest(
      this.api.appID,
      this.api.appSecret,
      playerID,
      characterID
    );
    return this.ApiCall(request);
  }

  ListCharacters(paging) {
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    const request = new ListCharactersRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player.playerID,
      paging
    );
    return this.ApiCall(request);
  }

  CountCharacters() {
    const request = new CountCharactersRequest(
      this.api.appID,
      this.api.appSecret,
      this.api.player.playerID
    );
    return this.ApiCall(request);
  }
  
  ListCharactersOfPlayer(playerID, paging) {
    playerID = playerID || this.api.player.playerID;
    paging = paging || {};
    paging = paging instanceof Paging ? paging : this.paging;
    const request = new ListCharactersRequest(
      this.api.appID,
      this.api.appSecret,
      playerID,
      paging
    );
    return this.ApiCall(request);
  }

  CountCharactersOfPlayer(playerID) {
    playerID = playerID || this.api.player.playerID;
    const request = new CountCharactersRequest(
      this.api.appID,
      this.api.appSecret,
      playerID
    );
    return this.ApiCall(request);
  }
}

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

class PlayerProfileService extends Service {
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

class PlayerService extends Service {
    constructor(api) {
        super(api);
    }

    GetName()
    {
        return (this.api.character.characterID==0 || this.api.character.characterName=='') ? this.api.player.displayName : this.api.character.characterName;
    }
  
    GetNameExtra()
    {
        return (this.api.character.characterID==0 || this.api.character.characterNameExtra=='') ? this.api.player.displayNameExtra : this.api.character.characterNameExtra;
    }
  
    GetAvatar()
    {
        return (this.api.character.characterID==0 || this.api.character.characterAvatar=='') ? this.api.player.avatar : this.api.character.characterAvatar;
    }
}

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

class CloudDataService extends Service {
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

class API {
  constructor(appID, appSecret = "") {
    this.appID = appID;
    this.appSecret = appSecret;
    this.player = new Player();
    this.character = new Character();
    this.url = "https://api01.cloudonaut.com/index.php";
  }

  Auth()
  {
    return new AuthService(this);
  }

  CF()
  {
    return new CFService(this);
  }

  Friend()
  {
    return new FriendService(this);
  }

  Leaderboard(obj, paging)
  {
    return new LeaderboardService(this, obj, paging);
  }

  Character(paging)
  {
    return new CharacterService(this, paging);
  }

  PlayerProfile()
  {
    return new PlayerProfileService(this);
  }

  Player()
  {
    return new PlayerService(this);
  }

  CloudData()
  {
    return new CloudDataService(this);
  }
}
//export a direct instance
//export const api = new API();

export { API, Character, CloudData, GeoPoint, Leaderboard, Paging, Player };
//# sourceMappingURL=index.js.map
