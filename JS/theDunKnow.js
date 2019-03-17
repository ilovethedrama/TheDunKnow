window.onscroll = function() {
  navBarStick();
  titleStick();

};

// Get the navbar
var navbar = document.getElementById("navbar");
var headingTitle = document.getElementById("scrollTitle");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;
var sticky1 = headingTitle.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function navBarStick() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    console.log('sticky added');
  } else {
    navbar.classList.remove("sticky");
    console.log('sticky removed');
  }
}

function titleStick() {
  if (window.pageYOffset >= 900) {
    headingTitle.classList.add("sticky");
    console.log('sticky added');
  } else {
    headingTitle.classList.remove("sticky");
    console.log('sticky removed');
  }
}


$(function(){  // $(document).ready shorthand
  $('.monster').fadeIn('slow');
});

$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},1500);
                    
            }
            
        }); 
    
    });
    
});