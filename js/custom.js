$(function(){
  $("header .menu > li").mouseover(function(){
    $("header .sub").stop().slideDown(400);
  });
  $("header .menu > li").mouseout(function(){
    $("header .sub").stop().slideUp(400);
  });

  //주메뉴 클릭시 자동으로 상하 스크롤 설정
  var count = 0;//페이지 순번

  //메뉴버튼에 클릭이벤트 생성
  $(".btn > li").click(function(e){
    e.preventDefault();//li요소안에 있는 a요소의 디폴트 기능인 링크기능을 막아줍니다.
    count = $(this).index();//count변수에 클릭한 메뉴의 index를 할당

    //스크롤 이동
    doScroll();//doScroll함수 호출
  });

  //화면이 스크롤 될때마다 현재 영역에 해당하는 메뉴 활성화
  function activation(){//activation함수 생성
    //모든 메뉴 요소에 on클래스를 제거하고 순번이 count인 요소에 on클래스를 추가
    $(".btn > li").removeClass("on").eq(count).addClass("on");
  }
  activation();//activation함수 호출

  //화면이 자연스럽게 스크롤 이동되는 구문
  function doScroll(){//doScroll함수 생성
        
    //순번이 count인 section요소의 top위치값을 secTop변수에 할당
    var secTop = $("section").eq(count).offset().top;
    //console.log(secTop)
    //html,body를 선택하여 scrollTop위치값을 secTop위치로 1초동안 이동
    $("html,body").stop().animate({"scrollTop":secTop},500,function(){
      console.log(count)
      var vid2 = document.querySelector('.vid2');
      if(count == 4){
        vid2.currentTime = 0;
        vid2.play();
      }else{
        vid2.pause();
      }
    })

    //메뉴 활성화
    activation();//activation함수 호출
  }
  doScroll();//페이지 오픈 또는 새로고침시 페이지상단으로 스크롤이동시킴

  //main요소 내에서 wheel이벤트 발생시
  $("main").on("wheel",function(e){
    e.preventDefault();//window의 스크롤 기능을 막아주는 코드
    //html요소와 body에 animte기능이 적용중일때 return false로 구문을 실행시키지 않음.
    if($("html,body").is(":animated")) return false;
    console.log(e)
    //마우스를 위로 올리면 deltaY값이 -100이 반환되고 내리면 100이 반환됨
    var deltaY = e.originalEvent.deltaY;
    if(deltaY < 0){//마우스를 위로 올렸을때
      count--;//count변수값에서 1을 빼서 다시 count변수에 할당
      if(count < 0) count = 0;//count변수가 0보다 작으면 count변수를 0으로 고정
      doScroll();//doScroll함수 호출
    }else{//마우스를 아래로 내렸을때
      count++;//count변수값에서 1을 더해서 다시 count변수에 할당
      if(count >= $("section").length) count = $("section").length-1//count변수가 section의 갯수와 같거나 커지면 count변수의 값을 section갯수-1로 할당하여 마지막 index번호로 고정
      doScroll();//doScroll함수 호출
    }
  });
  //comfort pop
  $('ul.bg > li').click(function(){
    var popnum = $(this).index()
    $('.popup > div').eq(popnum).fadeIn();
    $('ul.bg > li').hide();
    $('ul.bg').css('opacity','0.3');
  });
  
  $('#comfort .popup a').click(function(e){
    e.preventDefault();
    $('.popup > div').hide();
    $('ul.bg > li').show();
    $('ul.bg').css('opacity',1);
    
  });
  //Performance hover
  $('.lpe').hover(
    function(){
      $('.lpehover').fadeIn();
      $('.lpe a').hide();
    },
    function(){
      $('.lpehover').hide();
      $('.lpe a').fadeIn();
    });

    $('.tce').hover(
      function(){
        $('.tcehover').fadeIn();
        $('.tce a').hide();
      },
      function(){
        $('.tcehover').hide();
        $('.tce a').fadeIn();
      });    
    //Design video play
    $('ul.imgGroup li').click(function(e){
      e.preventDefault();
      var vid2 = $('.vid2').get(0);
      var videoNum = $(this).index();
      var videoname = "images/design_"+videoNum+".mp4";
      vid2.setAttribute('src',videoname);
      vid2.play();

      $('ul.imgGroup li img').removeClass("on");
      $('ul.imgGroup li img').eq(videoNum).addClass("on");
    });

});