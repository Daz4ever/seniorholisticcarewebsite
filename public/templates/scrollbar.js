$(document).ready(function(){

//   $(document).on('click','.navbar-collapse.in',function(e) {
//     if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
//         $(this).collapse('hide');
//     }
// });
/*
  $(".here").click(function(){
    $(".nav-item").slideToggle(250);

  });

  $('.nav-item').click(function () {
    $('#toggle-menu').collapse('hide');
  });
*/


  $(function() {

    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          var thetop = target.offset().top;
          var finaltop = thetop-100;
          $('html, body').animate({
            scrollTop: finaltop
          }, 1000);
          var navMain = $(".navbar-collapse"); // avoid dependency on #id
          navMain.collapse('hide');

          return false;
        }
      }
    });
  });


  var navWhite = document.getElementById("navbar");
  // var navbarlinks = document.querySelectorAll(".nav-item");
  // var navbars = document.getElementById("navigate");


  if (window.innerWidth >  768) {


    window.onscroll = scroll;
    function scroll() {
      if (window.pageYOffset >= 350) {
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



});
