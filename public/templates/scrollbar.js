$(document).ready(function(){



  $(function() {

    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          var thetop = target.offset().top;
          var finaltop = thetop-90;
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
  var navWhite2 = document.getElementById("navbar2")


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
    navWhite2.style.backgroundColor = "rgba(255,255,255, 1)";

  }



});
