


// GAME PROPERTIES
var triviaProperties = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    curentSet: 0,
    timer: 12,
    timerOn: false,
    timerId: "",
};

console.log(triviaProperties);
    
// QUESTION VARIABLE / OBJECT
    var questions = {
        q1: "What is Naruto's signature jutsu?",
        q2: "Who killed Jiraiya?",   
    };
    
    var options = {
        q1: ["Chidori", "Rasengan", "Flying Raijin", "Izanami"],
        q2: ["Obito", "Pain", "Kaguya", "Konan"],
    };
    
    var answers = {
        q1: "Rasengan",
        q2: "Pain"
    };

console.log(questions);
console.log(options);
console.log(answers);

$(document).ready(function() {
    $("#timeRemaining").hide();
    
        $("#startGame").on("click", gameStart);

});

function gameStart() {
    triviaProperties.correct = 0;
    triviaProperties.incorrect = 0;
    triviaProperties.curentSet = 0;
    triviaProperties.unanswered = 0;
    clearInterval(triviaProperties.timerId);

    $("#mainGame").show();

    $("#results").html("");

    $("#timeRemaining").show();
    $("#startGame").hide();
    

    console.log(gameStart);

    questionDisplay();
}

function questionDisplay() {
    triviaProperties.timer = 12;
    $("#timeRemaining").text("Time Remaining: " + triviaProperties.timer);

    if (!triviaProperties.timerOn) {
        triviaProperties.timerId = setInterval(triviaProperties.timerCount, 1200);
    };

    var questionContent = Object.values(questions)[triviaProperties.curentSet];
    $("#questions").text(questionContent);

    questionOptions = Object.values(options)[triviaProperties.curentSet];

    $.each(questionOptions, function(index, key) {
        $("#options").append($("<button class='btn btn-lg optionsBtn'>" + key + "</button>"));
        
    });

    console.log(questionOptions);
};