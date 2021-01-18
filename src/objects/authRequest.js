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

export { AnonymousAuthRequestFull, FacebookAuthRequestFull, FirebaseAuthRequestFull };