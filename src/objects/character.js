class Character
{
    constructor(obj){
        obj = obj || {};
        this.characterID = obj.characterID || 0;
        this.characterName = obj.characterName || "";
        this.characterNameExtra =  obj.characterNameExtra || "";
        this.characterAvatar = obj.characterAvatar || "";
    }
}

export { Character };