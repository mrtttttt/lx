
	/*function drag(obj){
		this.obj = obj;
	}
	drag.prototype ={
		move:function(){
			this.down();
		},
		down:function(){
			let that = this;
			this.obj.onmousedown = function(e){
				let ox =e.offsetX,oy = e.offsetY;
				document.onmousemove = function(e){
					let cx = e.clientX,cy = e.clientY;
					that.obj.style.left = cx-ox+'px';
					that.obj.style.top = cy-oy+'px';
				}
			}
			this.obj.onmouseup = function(){
				document.onmousemove = null;
			}
		}
	}*/


	/*function drag(obj){
		this.obj = obj;
	}
	drag.prototype ={
		move:function(){
			let that = this;
			this.obj.onmousedown = function(e){
				let ox =e.offsetX,oy = e.offsetY;
				document.onmousemove = function(e){
					let cx = e.clientX,cy = e.clientY;
					that.obj.style.left = cx-ox+'px';
					that.obj.style.top = cy-oy+'px';
				}
			}
			this.obj.onmouseup = function(){
				document.onmousemove = null;
			}
		}
	}*/
	
	//class声明对象
	class drag{
		constructor(obj){
			this.obj = obj;
		}
		start(){
			this.move();
		}
		move(){
			let that =this;
			this.obj.onmousedown = function(e){
				let ox = e.offsetX,oy = e.offsetY;
				document.onmousemove = function(e){
					let cx = e.clientX,cy = e.clientY;
					that.obj.style.left = cx-ox+'px';
					that.obj.style.top = cy-oy+'px';
				}
				that.obj.onmouseup = function(){
					document.onmousemove = null;
					that.obj.onmouseup = null;
				}
			}
		}
	}

