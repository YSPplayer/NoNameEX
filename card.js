import { ZefraUtil as util } from './util.js';
export class ZefraCard {
    static rootpath;
    constructor(name, qualitye,data) {
        this.name = name;//武将名
        this.qualitye = qualitye;//品质
        this.textName = util.lib.translate[name];//文本名
        this.imageurl = `${ZefraCard.rootpath}/image/character/${name}.jpg`; //图片地址
        this.qualityeUrl = `${ZefraCard.rootpath}/extension/${util.ZefraNamePackage}/source/${ZefraCard.GetQualityeUrl(this.qualitye)}.png`;//品质图片地址
        if(data !== undefined) {
            this.sex = data[0];//性别
            this.camp = data[1];//实例
            this.textCamp =  util.lib.translate[this.camp];
            this.maxLp = data[2];//血条上限
            this.skillArray = data[3];//技能key
            this.textskillArray = [];//技能字符
            for (let index = 0; index < this.skillArray.length; index++) {
                this.textskillArray.push(util.lib.translate[this.skillArray[index]]);
            }
            console.log(this.textskillArray[0])

        }
    }
    static GetQualityeUrl(qualitye) {
        switch (qualitye) {//rarity_junk
            case 'b':  case 'bm': case 'am':case 'c': case 'd': case 'junk': return 'rarity_junk';
            case 'a':  case 'bp': return 'rarity_common';
            case 'rare': return 'rarity_rare';
            case 'epic':case 's': case 'ap' :return 'rarity_epic';
            case 'legend':return 'rarity_legend';
            default:return '';
        }
    }
}