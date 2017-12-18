
let str = 'mamamam';
alert(CheckPalindrom(str));

//判断一个单词是否是回文
function CheckPalindrom(str){
	/**
	 * str.split()		字符串转化为数组
	 * arr.reverse()	将数组翻转
	 * arr.join()		将数组转化为字符串
	 */
	return str == str.split('').reverse().join('');
}
