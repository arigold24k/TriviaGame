var count = 0;
var answer;
var unanswered = 0;
var time =15;
var correct = 0;
var incorrect = 0;
var questiontimer;
var intervalId;
var Questions = {
    Question1: "What show was set in the woods around a Campfire, and was sure to give you a fright?",
    Options1: ["a) Are You Afraid of the Dark", "b) Tales from the Crypt", "c) Goosebumps", "d) Knock Knock"],
    Answer1: "a) Are You Afraid of the Dark",

    Question2: "What was Kel's favorite beverage to drink in Kenan and Kel?",
    Options2: ["a) Sweet Tea", "b) Grape Soda", "c) Orange Soda", "d) Pepsi"],
    Answer2: "c) Orange Soda",

    Question3: "In 'All That' who would you call to fix things around the house?",
    Options3: ["a) Bob the Builder", "b) The Repair Man Man Maaan", "c) Steve the plumber", "d) Andrew"],
    Answer3: "b) The Repair Man Man Maaan",

    Question4: "What was the first big movie produced by nickelodeon?",
    Options4: ["a) The Rugrats Movie", "b) The Wild Thornberry's", "c) Harriet the Spy", "d) Matilda"],
    Answer4: "c) Harriet the Spy",

    Question5: "In the film Good Burger, what was the name of the other burger restaurant?",
    Options5: ["a) Good Burger", "b) Wac 'Arnolds", "c) Pollos Loco", "d) Mondo Burger"],
    Answer5: "d) Mondo Burger",

    Question6: "In the cartoon series 'Rugrats', what were the names of the twins?",
    Options6: ["a) Phil and Lil", "b) Double Mint Twins", "c) Ren and Stimpy", "d) Mary Kate and Ashley"],
    Answer6: "a) Phil and Lil",

    Question7: "Who was Hey Arnolds secret admirer?",
    Options7: ["a) Ashley", "b) Phoebe", "c) Maria", "d) Heldga"],
    Answer7: "d) Heldga",

    images: ["assets/images/afraid.jpeg", "assets/images/orange.jpg", "assets/images/repair.jpg", "assets/images/harriet.jpg", "assets/images/mondo.jpg", "assets/images/twins.jpg", "assets/images/helga.jpg"],
};


$(document).on("click", "#reset", function () {
    reset();
});

$("#startbut").click(function() {
    nextquestion();
//            beginGame();
});

$(document).on("click", ".options", function () {
    console.log($(this).text());
    console.log(count);
    if ($(this).text() === answer) {
        correctAnswer();

    }
    else {
        incorrectAnswer();
    }
})



function nextquestion () {
    count++;
    if (count >= 8) {
        //call function that puts out the win
        console.log(unanswered);
        console.log(correct);
        console.log(incorrect);
        gameover();
    }
    else {
        questiontimer = setTimeout(timeout, 1000 * 15);
        updatescreen(count);

    }



}

function updatescreen (x) {
    $(".question").empty();


    answer = Questions["Answer" + x];
    var a = $("<div>");
    a.addClass("timer");
    $(".question").append(a);

    $(".timer").html("<div> Time Remaining: <span class='time'></span>");
//timer thingy
    time = 16;
    timecount();
    intervalId = setInterval(timecount, 1000);


    var a = $("<div>");
    a.addClass("choices");
    $(".question").append(a);
    var currques = "Question" + x;
    var currops = "Options" + x;

    $(".choices").text(Questions["Question" + x]);
    var arry = Questions["Options" + x];
    console.log(arry);
    var arrlen = arry.length;
    for (var j = 0; j < arrlen; j++) {
        $(".question").append("<button class='options'>" + arry[j] + "</button>" );
    }

    console.log(currques);
    console.log(currops);

}


function timeout() {
    unanswered++;
    $(".time").html(timeConverter(0));
    clearInterval(intervalId);
    clearTimeout(questiontimer);
    $(".choices").text("Out of Time!");
    $(".options").remove();
    $(".question").append("<div class='text2'>The correct Answer is " + Questions["Answer" + count] + "</div>");
    $(".question").append("<img src=" + Questions.images[count -1] + ">");
    setTimeout(nextquestion, 1000 * 3);
};

function gameover() {
    $(".question").empty();
    var percent = Math.round((correct / 7) * 100) + "%";
    clearInterval(intervalId);
    clearTimeout(questiontimer);
    $(".question").append("<div class='text2'> You have Answered all the questions! Here are your results: </div>");
    $(".question").append("<div class='text2'>" + percent + "</div>");
    $(".question").append("<div class='text2'>Answered Correctly " + correct + "</div>");
    $(".question").append("<div class='text2'>Answered Incorrectly " + incorrect + "</div>");
    $(".question").append("<div class='text2'>Unanswered " + unanswered + "</div>");
    $(".question").append("<button id='reset'>Reset </button>");
};


function correctAnswer() {
    correct++;
    clearInterval(intervalId);
    clearTimeout(questiontimer);
    $(".choices").text("Correct!");
    $(".options").remove();
    $(".question").append("<div class='text2'>The correct Answer is " + Questions["Answer" + count] + "</div>");
    //add code to append image
    $(".question").append("<img src=" + Questions.images[count -1] + ">");
    setTimeout(nextquestion, 1000 * 3);


};

function incorrectAnswer() {
    incorrect++;
    clearInterval(intervalId);
    clearTimeout(questiontimer);
    $(".choices").text("Nope!");
    $(".options").remove();
    $(".question").append("<div class='text2'>The correct Answer is " + Questions["Answer" + count] + "</div>");
    //add code to append image
    $(".question").append("<img src=" + Questions.images[count -1] + ">");
    setTimeout(nextquestion, 1000 * 3);
};



function reset() {
    count = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    nextquestion();

}

function timecount() {

    time--;

    var converted = timeConverter(time);
    console.log(converted);

    $(".time").html(converted);
}


function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
};


