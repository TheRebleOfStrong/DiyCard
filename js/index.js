var app = new Vue({
  el:'#app',
  data:{
    rate:100,//缩放比例
    fileList:[],
    cardType:[],//卡牌种类
    cardList:[],//卡牌列表
    cardNature:[],//怪兽属性
    cardRace:[],//怪兽种族
    options:{
      type:'',//卡牌种类
      list:'',
      name:'',
      nature:'',
      race:'',
      level:1,
      avatar:'',
      desc:'',
      atk:'0',
      def:'0',
    },
    card:null,
    visible:false,
    data:[],
  },
  methods:{
    handleCancel () {
      this.visible = !this.visible;
    },
    //卡种切换
    typeChange (e) {
      this.cardList = this.cardType[e].list;
      this.options.list = this.cardList[0].key;
    },
    //上传图片
    uploadFile (e) {
      let file = e.target.files[0];
      if(file){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (res) => {
          this.options.avatar = res.target.result;
          this.card && this.card.resetDistance();
        };
      };
    },
    //创建卡牌
    createCard () {
      if(this.card === null){
        //首次
        let canvas = document.getElementById('canvas');
        let config = {};
        config.cardList = this.cardList;
        config.cardRace = this.cardRace;
        this.card = new CreateCard(canvas,this.options,config,this.rate/100);
      }else{
        this.card.options = this.options;
        this.card.rate =  this.rate/100;
        this.card.render();
      };
    },
    //生成卡牌图片
    renderCard () {
      let url = this.card.canvas.toDataURL();
      let obj = this.card.options;
      obj.id = new Date().getTime();
      obj.url = url;
      let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
      data = [obj,...data];
      this.data = data;
      localStorage.setItem('data',JSON.stringify(data));
      this.$message.success('该卡牌创建成功',3);
    },
    //读取数据
    load () {
      let data = localStorage.getItem('data');
      if(data){
        this.data = JSON.parse(data);
      };
    },
    //删除
    deleteCard (id) {
      let data = [];
      this.data = this.data.forEach(item => {
        if(item.id !== id){
          data.push(item);
        };
      });
      this.data = [...data];
      localStorage.setItem('data',JSON.stringify(this.data));
      this.$message.success('删除成功',3);
    },
  },
  mounted () {
    this.load ();
    
    const {cardType,cardNature,cardRace} = cardConfig;
    
    this.cardType = cardType;
    this.options.type = this.cardType[0].key;
    
    this.cardList = this.cardType[0].list;
    this.options.list = this.cardList[0].key;
    
    this.cardNature = cardNature;
    this.options.nature = this.cardNature[0].key;
    
    this.cardRace = cardRace;
    this.options.race = this.cardRace[0].key;
    
    //setTimeout(this.createCard,30);
  },
  watch:{
    rate (val) {
      this.card && this.card.resetDistance();
      this.createCard();
    },
    options:{
      deep:true,
      handler (now,old) {
        try{
          this.createCard();
        }catch (e){
          setTimeout(this.createCard,500);
        };
        
      }
    }
  }
})