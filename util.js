import { ZefraCard as zCard } from './card.js';
import { WarFare as wfare } from './warfare.js';
export class ZefraUtil {
    static lib = null;
    static game = null;
    static ui = null;
    static get = null;
    static ai = null;
    static _status = null;
    static cardpackage = null;
    static ZefraNamePackage = '小shu扩展';//包包名
    static cardNameTitle = ['界','晋','谋','族','乐','神','📱','☆','智',
'信','仁','勇','严','典','将','战','★','传','武','K','梦','起','承','转','旧','星'];
    static cardNameTitle2 = ['OL','SP','用间','TW','手杀','新杀']
    //武将品质
    static cardqualitys = ['legend','s','epic']; //s+
    static cardqualityA = ['rare','ap','a'];
    static cardqualityB = ['am','bp','b','bm'];
    static cardqualityC = ['c','d','junk'];
    static cardquality = [ZefraUtil.cardqualitys,ZefraUtil.cardqualityA,
        ZefraUtil.cardqualityB,ZefraUtil.cardqualityC]
    static rootpath;//根目录
    //需要的武将包
    static cardpackage = ['clan',
        'collab','ddd','extra',
        'huicui', 'jsrg', 'mobile',
        'offline', 'old', 'onlyOL',
       'refresh', 'sb', 'shenhua',
        'shiji', 'sp', 'sp2', 
        'standard', 'tw', 'xianding',
        'xinghuoliaoyuan', 'yijiang', 'yingbian'];
    static Init(lib_,game_,ui_,get_,ai_,_status_,rootpath_) {
        //初始化card对象的地址
        ZefraUtil.lib = lib_;
        ZefraUtil.game = game_;
        ZefraUtil.ui = ui_;
        ZefraUtil.get = get_;
        ZefraUtil.ai = ai_;
        ZefraUtil._status = _status_;
        ZefraUtil.rootpath_ = rootpath_;
    } 
    static GetRootPath() {
        return ZefraUtil.rootpath_;
    }
    static RemoveElements(divs) {
        if(!divs || divs.length <= 0) return;
        for (let index = 0; index < divs.length; index++) {
            ZefraUtil.RemoveElement(divs[index],true);
        }
    }
    static RemoveElement(div,isRemoveParent) {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        if(isRemoveParent) div.remove();
    } 

    static GetRandomNumber(min,max) {
        let value = Math.floor(Math.random() * (max - min)) + min;
        if(value < min || value >= max) return min;
        return value;
    }
    static FilterCard(name) {
        let result = false;
        if(!ZefraUtil.lib.character[name]) return false;
        for (let index = 0; index < ZefraUtil.cardpackage.length; index++) {
            const pname = ZefraUtil.cardpackage[index];
            if(ZefraUtil.lib.characterPack[pname][name]) {
                result = true;
                break;
            }
        }
        return result;
    }
    static GetRandomQualityKey() {
        let number = ZefraUtil.GetRandomNumber(0,101);
        let cardquality;
        if (number <= 5) {
            cardquality = ZefraUtil.cardquality[0]; 
        } else if (number <= 20) { 
            cardquality = ZefraUtil.cardquality[1]; 
        } else if (number <= 50) {
            cardquality = ZefraUtil.cardquality[2]; 
        } else {
            cardquality = ZefraUtil.cardquality[3]; 
        }
        return cardquality[ZefraUtil.GetRandomNumber(0,cardquality.length)];
    }
    //获取到我们随机使用的武将
    static GetRandomCard() {
        let key = ZefraUtil.GetRandomQualityKey();
        let cardArray = null;
        if(key === 'legend' || key === 'epic' || key === 'rare'
        || key === 'junk') {
            cardArray = ZefraUtil.lib.rank['rarity'][key];
        } else {
            cardArray = ZefraUtil.lib.rank[key];


        }
        let times = -1;//最多循环10次
        let name;
        while(true) {
            times++;
            let index =  ZefraUtil.GetRandomNumber(0,cardArray.length);
            name = cardArray[index];
            if(times >= 10) return new zCard(name,key,ZefraUtil.lib.character[name]);
            else {
                //不存在我们的卡，继续循环
                if(!ZefraUtil.FilterCard(name)) continue;
                return new zCard(name,key,ZefraUtil.lib.character[name]);
            }
        }
    }
    static GetRandomWarFare() {
        let number = ZefraUtil.GetRandomNumber(0,101);
        let wfareArray;
        let quality;
        //普通战法70%概率，稀有战法25%概率，史诗战法4%概率，传说1%
        if (number <= 1) {
            wfareArray = wfare.LegendWarfares; 
            quality = wfare.Qualitye.Legend;
        } else if (number <= 4) { 
            wfareArray = wfare.EpicLWarfares; 
            quality = wfare.Qualitye.Epic;
        } else if (number <= 25) { 
            wfareArray = wfare.RareWarfares; 
            quality = wfare.Qualitye.Rare;
        } else {
            wfareArray = wfare.OrdinaryWarfares; 
            quality = wfare.Qualitye.Ordinary;
        } 
        wfareArray = wfare.OrdinaryWarfares;
        number = ZefraUtil.GetRandomNumber(0,wfareArray.length);
        number = 0;
        return [new wfare(wfareArray[number],quality),quality];
    }

    //加载随机战法
    static GetRandomWarFareUI(parent) {
        let [_wfare,quality] = ZefraUtil.GetRandomWarFare();//获取随机战法
        let warfare = document.createElement('div');
        warfare.className = 'warfare';
        warfare.style.backgroundImage = `url(${wfare.GetBackImageUrl(quality)})`;
        parent.appendChild(warfare);
        let warfareText = document.createElement('div');
        warfareText.className = 'warfareText'; 
        warfareText.style.color = wfare.GetTextNameColor(quality);
        warfareText.innerText = _wfare.textName;
        warfare.appendChild(warfareText);
        let warfarePicture = document.createElement('div');
        warfarePicture.className = 'warfarePicture';
        warfarePicture.style.backgroundImage = `url(${_wfare.imageurl})`;
        warfare.appendChild(warfarePicture);
        let warfareDes = document.createElement('div');
        warfareDes.className = 'warfareDes';
        warfareDes.innerText = _wfare.textDescribe;
        warfareDes.style.color = wfare.GetTextNameColor(quality);
        warfare.appendChild(warfareDes);
        return [warfare,_wfare];
    }

}