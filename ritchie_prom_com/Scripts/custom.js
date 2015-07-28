$(function () {
    // For the nav-bar changing classes upon scroll
    $(window).on('scroll', function () {
        var yPosition = window.pageYOffset;
        var pastPosition = 300;

        // If scroll past a certain point, else...
        if (yPosition > pastPosition) {
            $("#site-navbar").addClass("solid");
            $(".menuItem a").removeClass("large");
            $(".menuItem a").addClass("bold-font");
            $("#navbar-download a").removeClass("display-hidden");
        }
        else {
            $("#site-navbar").removeClass("solid");
            $(".menuItem a").addClass("large");
            $(".menuItem a").removeClass("bold-font");
            $("#navbar-download a").addClass("display-hidden");
        }
    });

    // For smooth scrolling with anchor tags
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    // For cycling through text in the objective section
    $(function () {
        var wordlist = [
            "Web",
            "Front-End",
            "Back-End",
            "C#",
            "JavaScript"
        ]

        var count = 0;

        function changeWord() {
            $("#objective .word-group h1").text(wordlist[count]);
            count++;

            if (count > wordlist.length) {
                count = 0;
            }

            setTimeout(function () {
                changeWord();
            }, 3000);
        };

        changeWord();
    })
});