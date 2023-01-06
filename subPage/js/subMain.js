$().ready(function() {
  var menu_toggle = true;
  $('.hide-menu-icon').click(() => {
      if(menu_toggle) {
          $('.menu').fadeOut(200, ()=> {
              
          }).fadeIn(200);
          menu_toggle = !menu_toggle;
          $('.hide-menu-icon img').fadeOut(200, () => {
              $('.hide-menu-icon img').attr('src', '../svg/flight_takeoff.svg');
          }).fadeIn(200);
      } else {
          $('.menu').fadeIn(200, ()=> {

          }).fadeOut(200);
          menu_toggle = !menu_toggle;
          $('.hide-menu-icon img').fadeOut(200, () => {
              $('.hide-menu-icon img').attr('src', '../svg/flight_land.svg');
          }).fadeIn(400);
      }
  })

  var data = '';
  var html = '';

//json
fetch('../resource/data.json')
.then(function(res) {return res.json()})
.then(function(abc) {
  init(abc.data)

})

//로컬스트로지 값 받오는 변수
let countryKey = localStorage.getItem('num');








//구글 맵
// let contryGps = [
//   {
//     "contry": "brazil",
//     "url" : { lat: -14.142426 ,lng: -53.104981 },
//   },
//   {
//     "contry": "canada",
//     "url" : { lat: 56.00000 ,lng: -96.00000 },
//   },
//   {
//     "contry": "switzerland",
//     "url" : { lat: 46.584747 ,lng: 8.132716 },
//   },
//   {
//     "contry": "italy",
//     "url" : { lat: 41.173286 ,lng: 12.342500 },
//   },
//   {
//     "contry": "mongolia",
//     "url" : { lat: 46.515439 ,lng: 103.50522 },
//   },
//   {
//     "contry": "turkey",
//     "url" : { lat: 38.572643 ,lng: 35.142667 },
//   },
//   {
//     "contry": " vietnam",
//     "url" : { lat: 15.541102 ,lng: 105.482409 }
//   }
// ]
// function initMap() {
//   var map = new google.maps.Map(
//     document.querySelector('.maps'), {
//       zoom: 5,
//       center: contryGps[contryKey].url
//     }
//   );
// }
//큰 제목
window.addEventListener('load',()=>{
  console.log('aa')
  setTimeout(()=>{
    window.scrollTo(0,0);
  },50)

});

function init (a) {

  // this.a = a;
      for(var i=0; i<a.length; i++) {
          html += '<li class="menu-sub">';
          html += `<a>${a[i].country_ko}</a>`;
          html += '</li>';
      }
      
      $('.hide-menu-wrapper ul.menu').html(html);
      
     
  const countryImg = document.querySelectorAll('.section01-contain')

  countryImg.forEach((btn, key)=>{
    btn.innerHTML = `<img src="${a[countryKey].place[key].url}">
    <p class="section01-text">${a[countryKey].place[key].title}</p>`
  })

  //section02
  function dataChange(key){
    const elSec02 = document.querySelector('.section02-contain');
    elSec02.innerHTML = `<div class="maps">
                        <img src="${a[countryKey].country_url}" alt="${a[countryKey].place[key].title}의 지역">
                      </div>
                      <div class="text">
                        <p class="title">${a[countryKey].place[key].title}</p>
                        <p class="detail">${a[countryKey].place[key].detail}</p>
                        <a class="more" href="">more</a>
                      </div>`;
                      // console.log(a[countryKey].place[key].lodging[key].img_url)

    //section04 클릭 시 이미지 추가
    const elSec04Text = document.querySelector('.section04-text'),
          elSec04Img = document.querySelector('.section04-img'),
          elsec04Num = document.querySelectorAll('.section04-number'),
          elInfo = document.querySelector('.section04-info'),
          elsec04Line = document.querySelector('.section04-line .line');
    
    elsec04Num.forEach((sec,n)=>{
      sec.addEventListener("click",function(){
        image(n)
        // elsec04Line[0].style.width = '30%'
        // elsec04Line[1].style.width = '60%'
        // elsec04Line[2].style.width = '100%'
        if(n==0){
          elsec04Line.style.width='10%'
        }else if(n==1){
          elsec04Line.style.width='42%'
        }else{
          elsec04Line.style.width='82%'
        }
      })
    })
    //
    function image(n){ 
      var exhtml = '';
      try{
        elSec04Text.innerHTML = `<h2>여기는 &nbsp&nbsp<span>${a[countryKey].place[key].lodging[n].title}</span>&nbsp 입니다.<h2>`
        
        exhtml += `<p>${a[countryKey].place[key].lodging[n].detail}</p>
                            <div>
                              <img src="../img/location-icon.png" alt="지역">
                              <p>${a[countryKey].place[key].lodging[n].adr}</p>`
        if(a[countryKey].place[key].lodging[n].tel != '') {
          exhtml += `<img src="../img/call-icon.png" alt="전화">
                      <p>${a[countryKey].place[key].lodging[n].tel}</p>`
        }
        exhtml += `</div>`;
                              
        elInfo.innerHTML = exhtml;
      }catch{}
      elSec04Img.innerHTML = ''
      for(i=0;i<4;i++){
        elSec04Img.innerHTML += `<img src="${a[countryKey].place[key].lodging[n].img_url[i]}" alt="">`;
      }
    }
    //section04 페이지 로드 시 이미지 불러오기
    image(0);           
  }  
  dataChange(0);

  //section1 슬라이드
  var swiper = new Swiper(".mySwiper", {
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on:{
      slideChange:function(e){
        dataChange(e.realIndex);
      }
    }
  });


  
const elLi = document.querySelectorAll('.menu-sub')

elLi.forEach(function(btn, key) {
  btn.addEventListener('click', ()=> {
    event.preventDefault();
    localStorage.setItem('num', key);
    // init();
    location.reload();
  })
})


}




});
