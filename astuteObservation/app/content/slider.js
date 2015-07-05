(function () {
    var containerLeft = $('#container-left-top');
    var containerRight = $('#container-right-bottom');
    var starterContentLeft = $('#starter-content-left-top');
    var starterContentRight = $('#starter-content-right-bottom');
    var contentLeft = $('#content-left-top');
    var contentRight = $('#content-right-bottom');
    var aoTitle = $('#ao-title');
    var leftPanelOpen = false;
    var rightPanelOpen = false;
    var shadeLeft,
        shadeRight,
        toggleHidden,
        timeoutSet,
        startX,
        startY,
        endX,
        endY,
        getX,
        getY;

    var dragging = false;
    var defaultTransition = 'all .3s ease-in-out .3s';
    var setDefaultState,
        widthLeftTop,
        widthTemp,
        widthPercentageTemp,
        widthWindow,
        heightLeftTop,
        heightTemp,
        heightPercentageTemp,
        heightWindow,
        windowUpperLimit,
        windowLowerLimit,
        toggleBack;

    //// Code for touch. Working, but not all bugs worked out
    // Initial touch
    $('#container-left-top, #container-right-bottom').on('mousedown touchstart', function (e) {
        e.preventDefault();
        dragging = true;
        startX = getX(e);
        startY = getY(e);
    });

    // Action during move
    $('#container-left-top, #container-right-bottom').on('mousemove touchmove', function (e) {
        if (dragging) {
            endX = getX(e);
            endY = getY(e);

            $('#container-left-top').css('-webkit-transition', 'none');
            $('#container-right-bottom').css('-webkit-transition', 'none');

            // If landscape adjust width, else if potrait mode adjust height
            if ($(window).width() > 900) {
                widthLeftTop = $('#container-left-top').width();
                widthTemp = widthLeftTop - endX;
                widthWindow = $(window).width();
                widthPercentageTemp = (widthTemp / widthWindow) * 100;
                $('#container-right-bottom').css('width', '+=' + widthPercentageTemp.toFixed(0).toString());
                $('#container-left-top').css('width', '-=' + widthPercentageTemp.toFixed(0).toString());
                widthTemp = null;

                widthLeftTop = $('#container-left-top').width();
                windowLowerLimit = (widthWindow * .70);
                windowUpperLimit = (widthWindow * .30);

                if (widthLeftTop > windowLowerLimit) {
                    setDefaultState('width');
                    shadeLeft();
                    dragging = false;
                }
                else if (widthLeftTop < windowUpperLimit) {
                    setDefaultState('width');
                    shadeRight();
                    dragging = false;
                }
            }
            else {
                heightWindow = $(window).height();
                windowLowerLimit = (heightWindow * .70);
                windowUpperLimit = (heightWindow * .30);

                if ((startY > endY && startY > heightWindow / 2) || (startY < endY && startY < heightWindow / 2)) {
                    heightLeftTop = $('#container-left-top').height();
                    heightTemp = heightLeftTop - endY;

                    heightPercentageTemp = (heightTemp / heightWindow) * 100;
                    $('#container-right-bottom').css('height', '+=' + heightPercentageTemp.toFixed(0).toString());
                    $('#container-left-top').css('height', '-=' + heightPercentageTemp.toFixed(0).toString());
                    heightTemp = null;

                    heightLeftTop = $('#container-left-top').height();

                    if (heightLeftTop > windowLowerLimit) {
                        setDefaultState('height');
                        shadeLeft();
                        dragging = false;
                    }
                    else if (heightLeftTop < windowUpperLimit) {
                        setDefaultState('height');
                        shadeRight();
                        dragging = false;
                    }
                }
            }
        }

    });

    $('#container-left-top, #container-right-bottom').on('mouseup touchend', function (e) {
        e.preventDefault();

        if (!leftPanelOpen && !rightPanelOpen) {
            setDefaultState('height');
        }

        dragging = false;
        endX = getX(e);
        endY = getY(e);

        if (endX === startX && endY === startY) {
            if (this.id === 'container-left-top' && !leftPanelOpen) {
                shadeLeft();
            }
            else if (this.id === 'container-right-bottom' && !rightPanelOpen) {
                shadeRight();
            }

        }
    });

    shadeLeft = function () {
        if (!timeoutSet) {
            if (leftPanelOpen) {
                leftPanelOpen = false;
            }
            else {
                leftPanelOpen = true;
            }

            $('body').css('background', '#111111');
            containerLeft.toggleClass('full');
            containerRight.toggleClass('closed');
            toggleHidden(contentLeft);
            toggleHidden(starterContentLeft);
        }
    }

    shadeRight = function () {
        if (!timeoutSet) {
            if (rightPanelOpen) {
                rightPanelOpen = false;
            }
            else {
                rightPanelOpen = true;
            }

            $('body').css('background', '#000000');
            containerRight.toggleClass('full');
            containerLeft.toggleClass('closed');
            toggleHidden(contentRight);
            toggleHidden(starterContentRight);
        }
    }

    // When toggling a panel, this code contains removing various containers and
    // setting timeouts to ensure no clicking can be done while the transition is
    // happening
    toggleHidden = function (content) {
        if (content.hasClass('util-hide')) {
            content.addClass('anim-fade-in').removeClass('anim-fade-out');
            timeoutSet = true;
            setTimeout(function () {
                content.removeClass('util-hide');
            }, 500);
            // Removes from DOM to fix scroll-bar from appearing.
            // Added after visibility toggle to ensure smooth transition
            setTimeout(function () {
                content.css('display', 'block');
                aoTitle.css('display', 'block');
            }, 501);
            // Stops additional clicks during animation
            setTimeout(function () {
                timeoutSet = false;
            }, 600);
        }
        else {
            content.addClass('anim-fade-out').removeClass('anim-fade-in');
            timeoutSet = true;
            setTimeout(function () {
                content.addClass('util-hide');
            }, 500);
            // Removes from DOM to fix scroll-bar from appearing
            // Added after visibility toggle to ensure smooth transition
            setTimeout(function () {
                content.css('display', 'none');
                aoTitle.css('display', 'none');
            }, 501);
            // Stops additional clicks during animation
            setTimeout(function () {
                timeoutSet = false;
            }, 600);
        }

    }

    getX = function (event) {
        if (event.type.indexOf('mouse') !== -1) {
            return event.clientX;
        }
        else if (event.type.indexOf('touch') !== -1) {
            return event.originalEvent.changedTouches[0].pageX;
        }
    }

    getY = function (event) {
        if (event.type.indexOf('mouse') !== -1) {
            return event.clientY;
        }
        else if (event.type.indexOf('touch') !== -1) {
            return event.originalEvent.changedTouches[0].pageY;
        }
    }

    setDefaultState = function () {
        $('#container-left-top').css('-webkit-transition', defaultTransition);
        $('#container-right-bottom').css('-webkit-transition', defaultTransition);

        if ($(window).width() > 900) {
            $('#container-left-top, #container-right-bottom').css('height', '');
            $('#container-left-top, #container-right-bottom').css('width', '');
        }
        else {
            $('#container-left-top, #container-right-bottom').css('height', '');
            $('#container-left-top, #container-right-bottom').css('width', '');
        }
    }

    toggleBack = function () {

    }


})();