window.onload=function(){
	let lis = document.querySelectorAll('.shape>li');
	let num=0;

	for(let i=0;i<lis.length;i++){
		lis[i].onclick=function(){
			lis[num].style.border='1px solid #eee';
			lis[i].style.border='1px solid #ff6700';
			num=i;
			if(this.id =='pencil'){
				draw.pencil();
			}else if(this.id == 'polygon'){
				draw.jiao = prompt("请输入边数:",6);
				draw.drawp(this.id)
			}else if(this.id == 'polygonStar'){
				draw.jiao = prompt("请输入边数:",6);
				draw.drawp(this.id)
			}else if(i<=6){
				draw.drawp(this.id);
			}
		}
	}
	
	//字体
	let ziti =document.querySelector('.icon-ziti');
	ziti.addEventListener('click',function(){
		draw.font();		
	})
	
	//擦除
	let clear = document.querySelector('#clear');
	let eraser = document.querySelector('.eraser');
	clear.addEventListener('click',function(){
		draw.clear(eraser);
	})
	
	//保存
	let save = document.querySelector('.top>.save')
	save.onclick = function(){
		save.href = canvas.toDataURL('image/png');
		save.download = 'a.png';
	}
	
	//裁剪
	let caijian = document.querySelector('.icon-jiancai');
	let clip = document.querySelector('.clip');
	caijian.addEventListener('click',function(){
		draw.clip(clip);
	})
	
	//填充
	let sty =document.querySelectorAll('.style');
	sty.forEach(function(ele,index){
		ele.onclick=function(){
			if(index==0){
				sty[1].classList.remove('checked');
				this.classList.add('checked');
				draw.style='fill';
			}else if(index==1){
				sty[0].classList.remove('checked');
				this.classList.add('checked');
				draw.style = 'stroke';
			}
		}
	})
	let color = document.querySelectorAll('.shape>input')
	color.forEach(function(value,index){
		value.onchange=function(){
			if(index==0){
				draw.fillStyle=this.value;
			}else if(index==1){
				draw.strokeStyle = this.value;
			}
		}
	})
	
	
	//反向
	let fanxiang = document.querySelector('.fanxiang');
	fanxiang.addEventListener('click',function(){
		draw.reverse();
	})
	
	//新建
	let newDraw = document.querySelector('.newDraw');
	newDraw.onclick = function(){
		draw.newDraw();
	}
	
	//撤销
	let ctrlz = document.querySelector('.ctrlZ');
	ctrlz.onclick = document.onkeydown = function(e){
		if(e.type =='click'){
			draw.ctrlZ();
		}else if(e.type =='keydown'){
			if(e.ctrlKey && e.keyCode==90){
				draw.ctrlZ();
			}
		}
	}
	
}
