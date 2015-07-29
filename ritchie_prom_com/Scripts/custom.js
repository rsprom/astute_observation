$(function () {
    // For the nav-bar changing classes upon scroll
    $(window).on('scroll', function () {
        var yPosition = window.pageYOffset;
        var pastPosition = 300;

        // If scroll past a certain point, else...
        if (yPosition > pastPosition) {
            $('#site-navbar').addClass('solid');
            $('.menu-item a').removeClass('large');
            $('.menu-item a').addClass('bold-font');
            $('#navbar-download a').removeClass('display-hidden');
        }
        else {
            $('#site-navbar').removeClass('solid');
            $('.menu-item a').addClass('large');
            $('.menu-item a').removeClass('bold-font');
            $('#navbar-download a').addClass('display-hidden');
        }

        // To activate 'active' link
        var scrollPos = $(document).scrollTop();

        $('#menu-container a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#menu-container ul li a').removeClass('active'); //added to remove active class from all a elements
                currLink.addClass('active');
            }
            else {
                currLink.removeClass('active');
            }
        });
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
            'Web',
            'Front-End',
            'Back-End',
            'C#',
            'JavaScript'
        ]

        var count = 0;

        function changeWord() {
            $('#objective .word-group h1').text(wordlist[count]);
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