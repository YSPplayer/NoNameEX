import { ZefraUtil as util } from './util.js';
export class WarFare {
    static Qualitye = {
        Ordinary:0,
        Rare:1,
        EpicL:2,
        Legend:3
    };
    static OrdinaryWarfares = ['0','1','2','3','4'];
    static RareWarfares = ['0'];
    static EpicLWarfares = [];
    static LegendWarfares = [];
    static TWarfares = {
        0:'蒸蒸日上',
        1:'万物归甲',
        2:'远击之技',
        3:'核心会员',
        4:'随身皮囊',
    };
    static TWarfaresDescribe = {
        0:'自己回合的出杀次数+1，对所有角色造成1点伤害己回合的出杀次数+1。',
        1:'若你没有指定类别的装备，进入战斗时装备指定类别的随机装备。',
        2:'造成伤害时，若你与其距离大于2，此伤害+1。',
        3:'你可以消耗50铜币刷新商店，可刷新1次。',
        4:'手牌上限+2',
    }
    //战法对象
    constructor(name, qualitye) {
        this.name = name;//战法名称
        this.textName = WarFare.TWarfares[name];//战法文本名
        this.qualitye = qualitye;//战法质量
        this.imageurl = `${util.GetRootPath()}/extension/${util.ZefraNamePackage}/source/zhanfa_${name}.png`; //图片地址
        this.textDescribe = WarFare.TWarfaresDescribe[name];//技能描述文本
    }
    static GetTextNameColor(qualitye) {
        if(qualitye == 0) return '#47e6ff';
        if(qualitye == 1) return '#689eff';
        if(qualitye == 2) return '#e2a15e';
        if(qualitye == 3) return '#ff7575';
        return WarFare.GetTextNameColor(0);
    }
    static GetBackImageUrl(qualitye) {
        if(qualitye == 0) return `${util.GetRootPath()}/extension/${util.ZefraNamePackage}/source/OrdinaryWarfare.png`;
        if(qualitye == 1) return `${util.GetRootPath()}/extension/${util.ZefraNamePackage}/source/RareWarfare.png`;
        if(qualitye == 2) return `${util.GetRootPath()}/extension/${util.ZefraNamePackage}/source/EpicWarfare.png`;
        if(qualitye == 3) return `${util.GetRootPath()}/extension/${util.ZefraNamePackage}/source/LegendWarfare.png`;
        return WarFare.GetBackImageUrl(0);
    }
}