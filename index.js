//声明全局变量
var index = 0,//当前显示图片的索引
    timer = null,//定时器
    main = byId('main'),
    prev = byId("prev"),//上一张
    next = byId('next'),//下一张
    pics = byId('banner').getElementsByTagName('div'),
    dots = byId('dots').getElementsByTagName('span'),
    banner = byId('banner'),
    menuContent = byId('menu-content'),
    menuItems = menuContent.getElementsByClassName('menu-item'),//主菜单
    subMenu = byId('sub-menu'),//子菜单
    innerBox = subMenu.getElementsByClassName('inner-box'),
    size = pics.length;







//封装getElementById()
function byId(id){
    return typeof(id) ==='string'?document.getElementById(id):id;
}
//封装通用事件
function addHandler(element,type,handler){
    //非ie浏览器
    if(element.addEventListener){
        element.addEventListener(type,handler,true);
        //ie浏览器支持Dome2级
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler);
        //ie浏览器不支持dom2级
    }else{
        element['on'+type] = handler;
    }
}
//点击下一张按钮
addHandler(next,'click',function(){
    index++;
    if(index>=3){index=0;}
    pics[0].style.display='none';
    changeImg();
})
//点击上一张
addHandler(prev, 'click', function () {
    index--;
    if (index <0) { index = size-1; }
    pics[0].style.display = 'none';
    changeImg();
})
//自动开启轮播
startAutoPlay();
//点击圆点索引切换图片
for(var d = 0;d<size;d++){
    dots[d].setAttribute('data-id',d);
    addHandler(dots[d],'click',function(){
        index = this.getAttribute('data-id');
        changeImg();
    })
}

//鼠标离开banner，隐藏子菜单
addHandler(banner,'mouseout',function(){
    subMenu.className="sub-menu hide";
})
//鼠标离开主菜单，隐藏子菜单
addHandler(menuContent,'mouseout',function(){
    subMenu.className = "sub-menu hide";
})
//鼠标划入子菜单时，子菜单显示
addHandler(subMenu,'mouseover',function(){
    this.className = 'sub-menu';
})
//鼠标离开子菜单时，子菜单隐藏
addHandler(subMenu, 'mouseout', function () {
    this.className = 'sub-menu hide';
})
//鼠标滑过主菜单
for(var m=0;m<menuItems.length;m++){
        //给所有子菜单定义属性，表明索引
    menuItems[m].setAttribute('data-index',m);
    addHandler(menuItems[m],'mouseover',function(){
        //显示子菜单所在的背景
        subMenu.className = 'sub-menu';
        //获取当前主菜单的索引
        idx = this.getAttribute('data-index');
        //遍历所有子菜单innerBox，将他们隐藏
        for(var j=0;j<innerBox.length;j++){
            //隐藏所有的子菜单
            innerBox[j].style.display = 'none';
            //所有主菜单恢复原样
            menuItems[j].style.background="none";
        }
        //找到当前子菜单让其显示出来
        innerBox[idx].style.display = 'block';
        menuItems[idx].style.background = 'rgba(0,0,0,0.1)';
    })
}


//鼠标划入停止轮播
addHandler(main,'mouseover',stopAutoPlay)
//鼠标离开继续轮播
addHandler(main, 'mouseout', startAutoPlay)

//切换图片
function changeImg() {
    //遍历所有图片，将图片隐藏，当前图片显示
    for (var i = 0; i < size; i++) {
        pics[i].style.display = 'none';
        dots[i].className = '';
    }
    pics[index].style.display = 'block';
    dots[index].className = 'active';
}

function startAutoPlay() {
    timer = setInterval(function () {
        index++;
        if (index >= size) index = 0;
        console.log(index);
        changeImg();
    }, 1500)
}

//清除定时器 停止轮播
function stopAutoPlay() {
    if (timer) {
        clearInterval(timer);
    }
}