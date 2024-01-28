import { ZefraUtil as util } from './util.js';
import { ZefraGameMode as gmode } from './gamemode.js';
game.import("extension",function(lib,game,ui,get,ai,_status)
{
    //创建我们自己的环境
    let CreateEv = function() {
        //创建自己的环境 lib.game
        if(!game.zefraEv) {
            //设置我们当前扩展的路径
            let lastIndex = window.location.href.lastIndexOf('/');
            let result = window.location.href.substring(0, lastIndex + 1);
            let href = `${result}/extension/${util.ZefraNamePackage}`; 
            //初始化环境
            util.Init(lib,game,ui,get,ai,_status,result);
            game.zefraEv = {
                modeName:'山河图',
                intervalLoop:0,
                expath:href,//扩展的主路径
                cardDiv:[],//存放我们开局选择框的div
                zCards:[],//存放当前的zCards对象
                warfaresDiv:[],//存放当前的战法选择框的div
                warfares:[],
                originalStartButton:null,//原始开始按钮
                divviewport:null,//菜单主容器
                loadCss:function(name) {
                    //加载css样式
                    let link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = `${game.zefraEv.expath}/css/${name}.css`; 
                    // 将link元素添加到文档的head中
                    document.head.appendChild(link);
                },
                warfareebuttonClick:function(div,index) {
                    'step 2'
                    //选择战法
                    gmode.SetModeData(game.zefraEv.warfares[index]);
                    gmode.NextStep();
                },
                selectbuttonClick:function(div,index,textContainer,cardContainer) {
                    'step 1'
                    //选择完毕之后，保存我们当前的武将卡
                    gmode.SetModeData(game.zefraEv.zCards[index]);
                    //进入下一步
                    gmode.NextStep();
                    util.RemoveElement(cardContainer,false);
                    //加载下一个战法
                    textContainer.innerText = '请选择初始的战法';
                    textContainer.style.color = 'rgb(108, 175, 230)';          
                    let viewport = game.zefraEv.divviewport;
                    let warfareContainer = cardContainer;//用旧的就行
                    viewport.appendChild(warfareContainer);
                    let warfaresDiv = game.zefraEv.warfaresDiv;
                    let warfares = game.zefraEv.warfares;
                    for (let index = 0; index < 4; index++) {
                        let [_warfare,_wfare] = util.GetRandomWarFareUI(warfareContainer);
                        _warfare.addEventListener('click',function() {
                            for (let index = 0; index < game.zefraEv.warfaresDiv.length; index++) {
                                const element = game.zefraEv.warfaresDiv[index];
                                if(element == this) {
                                    element.style.filter = "none";
                                    if(element.querySelectorAll(".warfareSelectButton").length <= 0) {
                                        //创建button按钮
                                        let warfareSelectButton = document.createElement('div');
                                        warfareSelectButton.className = 'warfareSelectButton';
                                        warfareSelectButton.innerText = '选择';
                                        warfareSelectButton.addEventListener('click',function() {
                                            game.zefraEv.warfareebuttonClick(this,index);
                                        });
                                        this.appendChild(warfareSelectButton);
                                    }
                                } else {
                                    element.style.filter = "blur(2px)";
                                    //如果存在就移除当前上面的button按钮
                                    let buttons = element.querySelectorAll(".warfareSelectButton");
                                    util.RemoveElements(buttons);
                                }
                            }
                        });
                        warfaresDiv.push(_warfare);
                        warfares.push(_wfare);
                    }
                    
                    //删除环境
                    // let meunDiv = document.querySelectorAll('.noupdate.character.scroll1');
                    // meunDiv[0].delete();
                    
                },
                startbuttonclick:function(div) {
                    //开始模式
                    gmode.StartMode();
                    game.zefraEv.cardDiv = [];
                    'step 0'
                    //开始按钮
                    let viewport = game.zefraEv.divviewport;
                    //鼠标右击取消 contextmenu
                    viewport.addEventListener('contextmenu',function() {
                        if(!gmode.IsMode() || !game.zefraEv || !game.zefraEv.cardDiv) return;
                        if(gmode.GetModeStep() == gmode.Type.SELECT_CHARACTER_BEFORE_DUEL) {
                            for (let index = 0; index <  game.zefraEv.cardDiv.length; index++) {
                                const ediv = game.zefraEv.cardDiv[index];
                                ediv.style.filter = "none";
                                let buttons = ediv.querySelectorAll(".cardSelectButton");
                                if(buttons.length > 0) ediv.removeChild(buttons[0]);
                            }
                        } else if(gmode.GetModeStep() == gmode.Type.SELECT_WARFARE_BEFORE_DUEL) {
                            //选择战法时的重置
                            for (let index = 0; index < game.zefraEv.warfaresDiv.length; index++) {
                                const element = game.zefraEv.warfaresDiv[index];
                                element.style.filter = "none";
                                //移除所有按钮
                                let buttons = element.querySelectorAll(".warfareSelectButton");
                                util.RemoveElements(buttons);
                            }
                        }

                    });
                    //请选择出征的武将
                    let textContainer = document.createElement('div');
                    textContainer.className = 'textContainer';
                    textContainer.innerText = '请选择要出征的武将';
                    viewport.appendChild(textContainer);
                    //武将容器
                    let cardContainer = document.createElement('div');
                    cardContainer.className = 'zefracardContainer';
                    viewport.appendChild(cardContainer);
                    //插入武将
                    let nameArray = [];
                    for (let index = 0; index < 5; index++) {
                        let zcard = util.GetRandomCard();
                        if(nameArray.includes(zcard.name)) {
                            //重新抽
                            index--;
                            continue;
                        }
                        nameArray.push(zcard.name);
                        game.zefraEv.zCards.push(zcard);
                        let card = document.createElement('div');
                        card.classList.add('zefracard',`zefracardindex${index}`);
                        cardContainer.appendChild(card);
                        let generalCard = document.createElement('div');
                        generalCard.className = 'generalCard';
                        card.appendChild(generalCard);
                        generalCard.style.backgroundImage = `url(${zcard.imageurl})`;
                        let textnameDiv = document.createElement('div');
                        textnameDiv.className = 'textnameDiv';
                        generalCard.appendChild(textnameDiv);
                        //血条
                        let lpDiv = document.createElement('div');
                        lpDiv.className = 'lpDiv';
                        generalCard.appendChild(lpDiv);
                        //血量
                        let lpNumberDiv = document.createElement('div');
                        lpNumberDiv.className = 'lpNumberDiv';
                        lpNumberDiv.innerText = zcard.maxLp;
                        generalCard.appendChild(lpNumberDiv);
                        //判断名称以用不同颜色盒子装载
                        let doublekey = '';
                        let namnecontext = '';
                        let first = false;
                        let last = false;
                        for (let index = 0; index < zcard.textName.length; index++) {
                            let key = zcard.textName[index];
                            if(index <= 1) doublekey += key;
                            if(!first && util.cardNameTitle.includes(key) && 
                            (zcard.textName.length - (index + 1 )) >= 2 ) {
                                first = true;
                                //包含第一个名称
                                let titleSpan = document.createElement('span');
                                titleSpan.className = 'textnameTitle1';
                                textnameDiv.appendChild(titleSpan);
                                if(key === '星') key = "★";
                                titleSpan.innerText = key;
                            } else if(!last && util.cardNameTitle2.includes(doublekey)
                            && (zcard.textName.length - (index + 1 )) >= 2) {
                                last = true;
                                let titleSpan2 = document.createElement('span');
                                titleSpan2.className = 'textnameTitle2';
                                textnameDiv.appendChild(titleSpan2);
                                if(doublekey === '手杀') doublekey = '📱';
                                else if(doublekey === '新杀') doublekey = '新';
                                titleSpan2.innerText = doublekey;
                                //需要移除第一个字符
                                namnecontext =  namnecontext.slice(1);
                            } else {
                                namnecontext += key;
                            }
                        }
                        let titleConetxt = document.createElement('span');
                        titleConetxt.className = 'textnameContext';
                        textnameDiv.appendChild(titleConetxt);//名称
                        titleConetxt.innerText = namnecontext;
                        //创建新的div用于存放势力
                        let campDiv = document.createElement('div');
                        campDiv.className = 'textCamp';
                        generalCard.classList.add(zcard.camp);
                        campDiv.innerText = zcard.textCamp;
                        generalCard.appendChild(campDiv);
                        //品质
                        let qualityDiv = document.createElement('div');
                        qualityDiv.className = 'quality';
                        qualityDiv.style.backgroundImage = `url(${zcard.qualityeUrl})`;
                        generalCard.appendChild(qualityDiv);
                        //技能描述
                        let skilldesDiv = document.createElement('div');
                        skilldesDiv.className = 'skilldesDiv';
                        for (let j = 0; j < zcard.textskillArray.length; j++) {
                            let skillname = zcard.textskillArray[j];
                            let skillspan1 = document.createElement('span');
                            skillspan1.classList.add (`skillspan1_${j}`,zcard.camp);
                            skillspan1.innerText = skillname;
                            let skillinfo = zcard.textskillinfoArray[j];
                            let skillspan2 = document.createElement('span');
                            skillspan2.className = `skillspan2_${j}`;
                            skillspan2.innerText = `:${skillinfo}\n`;
                            // strinfo += `  ${skillname}:${skillinfo}\n`;
                            skilldesDiv.appendChild(skillspan1);
                            skilldesDiv.appendChild(skillspan2);
                        }
                        // skilldesDiv.innerText = strinfo;
                        card.appendChild(skilldesDiv);
                        card.addEventListener('click',function() {
                            for (let index = 0; index <  game.zefraEv.cardDiv.length; index++) {
                                const ediv = game.zefraEv.cardDiv[index];
                                let buttons = ediv.querySelectorAll(".cardSelectButton");
                                if(buttons.length > 0) ediv.removeChild(buttons[0]);
                                if(ediv == this) {
                                    ediv.style.filter = "none";
                                    let cardSelectButton = document.createElement('div');
                                    cardSelectButton.className = 'cardSelectButton';
                                    cardSelectButton.innerText = '选择';
                                    card.appendChild(cardSelectButton);
                                    cardSelectButton.style.visibility  = 'visible';
                                    cardSelectButton.addEventListener('click',function() {
                                        game.zefraEv.selectbuttonClick(this,index,textContainer,cardContainer);
                                    });
                                } else {
                                    ediv.style.filter = "blur(2px)"; // 应用5像素的高斯模糊效果
                                }
                            }
                        });
                        game.zefraEv.cardDiv.push(card);
                    }
                },
                dialogbuttonclick:function(div) {
                    //如果当前不是div激活则跳过
                    if(!div.classList.contains('active')) return false;
                    //获取到视口div
                    let viewport = null;
                    let startButton = null;
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
                            } else {
                                //替换事件
                                game.zefraEv.originalStartButton = child;
                                // 克隆div元素，不包括事件监听器
                                let clonedChild = child.cloneNode(true);
                                // 用克隆的div替换原始的div
                                child.parentNode.replaceChild(clonedChild, child);
                                startButton = clonedChild;
                                //添加新的按钮事件
                                startButton.addEventListener("click",function() {
                                    game.zefraEv.startbuttonclick(this);
                                }); 
                            }
                        }
                    }
                    if(viewport == null) return false;
                    game.zefraEv.divviewport = viewport;
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
                    viewport.style.borderRadius = '8px';
                    //创建居中图像的盒子
                    let centerViewport = document.createElement('div');
                    centerViewport.className = 'zefraCenterViewport';
                    let titleViewport = document.createElement('div');
                    titleViewport.className = 'zefraTitleViewport';
                    titleViewport.innerText = "山河图";
                    //添加div
                    viewport.appendChild(centerViewport);
                    viewport.appendChild(titleViewport);

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
                else if(zefraEv.intervalLoop > 9) {
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