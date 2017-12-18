//$()	获取元素
function $(select, ranger) {
	ranger = ranger ? ranger : document;
	if(typeof select == 'string') {
		let selector = select.trim();
		let firstStr = select.charAt(0);
		if(firstStr == '#') {
			return ranger.getElementById(selector.substring(1));
		} else if(firstStr == '.') {
			return ranger.getElementsByClassName(selector.substring(1));
		} else if(/^[a-zA-Z][a-zA-Z0-6]{0,8}$/.test(selector)) {
			return ranger.getElementsByTagName(selector);
		}
	} else if(typeof select == 'function') {
		window.onload = function() {
			select();
		}
	}
}

//一、指定元素的后面插入元素	两个参数
HTMLElement.prototype.insertAfter2 = function(insert, position) {
	let next = position.nextElementSibling;
	//	let parent = position.parentNode;
	if(next) {
		this.insertBefore(insert, next);
	} else {
		this.appendChild(insert);
	}
}

//二、指定元素的后面插入元素  一个参数
HTMLElement.prototype.insertAfter1 = function(insert) {
	let next = this.nextElementSibling;
	let parent = this.parentNode;
	if(next) {
		parent.insertBefore(insert, next);
	} else {
		parent.appendChild(insert);
	}
}

//三、给指定元素的第一个子元素加
HTMLElement.prototype.appendFirst = function(insert) {
	let next = this.firstElementChild;
	if(next) {
		this.insertBefore(insert, next);
	} else {
		this.appendChild(insert);
	}
}

//四、将this加到position的后面
HTMLElement.prototype.insertToAfter = function(position) {
	position.insertAfter1(this);
}

//五、将this加到parent的第一个子元素位置
HTMLElement.prototype.appendToFirst = function(parent) {
	parent.appendFirst(this);
}

//六、下一个兄弟元素
HTMLElement.prototype.next = function() {
	let next = this.nextElementSibling;
	if(next) {
		return next;
	} else {
		return false;
	}
}

//七、当前元素后面的所有兄弟元素
HTMLElement.prototype.nextAll = function() {
	let nexte = this.next();
	let newarr = [];
	if(nexte) {							//判断此元素后面是否还有元素节点
		newarr.push(nexte);
	} else {
		return false;
	}
	while(nexte) {
		nexte = nexte.next();
		newarr.push(nexte);
	}
	newarr.pop();				//去掉数组内最后一个false元素
	return newarr;
}


//八、nextUntil 获取后面的全部的div
HTMLElement.prototype.nextUntil = function(letter) {
	let nextuntil = this.nextAll();
	// console.log(nextuntil);
	let newarr = [];
	for(let i in nextuntil) {
		if(nextuntil[i].nodeName == letter.toUpperCase()) {
			newarr.push(nextuntil[i]);
		}
	}
	return newarr;
}

// 九、previous 获取上一个元素节点
HTMLElement.prototype.previous = function() {
	let pre = this.previousElementSibling;
	if(pre) {
		return pre;
	} else {
		return false;
	}
}

// 十、 previousAll 获取前面所有的元素节点
HTMLElement.prototype.previousAll = function() {
	let pres = this.previous();
	let newarr = [];
	if(pres) {
		newarr.push(pres);
	} else {
		return false;
	}
	while(pres) {
		pres = pres.previous();
		newarr.push(pres);
	}
	newarr.pop();
	return newarr;
}

//十一、previousUntil 获取前面所有的a
HTMLElement.prototype.previousUntil = function(letter) {
	let previousuntil = this.previousAll();
	// console.log(nextuntil);
	let newarr = [];
	for(let i in previousuntil) {
		if(previousuntil[i].nodeName == letter.toUpperCase()) {
			newarr.push(previousuntil[i]);
		}
	}
	return newarr;
}

// 十二、找离某一个元素最近的某一种元素节点
HTMLElement.prototype.closest = function(letter) {
	let previous = this.previousAll();
	let nexts = this.nextAll();
	let a,b;
	for(let i in previous) {
		if(previous[i].nodeName == letter.toUpperCase()) {
			a =i;
			break;
		}
	}
	for(let j in nexts) {
		if(nexts[j].nodeName == letter.toUpperCase()) {
			b=j;
			break;
		}
	}
	if(a <= b) {
		return previous[a];
	} else {
		return nexts[b];
	}
}

// 十三、找某一个元素的父元素
HTMLElement.prototype.parent = function(){
  let parent = this.parentNode;
  if(parent){
    return parent;
  }else{
    return false;
  }
}

// 十六、找父辈元素的范围
HTMLElement.prototype.parentUntil = function(num){
	let par = this.parent();
	let newarr = [];
	if(par){
	    newarr.push(par);
	} else{
	    return false;
	}
	num = num?num:999;
	for(let i=0;i<num-1;i++){
	
	    par = par.parentNode;
	    if(par){
	    	newarr.push(par);
	    }else{
	    	newarr.push(par);
	    	break;
	    }
	  }
	return newarr;
}