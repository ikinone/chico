// $(document).ready(function () {
//     var scrollStart = 0;
//     var startChange = $('#home');
//     var startChange = $('#home');
//     var navbar = $('.navbar')
//     var offset = startChange.offset();
//     if (startChange.length && window.innerWidth > 768) {
//         $(document).scroll(function () {
//             scrollStart = $(this).scrollTop();
//             offset = startChange.offset();
//             if (scrollStart > (offset.top - navbar.height())) {
//                 $('.navbar').addClass('bg-purple shadow');
//             } else {
//                 $('.navbar').removeClass('bg-purple shadow');
//             }
//         });
//     }
// });

$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
            $('.navbar').addClass('bg-purple shadow');
        } else {
            $('.navbar').removeClass('bg-purple shadow');
        }
    })
})