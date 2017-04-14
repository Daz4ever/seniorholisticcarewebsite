$(document).ready(function(){

    $(".here").click(function(){
      $(".nav-item").slideToggle(250);

    });

    $('.nav-item').click(function () {
    $('#toggle-menu').collapse('hide');
    });



    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });


    var navWhite = document.getElementById("navbar");
    var navbarlinks = document.querySelectorAll(".nav-item");
    var navbars = document.getElementById("navigate");

window.onscroll = scroll;
if (window.innerWidth >  760) {
function scroll() {
  if (window.pageYOffset >= 100) {
    navWhite.style.backgroundColor = "rgba(255,255,255, 1)";
    navWhite.style.boxShadow = "5px 2px 10px";
  }
  else {
    navWhite.style.backgroundColor = "rgba(255,255,255,0)";
    navWhite.style.boxShadow = "0 0 0";
  }
}
}
else{
    navWhite.style.backgroundColor = "rgba(255,255,255, 1)";
}

window.addEventListener("resize", function(){
  if(document.documentElement.clientWidth>760){
    navWhite.style.backgroundColor = "rgba(255,255,255, 1)";
  }
},false);



if (window.innerWidth <  760) {
  for (var i = 0; i < navbarlinks.length; i++) {
    navbarlinks[i].addEventListener("click", function() {
      navbars.style.display = "none";
    });
  }
}

});
