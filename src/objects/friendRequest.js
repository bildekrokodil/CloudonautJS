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
export { AddFriendRequest, AddFriendsFromFacebookRequest, RemoveFriendRequest, ListFriendsRequest, CountFriendsRequest };