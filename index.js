const app = {
    data() {
        return {
            index: 0,
        }
    },
    methods: {
        selectIndex(value){
            this.index = value;
        }
    }
}
Vue.createApp(app).mount('#body')