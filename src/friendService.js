import {
  AddFriendRequest,
  RemoveFriendRequest,
  AddFriendsFromFacebookRequest,
  ListFriendsRequest,
  CountFriendsRequest,
} from "./objects/friendRequest";

import { Paging } from "./objects/paging";
import Service from "./service";

export default class FriendService  extends Service{
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