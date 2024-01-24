export class ZefraGameMode {
    static Type = {
        NONE:-1,//模式未开启
        SELECT_CHARACTER_BEFORE_DUEL:0,//决斗前选择武将
    };
    static _IsMode = false;
    static Step = ZefraGameMode.Type.NONE;
    static IsMode() {
        return ZefraGameMode._IsMode;
    }
    static StartMode() {
        ZefraGameMode._IsMode = true;
        ZefraGameMode.Step = ZefraGameMode.Type.SELECT_CHARACTER_BEFORE_DUEL;
    }
    static EndMode() {
        ZefraGameMode._IsMode = false;
        ZefraGameMode.Step = ZefraGameMode.Type.NONE;
    }
}