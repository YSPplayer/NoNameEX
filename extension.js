game.import("extension",function(lib,game,ui,get,ai,_status)
{
return {
    name:"小shu扩展",
    content:function(config,pack){
        //创建我们自己的环境
        let CreateEv = function() {
            //创建自己的环境
            if(!lib.game.zefraEv) {
                game.zefraEv = {
                    modeName:'山河图',
                    intervalLoop:0
                }
            }
        }
        //进入游戏主界面触发该函数事件
        //添加场景
        let addScene = function(zefraEv) {
            let modeName = zefraEv.modeName;
            if(lib.storage.scene === undefined) return;
            let scene = {
                name:modeName,//模式名
                intro:[]
            } ;
            if(!lib.storage.scene[modeName]) {
                //创建新模式
                console.log("zefra-create scene");
                lib.storage.scene[modeName]=scene;
                //保存模式
                game.save('scene',lib.storage.scene);
            }
        }
        //给山河图按钮添加事件
        let buttonInit = function(zefraEv) {
            zefraEv.intervalLoop = 0;//计时器最大循环检查次数
            //启动事件
            const intervalId = setInterval(() => {
                let divs = document.querySelectorAll('.dialogbutton.menubutton.large');
                if (divs.length > 0) {
                    for (let i = 0; i < divs.length; i++) {
                        if (divs[i].textContent.trim() === zefraEv.modeName) {
                            let modeDiv = divs[i];
                            console.log(modeDiv)
                            modeDiv.addEventListener('click', function() {
                                //这个点击事件在clickCapt之后
                                console.log("zefra-mode button click");
                            });
                            clearInterval(intervalId);
                            break;
                        }
                    }
                }
                else if(zefraEv.intervalLoop > 5) {
                    clearInterval(intervalId);
                }
                ++zefraEv.intervalLoop;
            }, 60);
        }
        //只有乱斗模式才使用
        if (!['brawl'].includes(get.mode())) return;
        //只在乱斗模式开启时加载
        if(game.syncMenu !== undefined && game.syncMenu) {
            CreateEv();
            addScene(game.zefraEv);
            buttonInit(game.zefraEv);
            //lib.arenaReady.push(buttonInit(lib.storage.zefraEv));
        }
    },precontent:function(){
    
},config:{},help:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"",
    author:"小shu",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[],"audio":[]}}})