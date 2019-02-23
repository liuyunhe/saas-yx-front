const conf = {
    base: "https://weiopn.oss-cn-beijing.aliyuncs.com",
    oldPath: '/pc_data_front/img/',
    newPath: '/new_platform/'
}

const handle = {
    getUrl(name, type, suffix) {
        if (!name) return '';
        suffix = suffix ? '.' + suffix : '.png';
        type = type ? type : 1;
        return conf.base + (type == 1 ? conf.oldPath : conf.newPath) + name + suffix;
    }
}

const commonImg = {
    close: {
        name: '关闭按钮',
        index: 'close',
        url: handle.getUrl('close_icon', 2),
        pos: [600, 115],
        size: [56, 56]
    },
    awardText: {
        name: '关闭按钮',
        index: 'awardText',
        url: handle.getUrl('award-text', 2),
        pos: [0, 0],
        size: [311, 76]
    },
    award: {
        name: '中奖图片',
        index: 'award',
        url: handle.getUrl('award_img', 2),
        pos: [0, 0],
        size: [283, 234]
    },
    noAward: {
        name: '未获奖图片',
        index: 'noAward',
        url: handle.getUrl('cry75@2x', 1),
        pos: [85, 373],
        size: [620, 345]
    },
    getAwardBg:{
    	name: '中奖弹框',
        index: 'getAwardBg',
        url: handle.getUrl('ques_award_bg', 2),
        pos: [0, 400],
        size: [562, 638]
    },
    getBtn: {
        name: '领取按钮',
        index: 'getBtn',
        url: handle.getUrl('ques_award_btn', 2),
        pos: [0, 763],
        size: [248, 54]
    },
    getAwardBgPai:{
    	name: '中奖弹框',
        index: 'getAwardBgPai',
        url: handle.getUrl('pai-alert-bg', 2),
        pos: [0, 400],
        size: [562, 638]
    },
    getBtnPai: {
        name: '领取按钮',
        index: 'getBtnPai',
        url: handle.getUrl('pai-btn', 2),
        pos: [0, 763],
        size: [248, 54]
    },
    knowBtn: {
        name: '知道了按钮',
        index: 'knowBtn',
        url: handle.getUrl('know-btn', 2),
        pos: [231, 905],
        size: [290, 74]
    },
    myAward: {
        name: '我的奖品',
        index: 'myAward',
        url: handle.getUrl('wodedjiangpin', 2),
        pos: [0, 0],
        size: [100, 100]
    },
    actNotes: {
        name: '活动说明',
        index: 'actNotes',
        url: handle.getUrl('huodongshuoming', 2),
        pos: [0, 0],
        size: [100, 100]
    },
    errorTip:{
    	name: '异常弹框',
        index: 'errorTip',
        url: handle.getUrl('error_bg', 2),
        pos: [85, 373],
        size: [593,686]
    },
    errorBtn:{
    	name: '异常弹框按钮',
        index: 'errorBtn',
        url: handle.getUrl('error_btn', 2),
        pos: [231, 905],
        size: [199, 69]
    }
}

const img = {
    ACT_FANPAIZI: {
        normal: {
            bg: {
                name: '背景',
                index: 'bg',
                url: handle.getUrl('fanpaizi-bg1', 2),
                pos: [0, 0],
                size: [750, 1208]
            },
            contentBg: {
                name: '牌子背景',
                index: 'contentBg',
                url: handle.getUrl('fanpaizi-bg2', 2),
                pos: [32, 400],
                size: [726, 730]
            },
            title: {
                name: '标题',
                index: 'title',
                url: handle.getUrl('fanpaizi-title', 2),
                pos: [30, 100],
                size: [620, 270]
            },
            tips: {
                name: '活动锦囊',
                index: 'tips',
                url: handle.getUrl('fanpaizi-tips', 2),
                pos: [599, 32],
                size: [120, 160]
            },
        },
        item: {
            item0: {
                name: '牌子',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [89, 571],
                size: [175, 240]
            },
            item1: {
                name: '牌子2',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [287, 571],
                size: [175, 240]
            },
            item2: {
                name: '牌子3',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [486, 571],
                size: [175, 240]
            },
            item3: {
                name: '牌子4',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [89, 826],
                size: [175, 240]
            },
            item4: {
                name: '牌子5',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [287, 826],
                size: [175, 240]
            },
            item5: {
                name: '牌子6',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [486, 826],
                size: [175, 240]
            },
        }
    },
    ACT_JIUGONGGE: {
        normal: {
            bg: {
                name: '背景',
                index: 'bg',
                url: handle.getUrl('jiugongge-bg', 2),
                pos: [0, 0],
                size: [750, 1208]
            },
            contentBg: {
                name: '牌子背景',
                index: 'contentBg',
                url: handle.getUrl('content-bg', 1),
                pos: [35, 600],
                size: [660, 560]
            },
            title: {
                name: '标题',
                index: 'title',
                url: handle.getUrl('jgg-banner', 2),
                pos: [63, 130],
                size: [622, 357]
            },
            subTitle: {
                name: '副标题',
                index: 'subTitle',
                url: handle.getUrl('JGG_title_text', 1),
                pos: [80, 500],
                size: [550, 100]
            },
            tips: {
                name: '活动锦囊',
                index: 'tips',
                url: handle.getUrl('JGG_HDJN', 1),
                pos: [638, 38],
                size: [98, 103]
            },
            drawBrn: {
                name: '抽奖按钮',
                index: 'drawBtn',
                url: handle.getUrl('jgg_ljcj', 2),
                pos: [265, 794],
                size: [195, 162]
            },
            
        },
        item: {
            item0: {
                name: '格子1',
                url: handle.getUrl('item_bg', 2),
                pos: [70, 632],
                size: [195, 162]
            },
            item1: {
                name: '格子2',
                url: handle.getUrl('item_bg', 2),
                pos: [265, 632],
                size: [195, 162]
            },
            item2: {
                name: '格子3',
                url: handle.getUrl('item_bg', 2),
                pos: [460, 632],
                size: [195, 162]
            },
            item3: {
                name: '格子4',
                url: handle.getUrl('item_bg', 2),
                pos: [70, 794],
                size: [195, 162]
            },
            item4: {
                name: '格子5',
                url: handle.getUrl('item_bg', 2),
                pos: [460, 794],
                size: [195, 162]
            },
            item5: {
                name: '格子6',
                url: handle.getUrl('item_bg', 2),
                pos: [70, 956],
                size: [195, 162]
            },
            item6: {
                name: '格子7',
                url: handle.getUrl('item_bg', 2),
                pos: [265, 956],
                size: [195, 162]
            },
            item7: {
                name: '格子8',
                url: handle.getUrl('item_bg', 2),
                pos: [460, 956],
                size: [195, 162]
            },
        }
    },
    ACT_QUESTION:{
    	normal:{
    		bg: {
                name: '背景',
                index: 'bg',
                url: handle.getUrl('ques_bg__2', 2),
                pos: [0, 0],
                size: [750, 1208]
            },
            contentBg: {
                name: '开始答题按钮',
                index: 'contentBg',
                url: handle.getUrl('ques_btn_2', 2),
                pos: [80, 1050],
                size: [318, 102]
            },
            title: {
                name: '标题',
                index: 'title',
                url: handle.getUrl('ques_title', 2),
                pos: [18, 100],
                size: [720, 468]
            },
            tips: {
                name: '活动规则',
                index: 'tips',
                url: handle.getUrl('ques_rule', 2),
                pos: [620, 32],
                size: [120, 120]
            },
            
    	},
    	question:{
    		Quesbg: {
                name: '答题背景',
                index: 'Quesbg',
                url: handle.getUrl('ques_bg_1', 2),
                pos: [0, 0],
                size: [750, 1208]
            },
            QuesActive: {
                name: '选中标识',
                index: 'QuesActive',
                url: handle.getUrl('right_1', 2),
                pos: [400, 550],
                size: [59, 34]
            },
            QuesWrong: {
                name: '选错标识',
                index: 'QuesWrong',
                url: handle.getUrl('wrong', 2),
                pos: [410, 650],
                size: [34, 34]
            },
            QuesbtnBg:{
            	name: '答题按钮',
                index: 'QuesbtnBg',
                url: handle.getUrl('ques_btn_1', 2),
                pos: [220, 1050],
                size: [318, 102]
            }
    	}
    },
    ACT_HONGBAOYU: {
        normal: {
            bg: {
                name: '背景',
                index: 'bg',
                url: handle.getUrl('red_bg', 2),
                pos: [0, 0],
                size: [750, 1208]
            },
            redPacket: {
                name: '红包',
                index: 'redPacket',
                url: handle.getUrl('red_img', 2),
                size: [240, 265],
                style: [
                    {w: '45px', h: '50px', t: '50px', l: '190px'},
                    {w: '58px', h: '65px', t: '84px', l: '100px'},
                    {w: '61px', h: '68px', t: '145px', l: '35px'},
                    {w: '55px', h: '61px', t: '148px', l: '129px'},
                    {w: '55px', h: '61px', t: '121px', l: '202px'},
                    {w: '73px', h: '82px', t: '225px', l: '-21px'},
                    {w: '69px', h: '76px', t: '213px', l: '60px'},
                    {w: '72px', h: '79px', t: '241px', l: '134px'},
                    {w: '68px', h: '75px', t: '194px', l: '211px'},
                    {w: '91px', h: '100px', t: '321px', l: '33px'},
                    {w: '75px', h: '82px', t: '321px', l: '190px'}
                ]
            }
        },
        rules: {
            bg: {
                name: '背景',
                index: 'bg',
                url: handle.getUrl('red_rules_bg', 2),
                pos: [0, 0],
                size: [750, 1208]
            },
            rulesBtn: {
                name: '规则按钮',
                index: 'rulesBtn',
                url: handle.getUrl('red_rules_btn', 2),
                pos: [0, 0],
                size: [130, 36]
            },
            btnImg: {
                name: '按钮图片',
                index: 'btnImg',
                url: handle.getUrl('red_rules_btn_img', 2),
                pos: [0, 0],
                size: [540, 96]
            }
        },
        downCount: {
            bg: {
                name: '背景',
                index: 'bg',
                url: handle.getUrl('red_downCount_bg', 2),
                pos: [643, 299],
                size: [750, 1208]
            },
            num1: {
                name: '数字1',
                index: 'num1',
                url: handle.getUrl('red_num1', 2),
                pos: [643, 299],
                size: [150, 214]
            },
            num2: {
                name: '数字2',
                index: 'num2',
                url: handle.getUrl('red_num2', 2),
                pos: [639, 303],
                size: [150, 214]
            },
            num3: {
                name: '数字3',
                index: 'num3',
                url: handle.getUrl('red_num3', 2),
                pos: [300, 639],
                size: [150, 214]
            }
        },
        tips: {
            winningImg: {
                name: '中奖弹窗',
                index: 'winningImg',
                url: handle.getUrl('red_winning_img', 2),
                pos: [46, 200],
                size: [610, 500]
            },
            notWinImg: {
                name: '未中奖弹窗',
                index: 'notWinImg',
                url: handle.getUrl('red_notWin_img', 2),
                pos: [46, 200],
                size: [610, 500]
            },
            drawBtn1: {
                name: '抽奖按钮1',
                index: 'drawBtn1',
                url: handle.getUrl('red_draw_btn1', 2),
                pos: [246, 754],
                size: [258, 66]
            },
            drawBtn2: {
                name: '抽奖按钮2',
                index: 'drawBtn2',
                url: handle.getUrl('red_draw_btn1', 2),
                pos: [246, 754],
                size: [258, 66]
            },
            tipsImg: {
                name: '提示语弹窗',
                index: 'tipsImg',
                url: handle.getUrl('red_tips_img', 2),
                pos: [92, 111],
                size: [528, 462]
            },
            tipsBtn1: {
                name: '提示按钮1',
                index: 'tipsBtn1',
                url: handle.getUrl('red_tips_btn1', 2),
                pos: [114, 609],
                size: [230, 66]
            },
            tipsBtn2: {
                name: '提示按钮2',
                index: 'tipsBtn2',
                url: handle.getUrl('red_tips_btn2', 2),
                pos: [389, 609],
                size: [227, 66]
            },
        },
        share: {
            icon: {
                name: '分享图标',
                index: 'icon',
                url: handle.getUrl('red_share_img', 2),
                pos: [],
                size: []
            }
        }
    }
}

export default {img, commonImg};