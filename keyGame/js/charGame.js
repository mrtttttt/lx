function Game(){
	this.charSheet = [
	['Q','img/Q.jpg'],
	['E','img/E.jpg'],
	['R','img/R.jpg'],
	['T','img/T.jpg'],
	['Y','img/Y.jpg'],
	['I','img/I.jpg'],
	['O','img/O.jpg'],
	['P','img/P.jpg'],
	['L','img/L.jpg'],
	['K','img/K.jpg'],
	['J','img/J.jpg'],
	['H','img/H.jpg'],
	['G','img/G.jpg'],
	['F','img/F.jpg'],
	['D','img/D.jpg'],
	['S','img/S.jpg'],
	['A','img/A.png'],
	['Z','img/Z.jpg'],
	['X','img/X.jpg'],
	['C','img/C.jpg'],
	['V','img/V.jpg'],
	['B','img/B.jpg'],
	['N','img/N.jpg'],
	['M','img/M.jpg']];
	this.element = [];
	this.position = [];
	this.length = 6;
	this.speed = 10;
	this.leave = 10;
	this.score = 0;
	this.lifes = 10;
	this.scoreObj = document.querySelector('.score');
	this.lifesObj = document.querySelector('.lifes');
	this.leaveObj = document.querySelector('.leave');
	this.t;
}
Game.prototype = {
	start:function(){
		this.getChars(this.length);
		this.drop();
		this.key();

	},
	getChars:function(length){
		for(let i=0;i<length;i++){
			this.getChar();
		}
	},
	/*checkRepeat:function(num){
		return this.element.some(value=>{value.innerText == this.charSheet[num][0]})
	},*/

	//检验字母是否重复
	checkRepeat:function(num){
		let that = this;
		return this.element.some(function(value){
			return value.innerText == that.charSheet[num][0];
		})
	},
	//检验位置是否重叠
	checkPosition:function(lefts){
		let that = this;
		return this.position.some(function(value){
			return Math.abs(value - lefts)<50;
		})
	},
	getChar:function(){
		let divs = document.createElement('div');

		let num;
		do{
			num = Math.floor(Math.random()*this.charSheet.length);
		}while(this.checkRepeat(num))

		divs.innerText = this.charSheet[num][0];
		let tops = Math.random()*100;

		let lefts;
		do{
			lefts = Math.floor(Math.random()*(innerWidth-400)+200);
		}while(this.checkPosition(lefts))

		divs.classList.add('char');
		divs.style.top = `${tops}px`;
		divs.style.left = `${lefts}px`;
		divs.style.backgroundImage = `url(${this.charSheet[num][1]})`;
		document.body.appendChild(divs);
		this.element.push(divs);
		this.position.push(lefts);
	},
	drop:function(){
		let that =this;
		that.t = setInterval(function(){
			for(let i=0;i<that.element.length;i++){
				let tops = that.element[i].offsetTop;
				that.element[i].style.top = `${tops+that.speed}px`;
				if(tops>500){
					document.body.removeChild(that.element[i])
					that.element.splice(i,1);
					that.position.splice(i,1);
					// that.getChar();
					that.lifes--;
					that.lifesObj.innerText = that.lifes;
					if(that.lifes ==-1){
						if(confirm('游戏已结束，重新开始下一局？')){
							that.restart();
						}else{
							close();
						}
					}
				}
			}
			if(that.element.length<that.length){
				that.getChar();
			}

		},100)
	},
	//键盘
	key:function(){
		let that =this;
		document.body.onkeydown = function(e){
			let key = String.fromCharCode(e.keyCode);
			for(let i=0;i<that.element.length;i++){
				if(key == that.element[i].innerText){
					document.body.removeChild(that.element[i])
					that.element.splice(i,1);
					that.position.splice(i,1);
					that.score ++; 
					that.scoreObj.innerText = that.score;
					if(that.score == that.leave){
						that.next();
					}
				}
			}
		}
	},
	//下一关
	next:function(){
		clearInterval(this.t);

		for(let i=0;i<this.element.length;i++){
			document.body.removeChild(this.element[i]);
		}
		this.element = [];
		this.position = [];

		if(this.length >=9){
			this.speed+=10;
		}else{
			this.length++;
		}
		this.leave+=10;
		this.leaveObj.innerText = this.leave/10;
		this.start();
	},
	//重新开始
	restart:function(){
		clearInterval(this.t);

		for(let i=0;i<this.element.length;i++){
			document.body.removeChild(this.element[i]);
		}
		this.element = [];
		this.position = [];
		this.length = 6;
		this.speed = 10;
		this.score = 0;
		this.scoreObj.innerText = 0;
		this.lifes = 10;
		this.lifesObj.innerText = 10;
		this.leave = 10;
		this.leaveObj.innerText = 1;
		this.start();
	},
	stop:function(){
		clearInterval(this.t);
	},
	nostop:function(){
		this.drop();
	}
}