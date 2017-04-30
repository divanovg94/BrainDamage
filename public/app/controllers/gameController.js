var gameModule = angular.module('gameModule', ["questionService"])
gameModule.controller('gameController', function ($scope,$rootScope,LoadQuestions) {

    var answers = [];
    $('canvas').hide();
    $('#question').hide();
    $('#btmBar').hide();
    $('#gameOver').hide();
    var index = 0;
    var points = 5;
    var pointsL = 5;
    startFlag = false;

    LoadQuestions.load().then(function(response){
        console.log(response);
        questions = response.data;
        console.log(questions);
    })

    $scope.$on('timer:expire', function(event, args) {
        incorrectAnswer();
        nextQuestion();
    });

    window.addEventListener('keydown', function (event) {
        if (event.keyCode == 32 && !startFlag) {
            $('canvas').show('slow');
            $('#btmBar').show('slow');
            idle(300, 'assets/sprites/Boy/Idle.png', false);
            idle(700, 'assets/sprites/Girl/IdleL.png', true);
            setTimeout(function () {
                $('#question').show('slow');
            }, 1500)
            startFlag = true;
        }
    }, false);
    
    function init() {
        nextQuestion();

        $('.ansBtns').on("click", function () {
            unvisible = true;
            if ($(this).text() != questions[index].correctanswer) {
                correctAnswer();
            } else {
                incorrectAnswer();
            }

            nextQuestion();
        })
    };

    init();

    function correctAnswer(){
        $('#question').hide('slow');
        pointsL--;
        running(300, 1000, 'assets/sprites/Boy/run.png', false);
        setTimeout(function () {
            attack(1000, 'assets/sprites/Boy/attack.png', false);
            falling(700, 'assets/sprites/Girl/fallingL.png', true);
        }, 860);
    }

    function incorrectAnswer(){
        $('#question').hide('slow');
        points--;
        running(700, 50, 'assets/sprites/Girl/runL.png', true);
        setTimeout(function () {
            attack(50, 'assets/sprites/Girl/attackL.png', true);
            falling(300, 'assets/sprites/Boy/falling.png', false);
        }, 870);
    }

    function nextQuestion() {
        ctx.clearRect(0, 0, 1170, 460);
        setTimeout(function () {
            if (index < questions.length) {
                $scope.$apply(function () {
                    unvisible = false;
                    $scope.question = questions[index].question;
                    $scope.answer1 = questions[index].firstanswer;
                    $scope.answer2 = questions[index].secondanswer;
                    $scope.answer3 = questions[index].thirdanswer;
                    $scope.hp = healthbar[points];
                    $scope.hpL = healthbarL[pointsL];
                    $('#question').show('slow');
                    ctx.clearRect(0, 0, 1170, 460);
                    idle(300, 'assets/sprites/Boy/Idle.png', false);
                    idle(700, 'assets/sprites/Girl/IdleL.png', true);
                })
                $rootScope.$broadcast('timer:start', '');
            }
            index++;
        }, 2500);
    }
});

var currentSecconds = 10000;
var oneSecond = 1000;

gameModule.controller('timerController', function ($scope,$timeout,$rootScope) {

    $scope.clock='loading timer...';

    var tick = function(){
        $scope.clock = msToTimerSecondsConverter(currentSecconds)
        currentSecconds -= oneSecond;

        if(currentSecconds >= 0) {
            $timeout(tick,oneSecond);
        } else {
            $rootScope.$broadcast('timer:expire', '');
        }

    }

    $scope.$on('timer:start', function(event, args) {
        currentSecconds = 10000;
        $timeout(tick,oneSecond);
    });
})

function msToTimerSecondsConverter(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
//   s = (s - secs) / 60;
//   var mins = s % 60;
//   var hrs = (s - mins) / 60;
  return secs + ' seconds left';
}

var healthbar = ['assets/sprites/hpbar/hpbar-0.png', 'assets/sprites/hpbar/hpbar-20.png', 'assets/sprites/hpbar/hpbar-40.png', 'assets/sprites/hpbar/hpbar-60.png', 'assets/sprites/hpbar/hpbar-80.png', 'assets/sprites/hpbar/hpbar-100.png'];
var healthbarL = ['assets/sprites/hpbar/hpbar-0L.png', 'assets/sprites/hpbar/hpbar-20L.png', 'assets/sprites/hpbar/hpbar-40L.png', 'assets/sprites/hpbar/hpbar-60L.png', 'assets/sprites/hpbar/hpbar-80L.png', 'assets/sprites/hpbar/hpbar-100L.png'];
var roundEnds = ['You WIN!', 'You lose!'];

var questions;
var hpImagePaths = [
    '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'
]