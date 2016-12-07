
// State
var state = {
	questionsArray: [
	'Q1 What was the treaty that ended WWI that laid some of the unrest that would later explode into WWII?',
	'Q2 Hitler became the essential dictator of Germany in which decade?',
	'Q3 What war during the 1930s greatly influenced the development of military tactics that were used in WWII?',
	'Q4 What was the last major attempt at a peaceful resolution with Germany prior to the outbreak of WWII?',
	'Q5 What event began World War II?',
	],
	choicesArray: [
	['Geneva Conference', 'Treaty of Versailles', 'Paris Peace Accords', 'Treaty of Brest-Litovsk'],
	['1920s', '1950s', '1940s', '1930s'],
	['The Spanish-American War', 'The Boer War', 'The Spanish Civil War', 'The Korean War'],
	['The Munich Conference', 'The 1936 Olympic Conferences', 'The Washington Naval Conference', 'The Geneva Convention'],
	['Pearl Harbor', 'Assassination of Arch Duke Ferdinand', 'Invasion of Poland', 'Battle of Britain'],
	],
	answersArray: [2, 4, 3, 1, 3,],
	answerCorrect: 'Correct answer!',
	answerIncorrect: 'Oops. That is not the correct answer',
	questionNumber: 0,
	userAnswers: [],
	correctAnswerCounter: 0
};



// State modification functions
function questionCounter (state) {
    state.questionNumber++;
    return state;
};   

function addCorrect (state) {
	state.correctAnswerCounter++;
}

function addUserAnswers (value) {
	state.userAnswers.push(value);
	console.log(state.userAnswers);
}





// Render Functions
function listQuestion(state) {
	$('.js-question-class').html('<h3>' + state.questionsArray[state.questionNumber] + '</h3>');
			
		for (var k=0; k < state.choicesArray[state.questionNumber].length; k++) {
			$('.js-choices-class').append('<input type="radio" name="choice" value="' + (k + 1) + 
				'" id="choice" required><label for="choice">' + state.choicesArray[state.questionNumber][k] + '</label><br/>')
		}
		$('.js-choices-class').append('<button type="submit">Submit</button>');	
}

function hideStartButton (state) {
	$('.js-start-button-class').addClass('hidden');
}

function displayQuestionCount (state) {
	if (state.questionNumber < state.questionsArray.length) {
		$('.js-question-count-class').html('<h4>Question: ' + (state.questionNumber + 1) + ' of 5</h4>');		
	} else {
		$('.js-question-count-class').html('<h4>Question: ' + (state.questionNumber) + ' of 5</h4>');			
	}
}

// Evaluation function
function evaluateAnswer (state) {
	if (state.userAnswers[state.questionNumber - 1] == state.answersArray[state.questionNumber - 1]) {
		addCorrect(state);
		alert('Correct!');
	} else {
		alert('Oops! Wrong answer.')
	}
}

function clearChoices () {
	$('.js-choices-class').html('');	
}

function clearQuestion () {
	$('.js-question-class').addClass('hidden');
}

function updateScore (state) {
	$('.js-score-class').html('<h4>Score: ' + '<div class="green">' + state.correctAnswerCounter + '</div>' + ' out of ' + '<div class="red">' + state.questionNumber + '</div></h4>');
}

function createRestartButton () {
	$('.js-restart-class').html('<button type="submit">Try Again</button>')
}






// Event Listeners
$('.js-start-button-class').on('click', 'button', function(event) {
    event.preventDefault();
    listQuestion(state);
    hideStartButton();
    displayQuestionCount(state);
});


$('.js-choices-class').submit(function(event) {
	event.preventDefault();
	if ((state.questionNumber + 1) < state.questionsArray.length) {
		addUserAnswers($("input[name=choice]:checked").val());
		questionCounter(state);
		evaluateAnswer(state);
		clearChoices();		
		listQuestion(state);
		displayQuestionCount(state);
		updateScore(state)
	} else {
		addUserAnswers($("input[name=choice]:checked").val());	
		questionCounter(state);
		evaluateAnswer(state);
		clearChoices();
		clearQuestion();
		displayQuestionCount(state);
		updateScore(state);
		createRestartButton();
	}
});

$('.js-restart-class').on('click', 'button', function(event) {
 	location.reload();
 });


