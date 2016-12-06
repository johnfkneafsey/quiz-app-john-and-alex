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


//function to render question and choices
function listQuestion(state) {
	$('.js-question-class').html('<h3>' + state.questionsArray[state.questionNumber] + '</h3>');
			
		for (var k=0; k<state.choicesArray[state.questionNumber].length; k++) {
			$('.js-choices-class').append('<input type="radio" name="choice" value="' + (k + 1) + 
				'" id="choice" required><label for="choice">' + state.choicesArray[state.questionNumber][k] + '</label><br/>')
		}
		$('.js-choices-class').append('<button type="submit">Submit</button>');	
//	return radio input value
}

function hideStartButton (state) {
	$('.js-start-button-class').addClass('hidden');
}

function createRestartButton () {
	$('.js-restart-class').html('<button type="submit">Try Again</button>')
}

function clearChoices () {
	$('.js-choices-class').html('');	
}

function addUserAnswers (value) {
	state.userAnswers.push(value);
	console.log(state.userAnswers);
}


function displayQuestionCount (state) {
	if (state.questionNumber < state.questionsArray.length) {
		$('.js-question-count-class').html('<p>Question: ' + (state.questionNumber + 1) + ' of 5</p>');		
	} else {
		$('.js-question-count-class').html('<p>Question: ' + (state.questionNumber) + ' of 5</p>');			
	}
}


function updateScore (state) {
	$('.js-score-class').html('<p>Score: ' + state.correctAnswerCounter + ' out of ' + state.questionNumber + '</p>');
}
//Evaluation function

function evaluateAnswer (state) {
	if (state.userAnswers[state.questionNumber - 1] == state.answersArray[state.questionNumber - 1]) {
		addCorrect(state);
		alert('Correct!');
	} else {
		alert('Oops! Wrong answer.')
	}
}

//	if (evaluation === true) {
//		add +1 to correct counter
//		display message saying correct
//	} else {
//		do not add to correct counter
//		display message saying incorrect




// Event Listener start quiz
$('.js-start-button-class').on('click', 'button', function(event) {
    event.preventDefault();
    listQuestion(state);
    hideStartButton();
    displayQuestionCount(state);
    //remove top line to separate render
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
		updateScore(state);
	} else {
		addUserAnswers($("input[name=choice]:checked").val());	
		questionCounter(state);
		evaluateAnswer(state);
		clearChoices();
		displayQuestionCount(state);
		updateScore(state);
		createRestartButton();
	}
});

$('.js-restart-class').on('click', 'button', function(event) {
 	location.reload();
 });


/*
var state = {
	activeDiv: '#div2'
	};
function setActiveDiv(state, div) {
	state.activeDiv = div;
}
setActiveDiv('#div1');
function renderActiveDiv(state) {
	$('.page.divs').addClass('hidden');
	$(state.activeDiv).removeClass('hidden');
}
*/
