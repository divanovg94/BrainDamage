var gameModule = angular.module('gameModule', ["questionService"])
gameModule.controller('gameController', function ($scope,$rootScope,LoadQuestions) {

    var answers = [];
    $('canvas').hide();
    $('#question').hide();
    $('#btmBar').hide();
    $('#gameOver').hide();
    var index = 0;
    //user health
    var userPoints = 5;
    //enemy health
    var enemyPoints = 5;
    var damage = 1;

    LoadQuestions.load().then(function(response){
        questions = response.data;
    })

    //subscribe for event game:easy
    $scope.$on('game:easy', function(event, args) {
        damage = 6;
        init();
    });

    $scope.$on('timer:expire', function(event, args) {
        incorrectAnswer();
        nextQuestion();
    });
    
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

        $('canvas').show('slow');
        $('#btmBar').show('slow');
        idle(300, 'assets/sprites/Boy/Idle.png', false);
        idle(700, 'assets/sprites/Girl/IdleL.png', true);
        setTimeout(function () {
            $('#question').show('slow');
        }, 1500)
    };

    function correctAnswer(){
        $('#question').hide('slow');
        enemyPoints--;
        running(300, 1000, 'assets/sprites/Boy/run.png', false);
        setTimeout(function () {
            attack(1000, 'assets/sprites/Boy/attack.png', false);
            falling(700, 'assets/sprites/Girl/fallingL.png', true);
        }, 860);
    }

    function incorrectAnswer(){
        $('#question').hide('slow');
        userPoints-=damage;
        running(700, 50, 'assets/sprites/Girl/runL.png', true);
        setTimeout(function () {
            attack(50, 'assets/sprites/Girl/attackL.png', true);
            falling(300, 'assets/sprites/Boy/falling.png', false);
        }, 870);
    }

    function gameResult(win){
        if(win){
            $scope.gameResult = "you win";
        } else {
            $scope.gameResult = "you lost";
        }
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

                    if(userPoints <= 0) {
                        $scope.hp = healthbar[0];
                    } else {
                        $scope.hp = healthbar[userPoints];
                    }

                    if(enemyPoints <= 0) {
                        $scope.hpL = healthbarL[0];
                    } else {
                        $scope.hpL = healthbarL[enemyPoints];
                    }

                    
                    ctx.clearRect(0, 0, 1170, 460);
                    idle(300, 'assets/sprites/Boy/Idle.png', false);
                    idle(700, 'assets/sprites/Girl/IdleL.png', true);
                })

                if(userPoints <= 0){
                    gameResult(false);
                }

                if(enemyPoints <= 0){
                    gameResult(true);
                }

                if(userPoints > 0 && enemyPoints > 0){
                    $('#question').show('slow');
                    $rootScope.$broadcast('timer:start', '');                    
                }
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
  if(secs < 0)
    secs = 0;

  return secs + ' seconds left';
}

var healthbar = ['assets/sprites/hpbar/hpbar-0.png', 'assets/sprites/hpbar/hpbar-20.png', 'assets/sprites/hpbar/hpbar-40.png', 'assets/sprites/hpbar/hpbar-60.png', 'assets/sprites/hpbar/hpbar-80.png', 'assets/sprites/hpbar/hpbar-100.png'];
var healthbarL = ['assets/sprites/hpbar/hpbar-0L.png', 'assets/sprites/hpbar/hpbar-20L.png', 'assets/sprites/hpbar/hpbar-40L.png', 'assets/sprites/hpbar/hpbar-60L.png', 'assets/sprites/hpbar/hpbar-80L.png', 'assets/sprites/hpbar/hpbar-100L.png'];
var roundEnds = ['You WIN!', 'You lose!'];

var questions;