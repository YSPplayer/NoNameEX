import { ZefraUtil as util } from './util.js';
export class WarFare {
    static Qualitye = {
        Ordinary:0,
        Rare:1,
        EpicL:2,
        Legend:3
    };
    static OrdinaryWarfares = ['0','1','2','3','4','5','6'];
    static RareWarfares = ['7','8','9','10','11','13','14'];
    static EpicLWarfares = ['12','15'];
    static LegendWarfares = ['16'];
    static TWarfares = {
        0:'蒸蒸日上',1:'万物归甲',2:'远击之技',3:'核心会员',4:'随身皮囊',
        5:'二连击', 6:'援助', 7:'技能传承',8:'粮草剥夺',
        9:'淬血',10:'筹备',11:'信手拈来',12:'三板斧',
        13:'铁布衫',14:'强健体魄',15:'拂衣去',16:'偏转之甲'
    };
    static TWarfaresDescribe = {
        0:'获得的战斗奖励 + 40%',
        1:'若你没有指定类别的装备，进入战斗时装备指定类别的随机装备',
        2:'造成伤害时，若你与其距离大于2，此伤害+1',
        3:'你可以消耗50铜币刷新商店，可刷新1次',
        4:'手牌上限+2',
        5:'出杀次数 + 1',
        6:'回合结束时摸1张牌',
        7:'开局时，三选一获得一次稀有的技能',
        8:'敌方摸牌数-1',
        9:'你每轮杀首次造成伤害后摸2张牌',
        10:'游戏开始时，你获得2张随机手牌',
        11:'你的手牌上限不因体力值改变而改变',
        12:'你的每三张【杀】伤害 + 1',
        13:'游戏开始时，你获得2点护甲',
        14:'游戏开始时，你增加1点体力上限并回复等量体力',
        15:'你的回合开始时，随机获得1张智囊',
        16:'每次受到伤害后对随机敌方造成1点伤害'
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