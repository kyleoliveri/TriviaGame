


// GAME PROPERTIES
var triviaProperties = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    curentSet: 0,
    timer: 10,
    timerOn: false,
    timerId: "",
    result: true
};

console.log(triviaProperties);
    
// QUESTION VARIABLE / OBJECT
    var questions = {
        q1: "What is Naruto's signature jutsu?",
        q2: "Who killed Jiraiya?",
        q3: "What is the Nine Tailed Fox's name?",
        q4: "How did Itachi Uchiha unlock his Mangekyo Sharingan?",
        q5: "Who is the Eight Tails Jinchuriki?",
        q6: "Who was the first Hokage?",
        q7: "What color is Sasuke's Susanoo?"
    };
    
    var options = {
        q1: ["Chidori", "Rasengan", "Flying Raijin", "Izanami"],
        q2: ["Obito", "Pain", "Kaguya", "Konan"],
        q3: ["Saiken", "Isobu", "Son Goku", "Kurama"],
        q4: ["Uchiha Clan Assassination", "Fighting Sasuke", "Shisui's Death", "Joining the ANBU"],
        q5: ["Killer B", "Gaara", "Kakashi", "Neji"],
        q6: ["Lady Tsunade", "Minato Namikaze", "Hashirama Senju", "Madara Uchiha"],
        q7: ["Blue", "Green", "Orange", "Purple"]
    };
    
    var answers = {
        q1: "Rasengan",
        q2: "Pain",
        q3: "Kurama",
        q4: "Shisui's Death",
        q5: "Killer B",
        q6: "Hashirama Senju",
        q7: "Purple"
    };

console.log(questions);
console.log(options);
console.log(answers);

// EVENT LISTENER
$(document).ready(function() {
    $("#timeRemaining").hide();
    $("#startGame").on("click", gameStart);
    $(document).on("click", ".option", answerCheck);



    // RESETS VALUES, HIDES/SHOWS CONTENT & CALLS THE QUESTION DISPLAY FUNCTION TO START THE GAME
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

        questionDisplay();
    }

    //DISPLAYS TIMER & QUESTIONS / ANSWER CHOICES, APPENDS BUTTONS, & DISPLAYS THE QUESTION WITH THE ANSWER CHOICES ASSIGNED TO THE BUTTONS
    function questionDisplay() {

        triviaProperties.timer = 10;
        $("#timeRemaining").text("Time Remaining: " + triviaProperties.timer);

        if (!triviaProperties.timerOn) {
            triviaProperties.timerId = setInterval(timerCount, 1000);
        };

        var questionContent = Object.values(questions)[triviaProperties.curentSet];
        $("#questions").text(questionContent);

        questionOptions = Object.values(options)[triviaProperties.curentSet];

        $.each(questionOptions, function(index, key) {
            $("#options").append($("<button class='option btn btn-lg optionsBtn' id='answerButtons'>" + key + "</button>"));

        });

        console.log(questionContent);
        console.log(questionOptions);

    };

    // DECREMENTS THE COUNTER AND COUNT THE UNANSWERED QUESTION IF THE TIMER RUNS OUT
    function timerCount() {
        if (triviaProperties.timer > -1 && Object.keys(questions).length) {
            $("#timeRemaining").text("Time Remaining: " + triviaProperties.timer);
            triviaProperties.timer--;
        }
        else if (triviaProperties.timer === -1) {
            triviaProperties.unanswered++;
            triviaProperties.result = false;
            clearInterval(triviaProperties.timerId);
            resultId = setTimeout(guessResult, 1000);
            $("#results").html("<h3>Time's up! The correct answer is: " + Object.values(answers)[triviaProperties.curentSet] + "</h3>");
        }
        else if (triviaProperties.curentSet === Object.keys(questions).length) {
            $("#results").html(
                "<h3>Results</h3>" +
                "<p>Correct: " + triviaProperties.correct + "</p>" + 
                "<p>Incorrect: " + triviaProperties.incorrect + "</p>" + 
                "<p>Unanswered: " + triviaProperties.unanswered + "</p>" + 
                "<p>Would you like to play again?</p>"
            );
            
            $("#gameMain").hide();
            $("startGame").show();
        }
    };

    function answerCheck() {
        var resultId;
        var currentAnswer = Object.values(answers)[triviaProperties.curentSet];

        if($(this).text() === currentAnswer) {
            triviaProperties.correct++;
            clearInterval(triviaProperties.timerId);
            resultId = setTimeout(guessResult, 1000);
            $('#results').html('<h3>Correct!</h3>');
        }
        else {
            triviaProperties.incorrect--;
            resultId = setTimeout(guessResult, 1000);
            $('#results').html('<h3>Wrong! The correct answer is:  ' + currentAnswer + '</h3>');
        }

    };

    function guessResult() {
        triviaProperties.curentSet++;
        
        $(".option").remove();
        $("#results h3").remove();
        
        questionDisplay();
    };

});