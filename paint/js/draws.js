function draws(canvas,mask){
	this.canvas=canvas;
	this.mask=mask;
	this.ctx=this.canvas.getContext('2d');
	
	//历史纪录和画板尺寸
	this.history=[];
	this.ow=this.canvas.width;
	this.oh=this.canvas.height;
	
	//默认样式
	this.lineWidth=1;
	this.lineCap='butt';
	this.fillStyle='#000';
	this.strokeStyle = '#000';
	this.style = 'stroke';
	this.jiao;
	
	//裁切
	this.temp=null;
}
draws.prototype={
	//初始化
	ini:function(){
		this.ctx.lineWidth=this.lineWidth;
		this.ctx.lineCap=this.lineCap;
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.strokeStyle=this.strokeStyle;
		this.ctx.style=this.style;
		this.ctx.setLineDash([0,0]);
	},
	
	//新建
	newDraw:function(){
		this.ctx.clearRect(0,0,this.ow,this.oh);
		this.history=[];
	},
	//直线
	line:function(sw,sh,ew,eh){
		this.ctx.beginPath();
		this.ctx.moveTo(sw,sh);
		this.ctx.lineTo(ew,eh);
		this.ctx.closePath();
		this.ctx.stroke();
	},
	//虚线
	dashed:function(sw,sh,ew,eh){
		this.ctx.beginPath();
		this.ctx.moveTo(sw,sh);
		this.ctx.setLineDash([2,5]);
		this.ctx.lineTo(ew,eh);
		this.ctx.closePath();
		this.ctx.stroke();
	},
	//线
	pencil:function(){
		let that=this;
		this.mask.onmousedown = function(e){
			that.ini();
			let ox = e.offsetX,oy = e.offsetY;
			that.ctx.beginPath();
			that.ctx.moveTo(ox,oy);
			that.mask.onmousemove = function(e){
				that.ctx.clearRect(0,0,that.ow,that.oh);
				let cx=e.offsetX;
				let cy=e.offsetY;
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				that.ctx.lineTo(cx,cy);
				that.ctx[that.style]();
			}
			that.mask.onmouseup = function(){
				let datas = that.ctx.getImageData(0,0,that.ow,that.oh);
				that.history.push(datas);
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
		}
	},
	//圆
	circle:function(sw,sh,ew,eh){
		this.ctx.beginPath();
		this.ctx.arc(sw,sh,Math.sqrt(Math.pow(sw-ew,2)+Math.pow(sh-eh,2)),0,2*PI,false);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	//矩形
	square:function(sw,sh,ew,eh){
		this.ctx.beginPath();
		this.ctx.rect(sw,sh,ew-sw,eh-sh);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	//多边形
	polygon:function(sw,sh,ew,eh){
		let r =Math.sqrt(Math.pow(sw-ew,2)+Math.pow(sh-eh,2));
		let ang = 360/this.jiao/180*PI;
		this.ctx.beginPath();
		this.ctx.moveTo(sw+r,sh);
		for(let i=1;i<this.jiao;i++){
			this.ctx.lineTo(sw+Math.cos(ang*i)*r,sh+Math.sin(ang*i)*r);
		}
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	drawp:function(type){
		let that = this;
		this.mask.onmousedown=function(e){
			let sw=e.offsetX,sh=e.offsetY;
			that.mask.onmousemove=function(e){
				let ew=e.offsetX,eh=e.offsetY;
				that.ctx.clearRect(0,0,that.ow,that.oh);
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				that.ini();
				that[type](sw,sh,ew,eh);
			}
			that.mask.onmouseup = function(){
				let datas = that.ctx.getImageData(0,0,that.ow,that.oh);
				that.history.push(datas);
				that.mask.onmousemove=null;
			}
		}
	},
	//多角星
	polygonStar:function(sw,sh,ew,eh){
		let r =Math.sqrt(Math.pow(sw-ew,2)+Math.pow(sh-eh,2));
		let ang = 360/(this.jiao*2)/180*PI;
		this.ctx.beginPath();
		this.ctx.moveTo(sw+r,sh);
		for(let i=1;i<this.jiao*2;i++){
			if(i%2){
				this.ctx.lineTo(sw+Math.cos(ang*i)*r/2,sh+Math.sin(ang*i)*r/2);
			}else{
				this.ctx.lineTo(sw+Math.cos(ang*i)*r,sh+Math.sin(ang*i)*r);
			}
		}
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	//反向
	reverse:function(){
		let image = this.ctx.getImageData(0,0,this.ow,this.oh);
		let data =image.data;
		for(let i=0;i<data.length;i+=4){
			data[i]=255-data[i];
			data[i+1]=255-data[i+1];
			data[i+2]=255-data[i+2];
		}
		this.ctx.putImageData(image,0,0);
	},
	
	//字体
	font:function(){
		let that=this;
		this.mask.ondblclick=function(e){
			let ow = e.offsetX,oh=e.offsetY;
			let div = document.createElement('div');
			div.classList.add('font');
			div.contentEditable=true;
			div.style.left=ow+'px';
			div.style.top=oh+'px';
			that.mask.appendChild(div);
			that.mask.onmousedown = null;
			
			let pL=ow,pT=oh;
			div.onmousedown=function(e){
				let ox = e.clientX, oy = e.clientY;
				that.mask.onmousedown = null;
				let ol = this.offsetLeft;
				let ot = this.offsetTop;
				that.mask.onmousemove=function(e){
					let cx = e.clientX, cy = e.clientY;
					pL=cx-ox+ol;
					pT=cy-oy+ot;
					div.style.left = pL+'px';
					div.style.top = pT+'px';
				}
				div.onmouseup=function(){
         			that.mask.onmousemove=null; 
         			div.onmouseup = null;
         		}
			}
			div.onblur = function(){
				let value = div.innerText;
				that.ctx.font='30px sans-serif';
				that.ctx.fillText(value,pL,pT);
				that.mask.removeChild(div);
			}
		}
	},
	//擦除
	clear:function(eraser){
		let that=this;
		this.mask.onmousedown = function(e){
			e.preventDefault();
			that.mask.onmousemove=function(e){
				e.preventDefault();
				eraser.style.display='block';
				let cx=e.offsetX,cy=e.offsetY;
				let w=eraser.offsetWidth,h=eraser.offsetHeight;
				let lefts=cx-w/2,tops=cy-h/2;
				if(lefts<0){
					lefts=0;
				}
				if(lefts>that.ow-w){
					lefts=that.ow-w;
				}
				if(tops<0){
					tops=0;
				}
				if(tops>that.oh-h){
					tops=that.oh-h;
				}
				eraser.style.left=lefts+'px';
				eraser.style.top=tops+'px';
				that.ctx.clearRect(lefts,tops,w,h);
			}
			that.mask.onmouseup=function(){
				eraser.style.display='none';
				
				let datas = that.ctx.getImageData(0,0,that.ow,that.oh);
	  	  	    that.history.push(datas);
				that.mask.onmousemove=null;
			}
		}
	},
	
	//裁剪
	clip:function(clipObj){
		let that=this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX,oy=e.offsetY;
			let w,h,minX,minY;
			that.mask.onmousemove = function(e){
				let cx=e.offsetX,cy=e.offsetY;
				w = Math.abs(ox-cx);
				h = Math.abs(oy-cy);
				minX=ox>cx?cx:ox;
				minY=oy>cy?cy:oy;
				clipObj.style.cssText = `
					display:block;	width:${w}px;	height:${h}px; left:${minX}px; top:${minY}px;
				`;
			};
			that.mask.onmouseup = function(){
				that.temp = that.ctx.getImageData(minX,minY,w,h);
				that.ctx.clearRect(minX,minY,w,h);
				
				let datas = that.ctx.getImageData(0,0,that.ow,that.oh);
	  	  	    that.history.push(datas);
	 			that.ctx.putImageData(that.temp,minX,minY);
	 			
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
				that.drag(minX,minY,w,h,clipObj);
			}
		}
	},
	//拖拽
	drag:function(minX,minY,w,h,obj){
		let that=this;
		this.mask.onmousemove = function(e){
			let ox =e.offsetX,oy=e.offsetY;
			if(ox>minX && ox<minX+w && oy>minY && oy<minY+h){
				that.mask.style.cursor = 'move';
			}else{
				that.mask.style.cursor = 'default';
			}
		}
		this.mask.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.mask.onmousemove = function(e){
				let cx=e.offsetX,cy=e.offsetY;
				let lefts = cx-ox+minX;
				let tops = cy-oy+minY;
				if(lefts<0){
					lefts=0;
				}
				if(lefts>that.ow-w){
					lefts=that.ow-w;
				}
				if(tops<0){
					tops=0;
				}
				if(tops>that.oh-h){
					tops=that.oh-h;
				}
				obj.style.left = `${lefts}px`;
				obj.style.top = `${tops}px`;
				that.ctx.clearRect(0,0,that.ow,that.oh);
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
				if(that.temp){
					that.ctx.putImageData(that.temp,lefts,tops);
				}
			}
			that.mask.onmouseup = function(){
				that.temp=null;
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
				obj.style.display = 'none';
				let datas = that.ctx.getImageData(0,0,that.ow,that.oh);
				that.history.push(datas);
				
				that.mask.style.cursor = 'default';
			}
		}
	},
	
	//撤销
	ctrlZ:function(){
		this.history.pop();
		console.log(this.history)
		if(this.history.length>0){
			this.ctx.putImageData(this.history[this.history.length-1],0,0)
		}else{
			this.ctx.clearRect(0,0,this.ow,this.oh);
		}
	}
}
