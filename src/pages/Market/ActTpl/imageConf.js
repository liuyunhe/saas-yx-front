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
        url: handle.getUrl('home_close', 2),
        pos: [632, 141],
        size: [60, 60]
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
        url: handle.getUrl('ic-awardgift', 2),
        pos: [0, 0],
        size: [750, 1208]
    },
    noAward: {
        name: '未获奖图片',
        index: 'noAward',
        url: handle.getUrl('cry75@2x', 1),
        pos: [85, 373],
        size: [620, 345]
    },
    getBtn: {
        name: '领取按钮',
        index: 'getBtn',
        url: handle.getUrl('djlq_btn', 2),
        pos: [0, 933],
        size: [373, 84]
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
                size: [693, 724]
            },
            title: {
                name: '标题',
                index: 'title',
                url: handle.getUrl('fanpaizi-title', 2),
                pos: [70, 100],
                size: [555, 297]
            },
            tips: {
                name: '活动锦囊',
                index: 'tips',
                url: handle.getUrl('fanpaizi-tips', 2),
                pos: [654, 32],
                size: [92, 106]
            },
        },
        item: {
            item0: {
                name: '牌子',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [89, 571],
                size: [173, 237]
            },
            item1: {
                name: '牌子2',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [287, 571],
                size: [173, 237]
            },
            item2: {
                name: '牌子3',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [486, 571],
                size: [173, 237]
            },
            item3: {
                name: '牌子4',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [89, 826],
                size: [173, 237]
            },
            item4: {
                name: '牌子5',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [287, 826],
                size: [173, 237]
            },
            item5: {
                name: '牌子6',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [486, 826],
                size: [173, 237]
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
    }
}

export default {img, commonImg};