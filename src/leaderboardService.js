import {
  Leaderboard,
  ListScoresRequest,
  CountScoresRequest,
  ListScoresOfFriendsRequest,
  CountScoresOfFriendsRequest,
  AddScoreRequest,
  GetScoreRequest,
} from "./objects/leaderboard";
import { Paging } from "./objects/paging";
import Service from "./service";

export default class LeaderboardService extends Service {
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
