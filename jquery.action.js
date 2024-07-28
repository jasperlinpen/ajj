$(function(){

    var $ulPic=$('ul.pic'),
    $ulPage=$('ul.page'),
    _liPicHtml=$ulPic.html(),//把裡面元素抓出來
    _width=$('#runbanner').width(),
	nowIndex=0,
	timer,
	speed=3000,
	picLen=$ulPic.find('li').length;

	//---------------------------------------------------------------------

	//生出page dot
	$ulPic.find('li').each(function(){
		$ulPage.append('<li></li>');
	})
	$ulPage.css({width:$('ul.page li').outerWidth(true)*picLen});//outerWidth(true)=margin+padding
	
	//---------------------------------------------------------------------

	//把圖片變double
	$ulPic.html(_liPicHtml+_liPicHtml);//把值塞進去
	picLen=$('ul.pic li').length;//本來4張圖 現在變8張了

	//init
	dot();
	timer=setTimeout(bannerMove,speed)

	//---------------------------------------------------------------------

	//按左右
	$('#runbanner h2').click(function(){
		bannerMove();
	})
	$('#runbanner h3').click(function(){

		clearTimeout(timer);

		//$ulPic瞬間移動到中間
		if(nowIndex<=0){
				$ulPic.css({left:picLen/2*_width*-1});
				nowIndex=picLen/2;
			}

		nowIndex=(nowIndex-1+picLen)%picLen;//上一張圖魔法指令

		//圖向左移動
		$ulPic.animate({left:nowIndex*_width*-1},500,function(){
			timer=setTimeout(bannerMove,speed)
		});

		dot();
	})


	//圖片移動
	function bannerMove(){

		clearTimeout(timer);
		nowIndex=(nowIndex+1)%picLen;//下一張圖魔法指令

		//圖向左移動
		$ulPic.animate({left:nowIndex*_width*-1},500,function(){
			//$ulPic瞬間移動到最左邊
			if(nowIndex>=picLen/2){
				$ulPic.css({left:0});
				nowIndex=0;
			}
			timer=setTimeout(bannerMove,speed)
		});
		
		dot();
	}

	function dot(){
		//dot change color
		$ulPage.find('li').removeClass('DotColor').eq(nowIndex).addClass('DotColor');
		if(nowIndex==4){
			$ulPage.find('li').eq(0).addClass('DotColor');
		}
	}
	


})