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

export {
  Leaderboard,
  ListScoresRequest,
  CountScoresRequest,
  ListScoresOfFriendsRequest,
  CountScoresOfFriendsRequest,
  GetScoreRequest,
  AddScoreRequest,
};
