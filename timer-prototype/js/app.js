(function($) {

    var $startScreen = $('.home'),
        $questionScreen = $('.question'),
        $answerScreen = $('.answer'),
        startTime = 5000, // 5 seconds
        totalPossiblePoints = 50,
        timingInterval = startTime / totalPossiblePoints,
        score = 0,
        points = 0,
        startGame = function() {
            showScreen($startScreen);

            $('.start', $startScreen).click(function() {
                showScreen($questionScreen);
                flipButtons();
                countdown();
            });
        },
        showScreen = function(screen) {
            $('.section').not(screen).hide();
            $(screen).show();
        },
        flipButtons = function() {
            var buttonClasses = ['', 'buttons--reverse', 'buttons--top', 'buttons--top-r', 'buttons--bottom', 'buttons--bottom-r'],
                randomClass = buttonClasses[Math.floor(Math.random() * buttonClasses.length)];

            $('.buttons', $questionScreen)
                .removeClass()
                .addClass('buttons ' + randomClass);

        },
        countdown = function() {
            $('#countdown').text(totalPossiblePoints);

            var pointsRemaining = totalPossiblePoints,
                counter = setInterval(timer, timingInterval);

            function timer() {
                pointsRemaining = pointsRemaining - 1;

                $('#countdown').text(pointsRemaining);

                if (pointsRemaining <= 0) {
                   clearInterval(counter);
                   return;
                }
            }

            $('button', $questionScreen)
                .off('click.recordAnswer')
                .on('click.recordAnswer', function() {
                    points = pointsRemaining;
                    clearInterval(counter);
                    recordAnswer(points);
                });
        },
        recordAnswer = function(points) {
            $('.points', $answerScreen).text(points);
            showScreen($answerScreen);

            $('button', $answerScreen)
                .off('click.startGame')
                .on('click.startGame', function() {
                    if ($(this).is('.add')) {
                        score += points;
                        $('.points', $startScreen).text(score);
                    }

                    showScreen($startScreen);

                });
        },
        init = function() {
            startGame();
        };

    init();

})(jQuery);
