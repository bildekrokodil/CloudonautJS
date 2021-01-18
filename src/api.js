import AuthService from "./authService.js";
import LeaderboardService from "./leaderboardService.js";
import FriendService from './friendService.js';
import CFService from "./cfService.js";
import CharacterService from "./characterService.js";
import PlayerProfileService from "./playerProfileService.js";
import PlayerService from "./playerService.js";
import { Character } from "./objects/character.js";
import { Player } from "./objects/player.js";
import CloudDataService from "./cloudDataService.js";

export default class API {
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
