// import local_film from './film.json'
// data：定义一些需要使用的数据变量或者常量
// computed：同data一样，可以定义变量，变量的值通过方法计算得到
// watch：用于监听数据变化，等同于给数据绑定的onchange事件，一旦数据值改变就会执行方法体
// created：初始化执行，在html加载之前进行，所以可以改变data中的值，但是不会触发change事件，也不会触发到watch
// mounted：初始化执行，在html加载之后进行，所以改变data定义变量的同时，会触发chang事件
// methods：定义方法体
const app = {
    data() {
        let array = films();
        return {
            video_name: array[0].name,
            video_url: array[0].url,
            keyword: "",
            items: array,
        }
    },
    methods: {
        selectIndex(value) {
            var item = this.items[value];
            this.video_name = item.name;
            this.video_url = item.url;
            var video = this.$refs.player;
            video.pause();
            video.load();
            video.play();
        },
        cancelClick() {
            var string = this.keyword.replaceAll(' ', '');
            if (string.length == 0) {
                alert('关键字不能为空');
            } else {
                var play = 'https://z1.m1907.cn/?jx=' + this.keyword;
                this.keyword = '';
                console.log(play);
                window.location.href = play;
            }
        }
    },
    watch: {
        //监听变化
        keyword: function (value) {
            
        }
    },
    mounted() {
        //页面加载完执行
    }
}
Vue.createApp(app).mount('body')


window.onload = function () {
    // 执行代码
}

function films() {
    return [{
            "name": "警察局",
            "url": "https://new.iskcd.com/20220128/1CYrnvAM/index.m3u8"
        },
        {
            "name": "神探罗蒙",
            "url": "https://v5.szjal.cn/20201205/kdpbnBuC/index.m3u8"
        },
        {
            "name": "逗鸟外传：萌宝满天飞",
            "url": "https://vod.bunediy.com/20201123/rqAlJWrH/index.m3u8"
        },
        {
            "name": "东北轴神",
            "url": "https://n1.szjal.cn/20210307/sz2152Gl/index.m3u8"
        },
        {
            "name": "放课后苏打日和特别版",
            "url": "https://v4.szjal.cn/20200725/uYx7TxBo/index.m3u8"
        },
        {
            "name": "神探",
            "url": "https://v4.szjal.cn/20200409/fP2v6hzW/index.m3u8"
        },
        {
            "name": "误杀瞒天记",
            "url": "https://cdn.zoubuting.com/20210705/0RnEUC2x/index.m3u8"
        },
        {
            "name": "编剧情缘",
            "url": "https://v3.szjal.cn/20200208/MSrkqPX8/index.m3u8"
        },
        {
            "name": "东北恋歌",
            "url": "https://c1.monidai.com/20211030/1dhN4A7M/index.m3u8"
        },
        {
            "name": "情人节",
            "url": "https://v4.szjal.cn/20200513/QLHtWVRA/index.m3u8"
        },
        {
            "name": "昆仑道经",
            "url": "https://v4.szjal.cn/20200405/pI0CMe65/index.m3u8"
        },
        {
            "name": "雄狮少年",
            "url": "https://new.iskcd.com/20220204/oeJHWRgX/index.m3u8"
        },
        {
            "name": "这个杀手不太冷",
            "url": "https://v4.szjal.cn/20190928/NDDzRMjl/index.m3u8"
        },
        {
            "name": "望春风",
            "url": "https://vod.bunediy.com/20200503/Kv01I1Av/index.m3u8"
        },

        {
            "name": "报告老板之豪言壮旅",
            "url": "https://v2.szjal.cn/20190406/t8KbevMH/index.m3u8"
        },
        {
            "name": "正午的恋爱",
            "url": "https://v4.szjal.cn/20200816/hjdcedVJ/index.m3u8"
        },
        {
            "name": "招魂",
            "url": "https://vod.bunediy.com/20200509/ati4Yfl4/index.m3u8"
        },
        {
            "name": "新白蛇传之九尾狐",
            "url": "https://cdn.zoubuting.com/20210629/EMATg9SJ/index.m3u8"
        },
        {
            "name": "小生怕怕",
            "url": "https://new.iskcd.com/20220203/zdj7LVBj/index.m3u8"
        },
        {
            "name": "举起手来",
            "url": "https://vod.bunediy.com/20200508/2ZkYVE6o/index.m3u8"
        },
        {
            "name": "断片之险途夺宝",
            "url": "https://v4.szjal.cn/20200806/qRtTVF05/index.m3u8"
        },
        {
            "name": "血恋",
            "url": "https://vod.bunediy.com/20200709/q9eCW1If/index.m3u8"
        },
        {
            "name": "西虹市首富",
            "url": "https://cdn.zoubuting.com/20210706/Xh9hol2T/index.m3u8"
        },
        {
            "name": "夏洛特烦恼",
            "url": "https://cdn.zoubuting.com/20210704/2UnyfCqh/index.m3u8"
        },
        {
            "name": "非诚勿扰",
            "url": "https://cdn.zoubuting.com/20210704/FxnsawZo/index.m3u8"
        },
        {
            "name": "大师兄",
            "url": "https://cdn.zoubuting.com/20210717/tgQ2gOvG/index.m3u8"
        },
        {
            "name": "樱桃",
            "url": "https://v3.szjal.cn/20200225/VPMWe9aN/index.m3u8"
        }
    ];
}