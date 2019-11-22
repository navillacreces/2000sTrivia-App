let currentQuestionScoreBoard = 1; // current question will start 1
let currentUserScore = 0;          // user score starts at 0
let currentQuestionIndex = 0;     // the array of questions will start at index 0

let currentCorrectAnswer = null;
//let theCorrectAnswer = STORE[currentQuestionIndex].correctAnswer; // if i declare this initially
// i get STORE is NOT defined at script.js: 6

// +=1 to currentUserScore
function incrementCurrentUserScore(){
  currentUserScore += 1; 
  $('.userScoreBoard').html(currentUserScore);
}
// +=1 to current question score board
function incrementCurrentQuestionScoreBoard(){
  currentQuestionScoreBoard += 1; 
  $('.question-count').html(currentQuestionScoreBoard);
}
// +=1 to question Index
function incrementCurrentQuestionIndex(){
  currentQuestionIndex += 1; 
}

// display the current value of currentQuestionScoreBoard & 
// current user score on the score board
function updateQuestionAndScoreBoard(){
    $('.question-count').html(currentQuestionScoreBoard);
    $('.userScoreBoard').html(currentUserScore);
}

// load the first question to begin the game
function loadFirstQuestion(){

    $('#reset').hide();
    $('#theStartButton').hide(); //hide startGame button

    updateQuestionAndScoreBoard(); // initialize Scoreboard 

    // variables from data.js | question & 4 possible answers | currentCorrectAnswer now a string
    let theQuestionFromList = STORE[currentQuestionIndex].question;
    let possAnswer1 = STORE[currentQuestionIndex].answers[0];
    let possAnswer2 = STORE[currentQuestionIndex].answers[1];
    let possAnswer3 = STORE[currentQuestionIndex].answers[2];
    let possAnswer4 = STORE[currentQuestionIndex].answers[3];
    currentCorrectAnswer = STORE[currentQuestionIndex].correctAnswer;
    //
    // this could be a loop

    
    // displays the question
    $('h2').html(theQuestionFromList);
    
    const thePossibleAnswersList = $(`
            <input type="radio" class="radio-bttn" tabindex="0" name="possibleAnswers" value="${possAnswer1}">${possAnswer1}</input><br><br>
            <input type="radio" class="radio-bttn" tabindex="1" name="possibleAnswers" value="${possAnswer2}">${possAnswer2}</input><br><br>
            <input type="radio" class="radio-bttn" tabindex="2" name="possibleAnswers" value="${possAnswer3}">${possAnswer3}</input><br><br>
            <input type="radio" class="radio-bttn" tabindex="3" name="possibleAnswers" value="${possAnswer4}">${possAnswer4}</input><br><br>
            <button type="submit" id="finalAnswer" class="submit-button">FinalAnswer</button>`);
            
            
          
    $(".theGameQuestions").html(thePossibleAnswersList);
    $(".theGameQuestions").show();
}

// user has selected a possible answer and clicks the submit button
function userHitsSubmit(){

  $('#theForm').submit(function (event){
    event.preventDefault();
    let chosen = $('input[name=\"possibleAnswers\"]:checked').val();
    verifyUsersAnswer(chosen);
  })


}

function verifyUsersAnswer(usersAnswer){
    
    if (usersAnswer === currentCorrectAnswer){
      incrementCurrentUserScore();
      $('h2').html("Correct!");
      $('.theGameQuestions').hide(); 
      $("#next-button-goes").show();
    } else {
      $('h2').html("WRONG");
      $('.theGameQuestions').hide();
      $('.theRightAnswerWas').html(`The correct answer was : ${currentCorrectAnswer}`);
      $('.theRightAnswerWas').show();
      $("#next-button-goes").show();
    }
    
    $('#next-button-goes').html(`<button type="button" class="next-button"id="the-next-button">Next</button>`);
    
    
}

function userHitsNextButton(){

  $('#theForm').on('click','#the-next-button',function (event){

      if (currentQuestionIndex == 5){
        console.log("thisistheendbeautifulfriend");
        thisIsTheEnd();
      } else {

      incrementCurrentQuestionIndex();
      incrementCurrentQuestionScoreBoard();
      $('.theRightAnswerWas').hide();
      loadNextQuestion();
      }
  })
}

function loadNextQuestion(){

  let theQuestionFromList = STORE[currentQuestionIndex].question;
    let possAnswer1 = STORE[currentQuestionIndex].answers[0];
    let possAnswer2 = STORE[currentQuestionIndex].answers[1];
    let possAnswer3 = STORE[currentQuestionIndex].answers[2];
    let possAnswer4 = STORE[currentQuestionIndex].answers[3];
    currentCorrectAnswer = STORE[currentQuestionIndex].correctAnswer;
    

  $('h2').html(theQuestionFromList);
  const thePossibleAnswersList = $(`
            <input type="radio" class="radio-bttn" name="possibleAnswers" value="${possAnswer1}">${possAnswer1}</input><br><br>
            <input type="radio" class="radio-bttn" name="possibleAnswers" value="${possAnswer2}">${possAnswer2}</input><br><br>
            <input type="radio" class="radio-bttn" name="possibleAnswers" value="${possAnswer3}">${possAnswer3}</input><br><br>
            <input type="radio" class="radio-bttn" name="possibleAnswers" value="${possAnswer4}">${possAnswer4}</input><br><br>
            <button type="submit" id="finalAnswer" class="submit-button">FinalAnswer</button>`);
            
            
          
    $(".theGameQuestions").html(thePossibleAnswersList);
    $(".theGameQuestions").show();
    $("#next-button-goes").hide();
}

function thisIsTheEnd(){

    const yourFinal = (`Your final score is ${currentUserScore} / 6`);
    $('h2').html(yourFinal);
    $("#next-button-goes").hide();
    $('.theRightAnswerWas').hide();
    const makeResetButton = $(`<button type="button" class="reset-button" id="reset">Play Again</button>`);
    $('#play-again').html(makeResetButton);
}


function resetGame(){

  $('#theForm').on('click', '#reset', function (event){

  currentUserScore = 0;
  currentQuestionIndex = 0;
  currentQuestionScoreBoard = 1;
  loadFirstQuestion();
  })

}


// user hits the "start button "
function startGame(){
  $('#theStartButton').on('click', function (event){
     loadFirstQuestion();
  })
}

// runs the app 
function play(){

  startGame();
  userHitsSubmit();
  userHitsNextButton();
  resetGame();
}
//ready
$(play);