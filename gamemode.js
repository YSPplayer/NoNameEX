import { ZefraCard as zCard } from './card.js';
import { ZefraUtil as util } from './util.js';
export class ZefraGameMode {
    static Type = {
        NONE:-1,//模式未开启
        SELECT_CHARACTER_BEFORE_DUEL:0,//决斗前选择武将
        SELECT_WARFARE_BEFORE_DUEL:1,//决斗前选择战法
        SELECT_WARFARE2_BEFORE_DUEL:2,//决斗前选择战法二
        CONfIRM_CHARACTER:3,//确认武将
        START_INTERFACE:4//进入开始界面
    };
    static _IsMode = false;
    static Step = ZefraGameMode.Type.NONE;
    static CharacterCard = null;
    static Warfares = [];//玩家当前的战法列表
    static Skills = [];//武将扩展技能
    static species = 0;//金币数量
    static IsMode() {
        return ZefraGameMode._IsMode && ZefraGameMode.Step
         > ZefraGameMode.Type.NONE;
    }
    static NextStep() {
        ZefraGameMode.Step++;
    }
    static GetModeStep() {
        return ZefraGameMode.Step;
    }

    static StartMode() {
        ZefraGameMode._IsMode = true;
        ZefraGameMode.Step = ZefraGameMode.Type.SELECT_CHARACTER_BEFORE_DUEL;
    }

    static SetModeData(objArray) {
        if(!ZefraGameMode.IsMode()) return;
        if(ZefraGameMode.Step == ZefraGameMode.Type.SELECT_CHARACTER_BEFORE_DUEL) {
            ZefraGameMode.CharacterCard = objArray[0]; //zCard，我们选择的卡片
        } else if(ZefraGameMode.Step <= ZefraGameMode.Type.SELECT_WARFARE2_BEFORE_DUEL) {
            //添加我们的战法
            ZefraGameMode.Warfares.push(objArray[0]);
        }
    }

    //重置所有资源
    static EndMode() {
        util.ClearModeUI();
        ZefraGameMode._IsMode = false;
        ZefraGameMode.Step = ZefraGameMode.Type.NONE;
        ZefraGameMode.CharacterCard = null;
        ZefraGameMode.Warfares = [];
        ZefraGameMode.Skills = [];
        species = 0;
    }
}