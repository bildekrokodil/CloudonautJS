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

export {
    AddCharacterRequest,
    UpdateCharacterRequest,
    GetCharacterRequest,
    ListCharactersRequest,
    CountCharactersRequest,
  };