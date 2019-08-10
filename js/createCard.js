class CreateCard {
  
  constructor (canvas,options,config,rate=1) {
    this.org = {
      w:697,
      h:1016
    };
    this.touch = false;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = options;
    this.config = config;
    this.rate = rate;
    this.num = 0;
    this.distance = {x:83*this.rate,y:184*this.rate};
    this.create();
  }
  
  /*制作*/
  create () {
    const {
      type='',
      list='',
      name='',
      nature='',
      race='',
      level=1,
      avatar='',
      desc='',
      atk=0,
      def=0
    } = this.options;
    
    const {cardList,cardRace} = this.config;
    
    //定义卡牌大小
    this.canvas.width = this.org.w*this.rate;
    this.canvas.height = this.org.h*this.rate;
    //清除
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    //绘制卡图
    if(avatar !== ''){
      let options = {};
      options.url = avatar;
      options.x = this.distance.x;
      options.y = this.distance.y;
      options.w = 532*this.rate;
      options.h = 532*this.rate;
      this.renderImage(options,1);
    };
    //绘制卡膜
    if(type !== '' && list !== ''){
      let options = {};
      options.url = './images/Card.png';
      options.sx = this.org.w*Number(list);
      options.sy = this.org.h*Number(type);
      options.sw = this.org.w;
      options.sh = this.org.h;
      options.x = 0;
      options.y = 0;
      options.w = this.canvas.width;
      options.h = this.canvas.height;
      this.renderImage(options);
    };
    //绘制属性
    if(type === '0'){
      let options = {};
      options.url = './images/nature.png';
      options.sx = 70*Number(nature);
      options.sy = 0;
      options.sw = 70;
      options.sh = 70;
      options.x = 578*this.rate;
      options.y = 44*this.rate;
      options.w = 70*this.rate;
      options.h = 70*this.rate;
      this.renderImage(options);
    };
    //绘制等级或阶级
    if(type === '0' && level){
      let distance = (553 - 12*44)/11;
      if(list === '5'){
        //阶级
        for(let i=1;i<=level;i++){
          let options = {};
          options.url = './images/level.png';
          options.sx = 0;
          options.sy = 44;
          options.sw = 44;
          options.sh = 44;
          options.x = (72 + (distance + 44)*(i - 1))*this.rate;
          options.y = 124*this.rate;
          options.w = 44*this.rate;
          options.h = 44*this.rate;
          this.renderImage(options);
        };
      }else{
        //等级
        for(let i=1;i<=level;i++){
          let options = {};
          options.url = './images/level.png';
          options.sx = 0;
          options.sy = 0;
          options.sw = 44;
          options.sh = 44;
          options.x = (581 - (distance + 44)*(i - 1))*this.rate;
          options.y = 124*this.rate;
          options.w = 44*this.rate;
          options.h = 44*this.rate;
          this.renderImage(options);
        };
      };
    };
    //绘制卡名
    if(name !== ''){
      let options = {};
      options.text = name;
      options.size = 50*this.rate;
      if(type === '0' && list !== '5'){
        //怪兽卡中除超量外，其余卡名均为黑色
        options.color = '#000';
      }else{
        options.color = '#fff';
      };
      options.x = 55*this.rate;
      options.y = 80*this.rate;
      options.family = 'DFLeiSho-SB,DFPLiShuW7-B5,方正隶变繁体';
      options.base = 'middle';
      this.renderText(options);
    };
    //渲染攻击力&守备力
    if(type === '0'){
      //守备力
      let options = {};
      options.text = 'DEF/ '+def;
      options.size = 32*this.rate;
      options.color = '#000';
      options.x = 640*this.rate;
      options.y = 928*this.rate;
      options.family = 'MatrixBoldSmallCaps';
      let def_Distance = this.renderText(options,1);
      //攻击力
      let opts = {
        ...options,
        text:'ATK/ '+atk,
        x:def_Distance - 20*this.rate,
      };
      opts.family = 'MatrixBoldSmallCaps';
      this.renderText(opts,1);
    }
    //渲染种族信息
    if(type === '0' && race !== ''){
      let txt = '【'+cardRace[race].name;
      if(list === '0'){
        //通常
        txt += '】';
      }else if(list === '1'){
        //效果
        txt += '／效果】';
      }else{
        txt += '／'+cardList[list].name+'／效果】';
      };
      let options = {};
      options.text = txt;
      options.size = 26*this.rate;
      options.x = 42*this.rate;
      options.y = 768*this.rate;
      options.family = 'DFLeiSho-SB,DFPLiShuW7-B5,方正隶变繁体';
      options.bold = '500';
      this.renderText(options);
    };
    //渲染效果描述
    if(desc !== ''){
      let options = {};
      options.text = desc;
      if(type === '0'){
        if(desc.length <= 120){
          options.size = 23*this.rate;
        }else if(desc.length <= 150){
          options.size = 21*this.rate;
        }else{
          options.size = 18*this.rate;
        };
      }else{
        if(desc.length < 216){
          options.size = 23*this.rate;
        }else if(desc.length < 269){
          options.size = 21*this.rate;
        }else{
          options.size = 19*this.rate;
        };
        
      };
      options.family = 'DFLeiSho-SB,DFPLiShuW7-B5,方正隶变繁体';
      options.x = 58*this.rate;
      options.y = type === '0' ? 794*this.rate : 766*this.rate;
      this.renderText(options,2);
    };
    if(this.num < 50){
      this.num++;
      window.requestAnimationFrame(this.create.bind(this));
    };
  }
  
  //绘制图片类
  renderImage = (options,type=0) => {
    let img = new Image();
    if(type === 0){
      const {url,sx,sy,sw,sh,x,y,w,h} = options;
      img.src = url;
      this.ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
    }else if(type === 1){
      const {url,x,y,w,h} = options;
      img.src = url;
      //图片渲染后
      if(img.width && img.width > 0){
        let img_w = w;
        let img_h = h;
        let type = 0;
        if(img.width / img.height < 1){
          //图片宽高比小于1
          img_h = (h*img.height / img.width);
          type = 0;
        }else{
          img_w = (w*img.width / img.height);
          type = 1;
        };
        this.clipperImage(img_w,img_h,type);
        this.ctx.drawImage(img,x,y,img_w,img_h);
      };
    };
  }
  
  //绘制文字类
  renderText = (options,type=0) => {
    const {color='#000',size,text,family,x,y,base='top',bold=''} = options;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = base;
    this.ctx.fillStyle = color;
    this.ctx.font = `${bold} ${size}px ${family}`;
    if(type === 0){
      if(this.ctx.measureText(text).width > 540*this.rate){
        this.ctx.font = `${540*this.rate / text.length - 2}px ${family}`;
      };
      this.ctx.fillText(text,x,y);
      return x;
    }else if(type === 1){
      this.ctx.fillText(text,x - this.ctx.measureText(text).width,y);
      return x - this.ctx.measureText(text).width;
    }else if(type === 2){
      let txt = text.split('');
      let max = 590*this.rate;
      let width = 0;
      let line = 0;
      txt.forEach(item => {
        width += this.ctx.measureText(item).width - 1;
        if(item === '\n'){
          width = 0;
          line ++;
          return;
        }else if(width > max){
          width = this.ctx.measureText(item).width - 1;
          line ++;
        };
        this.ctx.fillText(item,x + width - this.ctx.measureText(item).width - 1,y+size*line);
      });
    };
  }
  
  /*卡图裁剪*/
  clipperImage = (img_w,img_h,type) => {
    this.canvas.style.cursor = 'move';
    //获取坐标
    var position = [];
    //鼠标按下时
    this.canvas.onmousedown = (e) => {
      e.preventDefault();
      this.touch = true;
      //鼠标距离卡牌左侧距离
      let startX = e.offsetX;
      //鼠标距离卡牌顶部距离
      let startY = e.offsetY;
      position.push({x:startX,y:startY});
      //鼠标移动时
      this.canvas.onmousemove = (v) => {
        v.preventDefault();
        let moveX = v.offsetX;
        let moveY = v.offsetY;
        if(moveX < 0 || moveX > this.org.w*this.rate || moveY < 0 || moveY > this.org.h*this.rate){
          this.touch = false;
        };
        if(this.touch){
          position.push({x:moveX,y:moveY});
          //移动距离
          let x = this.distance.x;
          let y = this.distance.y;
          if(type === 0){
            y += position[position.length - 1].y - position[position.length - 2].y;
          }else{
            x += position[position.length - 1].x - position[position.length - 2].x;
          };
          if(y > 184*this.rate && type === 0){
            y = 184*this.rate;
          };
          if(y < 184*this.rate - (img_h - 532*this.rate) && type === 0){
            y = 184*this.rate - (img_h - 532*this.rate);
          };
          if(x > 83*this.rate && type === 1){
            x = 83*this.rate;
          };
          if(x < 83*this.rate - (img_w - 532*this.rate) && type === 1  ){
            x = 83*this.rate - (img_w - 532*this.rate);
          };
          this.distance =  {x,y};
          this.render();
        };
      };
    };
    //鼠标松开时
    document.body.onmouseup = (m) => {
      m.preventDefault();
      this.touch = false;
    };
  }
  
  /*重新绘制*/
  render = () => {
    this.num = 0;
    this.create();
  }
  
  // 重制坐标
  resetDistance = () => {
    this.distance = {x:83*this.rate,y:184*this.rate};
  }
  
}