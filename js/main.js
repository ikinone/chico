// logo rotate script


$(function () {
    var logo = $('.logo-rot');
    logo.addClass('rotate');
    logo.hover(
        function () {
            if ($(window).width() > 1023) {
                $(this).removeClass("rotate");
            }
        },
        function () {
            if ($(window).width() > 1023) {
                $(this).addClass("rotate");
            }
        }
    );
});

// timer script

var TOKEN_SALE_STARTS_IN = "2017-11-01 10:00:00"; // YYYY-MM-DD HH:mm:ss
var TOKEN_SALE_END_IN = "2017-12-01 22:00:00"; // YYYY-MM-DD HH:mm:ss
var TIMEZONE = "UTC"; // +1
var SALE_MONTH = "11"; // 11.
var TIME_REMAINING_REFRESH_TIME = 1000; // ms - sale time will be refreshed
var SALE_MILESTONES = [
    {
        date: "2017-" + (parseInt(SALE_MONTH)+1) + "-03 10:00:00",
        percent: 0
    },
    {
        date: "2017-" + SALE_MONTH + "-16 10:00:00",
        percent: 10
    },
    {
        date: "2017-" + SALE_MONTH + "-06 10:00:00",
        percent: 20
    }
];

// Count Sale End Duration
var now = moment.tz(TIMEZONE);
var end = moment.tz(TOKEN_SALE_STARTS_IN, TIMEZONE);
var msDifference = end.diff(now);
var saleEndDuration = moment.duration(msDifference);
if (msDifference < 0) msDifference = 0;
// -----------------------------------------------

// elements
var countDownTimer = document.getElementById('countdown-timer');
var currentBonusPercent = document.getElementById('current-bonus-percent');
var currentBonusDays = document.getElementById('current-bonus-days');
var countdownDays = document.getElementById('countdown-days');
var countdownHours = document.getElementById('countdown-hours');
var countdownMins = document.getElementById('countdown-mins');
var countdownSec = document.getElementById('countdown-sec');

// switch section: hide/show elements and set counter to END
function switchSections(period) {
  //console.log('switch Section' + period);
  if (period == 'PREICO') {
    // hide old section and show new
    $('.cta-show-icostart').hide();
    $('.cta-hide-icostart').show();

  } else {
    // hide new section and show old
    $('.cta-show-icostart').show();
    $('.cta-hide-icostart').hide();
    $('#main-title-ico').html('YUPIE ICO<br>now LIVE!');

    // Set counter on Sale End Duration
    end = moment.tz(TOKEN_SALE_END_IN, TIMEZONE);
    msDifference = end.diff(now);
    saleEndDuration = moment.duration(msDifference);
    if (msDifference < 0) msDifference = 0;
  }
}

// saleEndDuration = time remaining to ICO START
// if negative, ICO has started and we must countdown the ICO END
if (saleEndDuration.asDays()>=0){
  switchSections('PREICO')
} else {
  switchSections('ICO')
}

var addPadding = function (str) {
    if (str.toString().length < 2) {
        return "0" + str;
    }

    return str;
};

var reRenderCountDown = function () {
    countdownDays.innerText = addPadding(Math.floor(saleEndDuration.asDays()));
    // countdownDays.innerText = addPadding(Math.ceil(saleEndDuration.asDays()));
    // countdownDays.innerText = addPadding(saleEndDuration.days());
    countdownHours.innerText = addPadding(saleEndDuration.hours());
    countdownMins.innerText = addPadding(saleEndDuration.minutes());
    countdownSec.innerText = addPadding(saleEndDuration.seconds());
    if (
        saleEndDuration.days() === 0 &&
        saleEndDuration.hours() === 0 &&
        saleEndDuration.minutes() === 0 &&
        saleEndDuration.seconds() === 0
    ) {
      switchSections('ICO');
      return;
    }
    if (saleEndDuration.asDays()<0){
     //console.log('should not be here unless ICO has ended');
    }

    saleEndDuration.subtract(1, "s");
};

var startCountDownRender = function () {
    reRenderCountDown();
    setInterval(reRenderCountDown, TIME_REMAINING_REFRESH_TIME);
};

var setCurrentBonus = function () {
    var percentage = 20;
    var daysLeft;
    var hoursLeft;
    var minLeft;
    var secLeft;
    var prevDif;
    jQuery.each(SALE_MILESTONES, function (key, bonus) {

        var now = moment.tz(TIMEZONE);
        var bonusDateEnd = moment.tz(bonus.date, TIMEZONE);
        var msDifference = bonusDateEnd.diff(now);
        var bonusEndDuration = moment.duration(msDifference);
        if (msDifference < 0) msDifference = 0;

        if (bonusEndDuration.asDays()>=0){
          percentage = bonus.percent;
          daysLeft = Math.ceil(bonusEndDuration.asDays());
          hoursLeft = Math.ceil(bonusEndDuration.hours());
          minLeft = Math.ceil(bonusEndDuration.minutes());
          secLeft = Math.ceil(bonusEndDuration.seconds() + 60 * bonusEndDuration.minutes());
        }
    });
    if (percentage > 0) {
      if (daysLeft > 1 ) {
          $("#current-bonus-days").text("Lowers in " + daysLeft + " days");
      } else if (hoursLeft > 1 ) {
          $("#current-bonus-days").text("Lowers in " + hoursLeft + " hours");
      } else if (minLeft > 1 ) {
          $("#current-bonus-days").text("Lowers in " + minLeft + " minutes");
      } else if (secLeft > 0 ) {
          $("#current-bonus-days").text("Lowers in " + secLeft + " seconds");
      }
      $("#current-bonus-percent").text(percentage + "%");
    } else {
      $(".bonus-table").hide();
    }
};

// main page init
setCurrentBonus();
startCountDownRender();

// charts

// bonus by value

// var ctx = document.getElementById("valuechart").getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: [0, 1, 6, 25],
//         datasets: [{
//             label: 'YUPIE bonus %',
//             data: [0, 5, 10, 15],
//             backgroundColor: 'rgba(256, 59, 63, 0.2)',
//             borderColor: 'rgba(256, 59, 63, 1)',
//             borderWidth: 2
//         }]
//     },
//     options: {
//         legend: {
//             display: true,
//             labels: {
//                 fontColor: '#F8F9FA'
//             }
//         },
//         scales: {
//             yAxes: [{
//                 display: false,
//             }],
//             xAxes: [{
//                 ticks: {
//                     fontColor: '#F8F9FA',
//                 },
//                 gridLines: {
//                     color: '#F8F9FA',
//                     display: false,
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'minimum ETH value of investment',
//                     fontColor: '#F8F9FA',
//                 }
//             }]
//         },
//         plugins: {
//             datalabels: {
//                 color: '#F8F9FA',
//             }
//         }
//     }
// });

// bonus by time

// var ctx = document.getElementById("timechart").getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["05/11", "15/11", "01/12"],
//         datasets: [{
//             label: 'YUPIE bonus %',
//             data: [20, 10, 0],
//             backgroundColor: 'rgba(256, 59, 63, 0.2)',
//             borderColor: 'rgba(256, 59, 63, 1)',
//             borderWidth: 2
//         }]
//     },
//     options: {
//         legend: {
//             display: true,
//             labels: {
//                 fontColor: '#F8F9FA'
//             }
//         },
//         scales: {
//             yAxes: [{
//                 display: false,
//             }],
//             xAxes: [{
//                 ticks: {
//                     fontColor: '#F8F9FA',
//                 },
//                 gridLines: {
//                     color: '#F8F9FA',
//                     display: false,
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Invest by this date',
//                     fontColor: '#F8F9FA',
//                 }
//             }]
//         },
//         plugins: {
//             datalabels: {
//                 color: '#F8F9FA',
//             }
//         }
//     }
// });

// token distribution

var ctx = document.getElementById("tokenchart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Pre-ICO', 'Bounties', 'Seeding businesses', 'YUPIE reserve', 'Locked for future use', 'Team & experts', 'ICO'],
        datasets: [{
            label: '% of total tokens',
            data: [0.8, 1, 5, 10, 19, 20, 44.2],
            backgroundColor: ['rgba(91, 192, 235, 0.2)', 'rgba(255, 231, 76, 0.2)', 'rgba(243, 117, 43, 0.2)', 'rgba(243, 167, 18, 0.2)', 'rgba(168, 198, 134, 0.2)', 'rgba(192, 215, 234, 0.2)', 'rgba(256, 59, 63, 0.2)'],
            borderColor: ['rgba(91, 192, 235, 1)', 'rgba(255, 231, 76, 1)', 'rgba(243, 117, 43, 1)', 'rgba(243, 167, 18, 1)', 'rgba(168, 198, 134, 1)', 'rgba(192, 215, 234, 1)', 'rgba(256, 59, 63, 1)'],
            borderWidth: 2
        }]
    },
    options: {
        legend: {
            display: true,
            labels: {
                fontColor: '#F8F9FA'
            }
        },
        scales: {
            yAxes: [{
                display: false,
            }],
            xAxes: [{
                display: false,
                ticks: {
                    fontColor: '#F8F9FA',
                },
                gridLines: {
                    color: '#F8F9FA',
                    display: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'ETH value of investment',
                    fontColor: '#F8F9FA',
                }
            }]
        },
        plugins: {
            datalabels: {
                color: '#F8F9FA',
                display: function (context) {
                    return context.dataIndex > 0.9; // display labels with an odd index
                },
                font: {
                    // size: 16
                },
            }
        }
    }
});


// mailchimp heroku app

(function ($) {
    "use strict";
    $.mailchimpSingleOptIn = {
        init: function (selector, options) {
            $(selector).mailchimpSingleOptIn(options);
        }
    };
    $.fn.mailchimpSingleOptIn = function (options) {
        // console.log($(this));
        $(this).each(function (i, elem) {
            let form = $(elem);
            let email = form.find("input[type=email]");
            let settings = $.extend({
                    onSubmit() {},
                    onError() {},
                    onSuccess() {}
                },
                options
            );
            //form.attr('novalidate', 'true');
            email.attr("name", "email");
            form.submit(function (e) {
                e.preventDefault();
                let data = {
                    list_id: settings.listID
                };
                let dataArray = form.serializeArray();
                $.each(dataArray, function (index, item) {
                    data[item.name] = item.value;
                });
                //console.log(settings.onSuccess);
                //console.log(settings.onError);

                if (!data.email) {
                    form[0].checkValidity();
                }
                settings.onSubmit();
                $.ajax({
                    method: "POST",
                    url: settings.url,
                    data: data,
                    success: settings.onSuccess,
                    error: settings.onError
                });
            });
        });
        return this;
    };
})(jQuery);

function ga() {}

Alert = {
    show: function ($div, msg, n) {
        // console.log("show" + n + msg);
        $div.find(".thanks-msg" + n).text(msg);
        if ($div.css("display") === "none") {
            $div
                .fadeIn(300)
                .delay(4000)
                .fadeOut(500);
        }
    },
    thank: function (msg, n) {
        this.show($("#thanks" + n), msg, n);
    }
};
$("#mailchimp-form").mailchimpSingleOptIn({
    listID: "eaf16b84b5",
    url: "https://ch-ico-sub.herokuapp.com/",
    onSubmit: function () {
        // console.log("sent email 1");
    },
    onError: function (request) {
        if (request.responseJSON) {
            Alert.thank(
                request.responseJSON.title + ":" + request.responseJSON.detail,
                1
            );
        } else {
            Alert.thank("Error, but Thanks for signing up!", 1);
        }
    },
    onSuccess: function (request) {
        if (request.responseJSON) {
            Alert.thank(
                request.responseJSON.title + ":" + request.responseJSON.detail,
                1
            );
        } else {
            Alert.thank("Thanks for signing up!", 1);
        }
    }
});
$("#mailchimp-form2").mailchimpSingleOptIn({
    listID: "eaf16b84b5",
    url: "https://ch-ico-sub.herokuapp.com/",
    onSubmit: function () {
        // console.log("sent email 2");
    },
    onError: function (request) {
        if (request.responseJSON) {
            Alert.thank(
                request.responseJSON.title + ":" + request.responseJSON.detail,
                1
            );
        } else {
            Alert.thank("Error, but Thanks for signing up!", 2);
        }
    },
    onSuccess: function (request) {
        if (request.responseJSON) {
            Alert.thank(
                request.responseJSON.title + ":" + request.responseJSON.detail,
                1
            );
        } else {
            Alert.thank("Thanks for signing up!", 2);
        }
    }
});

// scroll fade nav

    // $(document).ready(function () {
    //     var scrollStart = 0;
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

// timeline - original by George Martsoukos https://tutsplus.com/authors/george-martsoukos

      // define variables
      var items = document.querySelectorAll(".timeline li");

      // check if an element is in viewport
      // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      function callbackFunc() {
        for (var i = 0; i < items.length; i++) {
          if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
          }
        }
      }

      // listen for events
      window.addEventListener("load", callbackFunc);
      window.addEventListener("resize", callbackFunc);
      window.addEventListener("scroll", callbackFunc);


// INITS

// smoothscroll init

var scroll = new SmoothScroll('a[href*="#"]');

// clipboard init

var clipboard = new Clipboard('.clp', {
    container: document.getElementById('key_modal')
});
clipboard.on('success', function (e) {
    //console.log(e);
});
clipboard.on('error', function (e) {
    //console.log(e);
});

$(document).ready(function() {
  carousel($('div.team-carousel'));
  carousel($('div.advisors-carousel'));
});
