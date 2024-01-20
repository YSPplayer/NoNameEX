game.import("extension",function(lib,game,ui,get,ai,_status)
{
    //创建我们自己的环境
    let CreateEv = function() {
        //创建自己的环境
        if(!lib.game.zefraEv) {
            //设置我们当前扩展的路径
            let lastIndex = window.location.href.lastIndexOf('/');
            let result = window.location.href.substring(0, lastIndex + 1);
            let href = `${result}/extension/小shu扩展`; 
            game.zefraEv = {
                modeName:'山河图',
                intervalLoop:0,
                expath:href,//扩展的主路径
                loadCss:function(name) {
                    //加载css样式
                    let link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = `${game.zefraEv.expath}/css/${name}.css`; 
                    // 将link元素添加到文档的head中
                    document.head.appendChild(link);
                },
                dialogbuttonclick:function(div) {
                    //如果当前不是div激活则跳过
                    if(!div.classList.contains('active')) return false;
                    //获取到视口div
                    let viewport = null;
                    let divs = document.querySelectorAll('.content');
                    if(!divs || divs.length <= 0) return false;
                    let children = divs[0].children;
                    for (let i = 0; i < children.length; i++) {
                        let child = children[i];
                        // 确保子元素是div并且没有类名
                        if (child.tagName === 'DIV') {
                            if(child.classList.length == 0) {
                                viewport = child;
                            } else if(child.classList.contains('caption') || (child.classList.contains('text') && child.classList.contains('center'))) {
                                // 移除该 div 及其所有子元素
                                child.parentNode.removeChild(child);
                                //移除之后需要减去索引
                                i--;
                            }
                        }
                    }
                    if(viewport == null) return false;
                    //移除视口div下的所有元素
                    while (viewport.firstChild) {
                        viewport.removeChild(viewport.firstChild);
                    }
                    //加载css文件
                    game.zefraEv.loadCss('menu');
                    // 设置背景图片的样式
                    viewport.style.backgroundImage = `url(${game.zefraEv.expath}/source/rogueBg.jpg)`; 
                    console.log(`${game.zefraEv.expath}/source/rogueBg.jpg`)
                    viewport.style.backgroundSize = '100% 100%'; //铺满
                    viewport.style.backgroundRepeat = 'no-repeat';
                    viewport.style.height = '100%';
                    //创建居中图像的盒子
                    var centerViewport = document.createElement('div');
                    centerViewport.className = 'centerViewport';
                    //添加div
                    viewport.appendChild(centerViewport);
                }
            }
        }
    }
    CreateEv();
return {
    name:"小shu扩展",
    content:function(config,pack){
        //进入游戏主界面触发该函数事件
        //添加场景
        let addScene = function(zefraEv) {
            let modeName = zefraEv.modeName;
            if(lib.storage.scene === undefined) return;
            let scene = {
                name:modeName,//模式名
                intro:[]
            } ;
            delete lib.storage.scene[modeName]
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
                            modeDiv.addEventListener('click', function() {
                                //这个是我们的点击函数，在官方的click之后触发
                                zefraEv.dialogbuttonclick(this);
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