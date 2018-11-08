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
    award: {
        name: 'award',
        url: handle.getUrl('ic-awardgift', 2),
        pos: [0, 0],
        size: [750, 1208]
    },
    noAward: {
        name: 'noAward',
        url: handle.getUrl('cry75@2x', 1),
        pos: [0, 0],
        size: [750, 1208]
    },
    getBtn: {
        name: 'getBtn',
        url: handle.getUrl('djlq_btn', 2),
        pos: [0, 0],
        size: [750, 1208]
    },
    knowBtn: {
        name: 'knowBtn',
        url: handle.getUrl('know-btn', 2),
        pos: [0, 0],
        size: [290, 74]
    },
    myAward: {
        name: 'myAward',
        url: handle.getUrl('wodedjiangpin', 2),
        pos: [0, 0],
        size: [100, 100]
    },
    actNotes: {
        name: 'actNotes',
        url: handle.getUrl('huodongshuoming', 2),
        pos: [0, 0],
        size: [100, 100]
    }
}

const img = {
    ACT_FANPAIZI: {
        normal: {
            bg: {
                name: 'bg',
                url: handle.getUrl('fanpaizi-bg1', 2),
                pos: [0, 0],
                size: [750, 1208]
            },
            contentBg: {
                name: 'contentBg',
                url: handle.getUrl('fanpaizi-bg2', 2),
                pos: [32, 400],
                size: [693, 724]
            },
            title: {
                name: 'title',
                url: handle.getUrl('fanpaizi-title', 2),
                pos: [70, 100],
                size: [555, 297]
            },
            tips: {
                name: 'tips',
                url: handle.getUrl('fanpaizi-tips', 2),
                pos: [654, 32],
                size: [92, 106]
            },
        },
        item: {
            item0: {
                name: 'item0',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [89, 571],
                size: [173, 237]
            },
            item1: {
                name: 'item1',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [287, 571],
                size: [173, 237]
            },
            item2: {
                name: 'item2',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [486, 571],
                size: [173, 237]
            },
            item3: {
                name: 'item3',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [89, 826],
                size: [173, 237]
            },
            item4: {
                name: 'item4',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [287, 826],
                size: [173, 237]
            },
            item5: {
                name: 'item5',
                url: handle.getUrl('fanpaizi-card', 2),
                pos: [486, 826],
                size: [173, 237]
            },
        }
    }
}

export default {img, commonImg};