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


  if (window.innerWidth >  768) {
    window.onscroll = scroll;
    function scroll() {
      if (window.pageYOffset >= 60) {
        navWhite.style.backgroundColor = "rgba(255,255,255, 1)";
        navWhite.style.boxShadow = "5px 2px 10px";
        navWhite.style.transition = ".3s";
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

  $('.nav a').click(function () {
    $('.nav-collapse').collapse('hide');
});

  // if (window.innerWidth <  760) {
  //   for (var i = 0; i < navbarlinks.length; i++) {
  //     navbarlinks[i].addEventListener("click", function() {
  //       navbars.style.display = "none";
  //     });
  //   }
  // }

});
