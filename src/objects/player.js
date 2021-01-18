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

export { Player };