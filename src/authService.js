import {
  AnonymousAuthRequestFull,
  FacebookAuthRequestFull,
  FirebaseAuthRequestFull,
} from "./objects/authRequest";
import Service from "./service";

export default class AuthService extends Service {
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
