import { Paging } from "./objects/paging";
import {
  AddCharacterRequest,
  UpdateCharacterRequest,
  GetCharacterRequest,
  ListCharactersRequest,
  CountCharactersRequest,
} from "./objects/characterRequest";
import { Character } from "./objects/character";
import Service from "./service";
export default class CharacterService extends Service {
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
