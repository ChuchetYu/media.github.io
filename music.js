// import local_music from './music.json'
// data：定义一些需要使用的数据变量或者常量
// computed：同data一样，可以定义变量，变量的值通过方法计算得到
// watch：用于监听数据变化，等同于给数据绑定的onchange事件，一旦数据值改变就会执行方法体
// created：初始化执行，在html加载之前进行，所以可以改变data中的值，但是不会触发change事件，也不会触发到watch
// mounted：初始化执行，在html加载之后进行，所以改变data定义变量的同时，会触发chang事件
// methods：定义方法体
const app = {
    data() {
        let array = musics();
        return {
            audio_name: array[0].name,
            audio_artist: array[0].artist,
            audio_url: array[0].url,
            audio_album: array[0].album,
            keyword: "",
            searching: false,
            index: 0,
            items: array,
            searchs: []
        }
    },
    methods: {
        selectIndex(value) {
            this.index = value;
            if (this.searching == true) {
                var item = this.searchs[value];
                this.audio_name = item.name;
                this.audio_artist = item.artist;
                this.audio_album = item.album;
                this.infoResult(item.id);
            } else {
                var item = this.items[value];
                this.audio_name = item.name;
                this.audio_artist = item.artist;
                this.audio_url = item.url;
                this.audio_album = item.album;
                let audio = this.$refs.player;
                audio.pause();
                audio.load();
                audio.play();
            }
        },
        searchClick(key) {
            let _this = this;
            $.ajax({
                url: 'https://api.zhuolin.wang/api.php?types=search&source=netease&count=30&name=' + key,
                dataType: "jsonp",
                success: function (jsonData) {
                    var array = [];
                    for (i = 0, len = jsonData.length; i < len; i++) {
                        let object = jsonData[i];
                        var item = {
                            id: object.id,
                            name: object.name,
                            gsid: 0,
                            artist: object.artist.join('、'),
                            url: '',
                            album: object.album,
                        }
                        array.push(item);
                    }
                    _this.searchs = array;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.error(XMLHttpRequest + textStatus + errorThrown);
                }
            });
        },
        infoResult(key) {
            let _this = this;
            $.ajax({
                url: 'https://api.zhuolin.wang/api.php?&types=url&source=netease&id=' + key,
                dataType: "jsonp",
                success: function (jsonData) {
                    let url = jsonData.url;
                    if(url.indexOf('http') != -1){
                        _this.audio_url = jsonData.url;
                        let audio = _this.$refs.player;
                        audio.pause();
                        audio.load();
                        audio.load();
                    }
                    else {
                        _this.album = '暂无播放源，自动播放下一首';
                        _this.finished();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.error(XMLHttpRequest + textStatus + errorThrown);
                }
            });
        },
        finished() {
            this.index += 1;
            if (this.index >= this.items.length) {
                this.index = 0;
            }
            this.selectIndex(this.index);
        },
        cancelClick() {
            this.keyword = '';
            this.searching = false;
        }
    },
    watch: {
        //监听变化
        keyword: function (value) {
            var string = value.replaceAll(' ', '');
            this.searching = string.length != 0;
            if (this.searching) {
                this.searchClick(value);
            }
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

function musics() {
    return [{
            "id": "4957",
            "name": "爱的代价",
            "gsid": "4733",
            "artist": "张艾嘉",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/4957.mp3",
            "album": "爱的代价"
        },
        {
            "id": "32270",
            "name": "最浪漫的事",
            "gsid": "6772",
            "artist": "赵咏华",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/32270.mp3",
            "album": "问心无愧"
        },
        {
            "id": "11730",
            "name": "一场游戏一场梦",
            "gsid": "6462",
            "artist": "王杰",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/11730.mp3",
            "album": "王杰 LPCD45"
        },
        {
            "id": "4764",
            "name": "分飞",
            "gsid": "6624",
            "artist": "徐怀钰",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/4764.mp3",
            "album": "Love"
        },
        {
            "id": "186976",
            "name": "天下有情人",
            "gsid": "6780",
            "artist": "周华健",
            "url": "http://mp3.jiuku.9ku.com/hot/2009/08-29/186976.mp3",
            "album": "周华健 & Friends"
        },
        {
            "id": "59205",
            "name": "栀子花开",
            "gsid": "2371",
            "artist": "何炅",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/08-22/59205.mp3",
            "album": "可以爱"
        },
        {
            "id": "827017",
            "name": "相思风雨中",
            "gsid": "55434",
            "artist": "张学友&汤宝如",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2016/04/09/rlwpuxmzfza.mp3",
            "album": "0"
        },
        {
            "id": "19117",
            "name": "爱我的人和我爱的人",
            "gsid": "6607",
            "artist": "游鸿明",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/19117.mp3",
            "album": "恋上游鸿明"
        },
        {
            "id": "22602",
            "name": "爱我别走",
            "gsid": "6728",
            "artist": "张震岳",
            "url": "http://mp3.jiuku.9ku.com/new/2004/07-13/22602.mp3",
            "album": "岳慢岳快"
        },
        {
            "id": "43955",
            "name": "风雨无阻",
            "gsid": "6780",
            "artist": "周华健",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/43955.mp3",
            "album": ""
        },
        {
            "id": "34860",
            "name": "橄榄树",
            "gsid": "6504",
            "artist": "齐豫",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/34860.mp3",
            "album": "骆驼 飞鸟 鱼"
        },
        {
            "id": "11417",
            "name": "大海",
            "gsid": "6722",
            "artist": "张雨生",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/11417.mp3",
            "album": "大海"
        },
        {
            "id": "29821",
            "name": "约定",
            "gsid": "7028",
            "artist": "周蕙",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/29821.mp3",
            "album": "蕙儿绝版"
        },
        {
            "id": "58020",
            "name": "忘记你我做不到",
            "gsid": "1947",
            "artist": "张学友",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-20/58020.mp3",
            "album": "环球巨星影音启示录"
        },
        {
            "id": "22205",
            "name": "因为爱所以爱",
            "gsid": "2038",
            "artist": "谢霆锋",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/22205.mp3",
            "album": "英皇钢琴热恋系列 - 谢霆锋"
        },
        {
            "id": "49772",
            "name": "女人花",
            "gsid": "4391",
            "artist": "梅艳芳",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/49772.mp3",
            "album": "芳踪乍现"
        },
        {
            "id": "668405",
            "name": "爱情转移",
            "gsid": "2375",
            "artist": "陈奕迅",
            "url": "http://mp3.jiuku.9ku.com/upload/2017/04/07/668405.m4a",
            "album": ""
        },
        {
            "id": "9411",
            "name": "黄昏",
            "gsid": "2815",
            "artist": "周传雄",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/9411.mp3",
            "album": ""
        },
        {
            "id": "41266",
            "name": "后来",
            "gsid": "4780",
            "artist": "刘若英",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/41266.mp3",
            "album": "收获"
        },
        {
            "id": "24889",
            "name": "伤心太平洋",
            "gsid": "1853",
            "artist": "任贤齐",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/24889.mp3",
            "album": "情义"
        },
        {
            "id": "46965",
            "name": "勇气",
            "gsid": "4854",
            "artist": "梁静茹",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/46965.mp3",
            "album": "爱的大游行Live全记录"
        },
        {
            "id": "20013",
            "name": "好人一生平安",
            "gsid": "6915",
            "artist": "李娜",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/20013.mp3",
            "album": "影视歌曲集"
        },
        {
            "id": "1601",
            "name": "涛声依旧",
            "gsid": "6947",
            "artist": "毛宁",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-13/1601.mp3",
            "album": "了无牵挂"
        },
        {
            "id": "42702",
            "name": "遇见",
            "gsid": "6517",
            "artist": "孙燕姿",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/42702.mp3",
            "album": "燕姿HIGH翻垦丁"
        },
        {
            "id": "53860",
            "name": "倩女幽魂",
            "gsid": "2070",
            "artist": "张国荣",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2016/05/06/53860.mp3",
            "album": ""
        },
        {
            "id": "49771",
            "name": "一生爱你千百回",
            "gsid": "4391",
            "artist": "梅艳芳",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/49771.mp3",
            "album": "芳踪乍现"
        },
        {
            "id": "66311",
            "name": "偏偏喜欢你",
            "gsid": "6015",
            "artist": "陈百强",
            "url": "http://mp3.jiuku.9ku.com/hot/2005/06-23/66311.mp3",
            "album": ""
        },
        {
            "id": "37778",
            "name": "独角戏",
            "gsid": "6648",
            "artist": "许茹芸",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/37778.mp3",
            "album": "茹此精彩13首 (台湾版)"
        },
        {
            "id": "643777",
            "name": "青春修炼手册",
            "gsid": "41950",
            "artist": "TFBOYS",
            "url": "http://mp3.jiuku.9ku.com/hot/2014/07-23/643777.mp3",
            "album": "幸运符号"
        },
        {
            "id": "646253",
            "name": "喜欢你",
            "gsid": "50211",
            "artist": "G.E.M.邓紫棋",
            "url": "http://mp3.jiuku.9ku.com/mp3/647/646253.mp3",
            "album": ""
        },
        {
            "id": "468311",
            "name": "有点甜",
            "gsid": "2016",
            "artist": "汪苏泷",
            "url": "http://mp3.jiuku.9ku.com/hot/2012/06-28/468311.mp3",
            "album": "风度"
        },
        {
            "id": "828960",
            "name": "大鱼-动画电影《大鱼海棠》印象曲",
            "gsid": "51168",
            "artist": "周深",
            "url": "http://mp3.jiuku.9ku.com/upload/320/2016/05/23/828960.mp3",
            "album": "大鱼"
        },
        {
            "id": "858423",
            "name": "告白气球",
            "gsid": "2036",
            "artist": "周杰伦",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2017/02/05/858423.mp3",
            "album": "周杰伦的床边故事"
        },
        {
            "id": "465846",
            "name": "红尘情歌",
            "gsid": "12710",
            "artist": "高安",
            "url": "http://mp3.jiuku.9ku.com/hot/2012/03-30/465846.mp3",
            "album": "红尘情歌(单曲)"
        },
        {
            "id": "198982",
            "name": "说谎",
            "gsid": "11858",
            "artist": "林宥嘉",
            "url": "http://mp3.jiuku.9ku.com/hot/2009/10-23/198982.mp3",
            "album": "感官/世界：私藏LIVE影音特辑"
        },
        {
            "id": "176969",
            "name": "红色高跟鞋",
            "gsid": "4813",
            "artist": "蔡健雅",
            "url": "http://mp3.jiuku.9ku.com/hot/2008/11-21/176969.mp3",
            "album": "红色高跟鞋 (单曲)"
        },
        {
            "id": "855634",
            "name": "刚好遇见你",
            "gsid": "12404",
            "artist": "李玉刚",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2016/11/14/855634.mp3",
            "album": "刚好遇见你"
        },
        {
            "id": "64280",
            "name": "就是爱你",
            "gsid": "2251",
            "artist": "陶喆",
            "url": "http://mp3.jiuku.9ku.com/hot/2005/01-24/64280.mp3",
            "album": "太平盛世"
        },
        {
            "id": "654195",
            "name": "匆匆那年",
            "gsid": "2205",
            "artist": "王菲",
            "url": "http://mp3.jiuku.9ku.com/mp3/655/654195.mp3",
            "album": "匆匆那年"
        },
        {
            "id": "41813",
            "name": "晴天",
            "gsid": "2036",
            "artist": "周杰伦",
            "url": "http://mp3.jiuku.9ku.com/hot/2004/07-17/41813.mp3",
            "album": "叶惠美"
        },
        {
            "id": "864211",
            "name": "尽头",
            "gsid": "59056",
            "artist": "赵方婧",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2017/08/07/864211.mp3",
            "album": "尽头"
        },
        {
            "id": "468350",
            "name": "卜卦",
            "gsid": "24126",
            "artist": "崔子格",
            "url": "http://mp3.jiuku.9ku.com/hot/2012/06-29/468350.mp3",
            "album": "卜卦"
        },
        {
            "id": "473290",
            "name": "一万个舍不得",
            "gsid": "36916",
            "artist": "庄心妍",
            "url": "http://mp3.jiuku.9ku.com/hot/2012/11-01/473290.mp3",
            "album": "一万个舍不得"
        },
        {
            "id": "473312",
            "name": "爱的世界只有你",
            "gsid": "12798",
            "artist": "祁隆",
            "url": "http://mp3.jiuku.9ku.com/hot/2012/11-02/473312.mp3",
            "album": "醉相思"
        },
        {
            "id": "467927",
            "name": "谁是我的郎",
            "gsid": "12287",
            "artist": "杨梓文祺",
            "url": "http://mp3.jiuku.9ku.com/hot/2012/06-13/467927.mp3",
            "album": ""
        },
        {
            "id": "599206",
            "name": "寂寞的人伤心的歌",
            "gsid": "3750",
            "artist": "龙梅子",
            "url": "http://mp3.jiuku.9ku.com/hot/2014/03-19/599206.mp3",
            "album": "寂寞的人伤心的歌"
        },
        {
            "id": "569801",
            "name": "风干的玫瑰",
            "gsid": "8617",
            "artist": "陈瑞",
            "url": "http://mp3.jiuku.9ku.com/hot/2013/12-01/569801.mp3",
            "album": "风干的玫瑰"
        },
        {
            "id": "667890",
            "name": "你不来我不老",
            "gsid": "12710",
            "artist": "高安",
            "url": "http://mp3.jiuku.9ku.com/upload/2015/11/20/667890.mp3",
            "album": "你不来我不老"
        },
        {
            "id": "462084",
            "name": "你会爱我到什么时候",
            "gsid": "12315",
            "artist": "陶钰玉",
            "url": "http://mp3.jiuku.9ku.com/upload/320/2016/10/10/462084.mp3",
            "album": "其实我们都寂寞"
        },
        {
            "id": "671177",
            "name": "逆流成河",
            "gsid": "35794",
            "artist": "金南玲",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2016/04/07/671177.mp3",
            "album": "来生"
        },
        {
            "id": "413197",
            "name": "新娘不是我",
            "gsid": "21719",
            "artist": "程响",
            "url": "http://mp3.jiuku.9ku.com/hot/2011/08-25/413197.mp3",
            "album": ""
        },
        {
            "id": "465846",
            "name": "红尘情歌",
            "gsid": "12710",
            "artist": "高安",
            "url": "http://mp3.jiuku.9ku.com/hot/2012/03-30/465846.mp3",
            "album": "红尘情歌"
        },
        {
            "id": "410255",
            "name": "哥哥妹妹",
            "gsid": "12395",
            "artist": "门丽",
            "url": "http://mp3.jiuku.9ku.com/hot/2011/04-16/410255.mp3",
            "album": "哥哥妹妹"
        },
        {
            "id": "639676",
            "name": "恋人心",
            "gsid": "35432",
            "artist": "魏新雨",
            "url": "http://mp3.jiuku.9ku.com/hot/2014/06-16/639676.mp3",
            "album": "恋人心"
        },
        {
            "id": "515550",
            "name": "以后的以后",
            "gsid": "36916",
            "artist": "庄心妍",
            "url": "http://mp3.jiuku.9ku.com/hot/2013/06-13/515550.mp3",
            "album": "错爱情歌"
        },
        {
            "id": "826500",
            "name": "星月神话",
            "gsid": "3637",
            "artist": "金莎",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2016/04/09/zqnfxcz3tss.mp3",
            "album": "神话"
        },
        {
            "id": "199040",
            "name": "我很快乐",
            "gsid": "4410",
            "artist": "刘惜君",
            "url": "http://mp3.jiuku.9ku.com/hot/2009/10-25/199040.mp3",
            "album": "爱情花园(正式版)"
        },
        {
            "id": "863559",
            "name": "过客",
            "gsid": "58987",
            "artist": "阿涵",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2017/07/27/863559.mp3",
            "album": "过客"
        },
        {
            "id": "857708",
            "name": "凉凉",
            "gsid": "780",
            "artist": "杨宗纬",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2017/01/09/857708.mp3",
            "album": "三生三世十里桃花"
        },
        {
            "id": "76536",
            "name": "认真的雪",
            "gsid": "2397",
            "artist": "薛之谦",
            "url": "http://mp3.jiuku.9ku.com/hot/2006/06-15/76536.mp3",
            "album": "薛之谦同名专辑"
        },
        {
            "id": "412564",
            "name": "那些年",
            "gsid": "2224",
            "artist": "胡夏",
            "url": "http://mp3.jiuku.9ku.com/hot/2011/07-28/412564.mp3",
            "album": "燃点"
        },
        {
            "id": "362117",
            "name": "忘记时间",
            "gsid": "136",
            "artist": "胡歌",
            "url": "http://mp3.jiuku.9ku.com/hot/2010/07-02/362117.mp3",
            "album": "仙剑奇侠传三"
        },
        {
            "id": "826434",
            "name": "一次就好",
            "gsid": "780",
            "artist": "杨宗纬",
            "url": "http://mp3.jiuku.9ku.com/upload/128/2016/04/09/sz24hdwtjwe.mp3",
            "album": "夏洛特烦恼"
        }
    ];
}