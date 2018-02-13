var dom = document.getElementById('clock');
var ctx = dom.getContext("2d");

var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;



function drawBackground() {
	ctx.save();
	// 改变原点
	ctx.translate(r, r);
	// 初始化路径
	ctx.beginPath();
	// 圆线宽度
	ctx.lineWidth = 10 * rem;
	//绘制一个圆
	ctx.arc(0, 0, r - ctx.lineWidth/2, 0, 2*Math.PI, false);
	// 填充
	ctx.stroke();

	// 小时的数组
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	var hourR = r - 30 * rem;
	// 字体
	ctx.font = 18 * rem + 'px Arial';
	// 水平居中
	ctx.textAlign = 'center';
	// 垂直居中
	ctx.textBaseline = 'middle';
	// 遍历小时数组
	hourNumbers.forEach(function ( number, i ) {
		var rad = 2 * Math.PI / 12 * i;
		var x = Math.cos( rad ) * hourR;
		var y = Math.sin( rad ) * hourR;
		ctx.fillText(number, x, y);
	});

	var pointR = r - 18 * rem;
	for ( var i = 0; i < 60; i++ ) {
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos( rad ) * pointR;
		var y = Math.sin( rad ) * pointR;
		 ctx.beginPath();
		 if (i % 5 === 0 ) {
		 	ctx.fillStyle = '#000';
		 	ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
		 } else {
		 	ctx.fillStyle = '#ccc';
		 	ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
		 }
		 // 画实心
		 ctx.fill();
	}
}

function drawHour( hour,minute ) {
	// 保存当前环境的状态
	ctx.save();
	// 起始一条路径，或重置当前路径
	ctx.beginPath();
	// 小时的弧度
	var rad = 2 * Math.PI / 12 * hour;
	// 分钟的弧度
	var mrad = 2 * Math.PI / 12 / 60 * minute;
	// 画布旋转
	ctx.rotate( rad + mrad );
	// 线条宽度
	ctx.lineWidth = 6 * rem;
	// 设置或返回线条的结束端点样式
	ctx.lineCap = 'round';
	// 把路径移动到画布中的指定点，不创建线条
	ctx.moveTo(0, 10 * rem);
	// 添加一个新点，然后在画布中创建从该点到最后指定点的线条
	ctx.lineTo(0, -r / 2);
	// 绘制已定义的路径
	ctx.stroke();
	// 返回之前保存过的路径状态和属性
	ctx.restore();
}
function drawMinute( minute ) {
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate( rad );
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r + 30 * rem);
	ctx.stroke();
	ctx.restore();
}
function drawSecond( second ) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543'
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate( rad );
	ctx.moveTo( -2 * rem, 20 * rem );
	ctx.lineTo( 2 * rem, 20 * rem );
	ctx.lineTo( 1 * rem, -r + 18 * rem );
	ctx.lineTo( -1 * rem, -r + 18 * rem );
	ctx.fill();
	ctx.restore();
}

function drawDot () {
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3 * rem, 0, 2*Math.PI, false );
	ctx.fill();
}

function draw() {
	ctx.clearRect(0, 0, width, height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour, minute);
	drawMinute( minute );
	drawSecond( second );
	drawDot();
	ctx.restore();
}
setInterval(draw, 1000);
