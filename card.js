import { ZefraUtil as util } from './util.js';
export class ZefraCard {
    static rootpath;
    constructor(name, qualitye) {
        this.name = name;//武将名
        this.qualitye = qualitye;//品质
        this.textName = util.lib.translate[name];//文本名
        this.imageurl = `${ZefraCard.rootpath}/image/character/${name}.jpg`; //图片地址
        this.qualityeUrl = `${ZefraCard.rootpath}/extension/小shu扩展/source/${ZefraCard.GetQualityeUrl(this.qualitye)}.png`;//品质图片地址

    }
    static GetQualityeUrl(qualitye) {
        switch (qualitye) {//rarity_junk
            case 'bp': case 'b':  case 'bm': case 'am':case 'a': case 'c': case 'd': case 'junk': return 'rarity_junk';
            case 'ap': return 'rarity_common';
            case 'rare': return 'rarity_rare';
            case 'epic':return 'rarity_epic';
            case 'legend':return 'rarity_legend';
            default:return '';
        }
    }
}