import Service from "./service";

export default class PlayerService extends Service {
    constructor(api) {
        super(api);
    }

    GetName()
    {
        return (this.api.character.characterID==0 || this.api.character.characterName=='') ? this.api.player.displayName : this.api.character.characterName;
    }
  
    GetNameExtra()
    {
        return (this.api.character.characterID==0 || this.api.character.characterNameExtra=='') ? this.api.player.displayNameExtra : this.api.character.characterNameExtra;
    }
  
    GetAvatar()
    {
        return (this.api.character.characterID==0 || this.api.character.characterAvatar=='') ? this.api.player.avatar : this.api.character.characterAvatar;
    }
}