game.import("extension",function(lib,game,ui,get,ai,_status)
{
return {
    name:"小shu扩展",
    content:function(config,pack){
        //进入游戏主界面触发该函数事件
        //添加场景
        let addScene = function() {
            if(lib.storage.scene === undefined) return;
            var modeName = '山河图';
            let scene = {
                name:modeName,//模式名
                intro:[]
            } ;
            
            if(!lib.storage.scene[modeName]) {
                //创建新模式
                console.log("zefra-create scene");
                lib.storage.scene[modeName]=scene;
                game.save('scene',lib.storage.scene);
                game.addScene(scene.name,true);
            }
        }
        //给山河图按钮添加事件
        let buttonInit = function() {
            let modeName = '山河图';
            //获取到所有左侧的按钮
            let divs = document.querySelectorAll('.dialogbutton');
           // let divs = document.querySelectorAll('.dialogbutton.menubutton.large');
            console.log(divs);
            // 遍历这些 div 元素
            for (let i = 0; i < divs.length; i++) {
                if (divs[i].textContent.trim() === modeName) {
                    console.log("sadad");
                    // 找到内部文本为 "毒战三国" 的 div 对象
                    let modeDiv = divs[i];
                    modeDiv.addEventListener('click',function() {
                        console.log("zefra-mode btton click");
                    });
                    break;
                }
            }
        }
        //只在乱斗模式开启时加载
        if(game.syncMenu !== undefined && game.syncMenu) {
            addScene();
            lib.arenaReady.push(buttonInit);
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