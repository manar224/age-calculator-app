var selectedDay;
var selectedMonth;
var selectedYear;

var isLeap = false;
var yearField = false;
var monthField = false;
var dayField = false;
var oddMonths = [1,3,5,7,8,10,12]

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const monthLength = new Date(currentYear, currentMonth, 0).getDate();
const maxYear = currentYear - 120;  // Maximum valid year (120 years ago)

var userBornDate = new Date(selectedYear, selectedMonth, selectedDay);
var userBornDay = userBornDate.getDate();
var userBornMonth = userBornDate.getMonth() + 1;
var userBornYear = userBornDate.getFullYear();

var ageMonthLength;



function calculation() {
	
		var ageDay = currentDay - selectedDay;
		var ageMonth = currentMonth - selectedMonth;
		var ageYear = currentYear - selectedYear;
		
		
		if (ageMonth < 0) {
			
		   ageYear--;
		  
			if (ageDay < 0) {
				
				ageMonth--;
				ageMonth = ageMonth + 12;
				getMonthLength(selectedYear, ageMonth);
				ageDay = ageDay + ageMonth;
				console.log(ageDay);
			}
			else  {
				
				ageMonth = ageMonth + 12;
			}
		}	else if (ageDay < 0) {
			
			ageMonth--;
			
			if(ageMonth < 0) {
				ageYear--;
				ageMonth = ageMonth + 12;
				getMonthLength(selectedYear, ageMonth+1);
				ageDay = ageDay + ageMonth;
				
			}
			else {
				getMonthLength(selectedYear, ageMonth+1);
				ageDay = ageDay + ageMonth;
			}
		}
	
		console.log(ageYear +'\n' + ageMonth + '\n' + ageDay)
  	$('.years-result').text(ageYear);
  	$('.months-result').text(ageMonth);
  	$('.days-result').text(ageDay);
}


function getMonthLength(year, month) {
    // Create a Date object for the last day of the specified month
    let monthLength = new Date(year, month, 0).getDate();
    return monthLength; // Return the number of days in the month
}


function assignValues() {
	selectedDay = $('#day').val();
	selectedMonth = $('#month').val();
	selectedYear = $('#year').val();

	selectedDay = Math.floor(selectedDay);
	selectedMonth = Math.floor(selectedMonth);
	selectedYear = Math.floor(selectedYear);
}



function checkLeapYear(year) {

	if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
		isLeap = true;
	}

	else{
		isLeap = false;
	}
}



function fieldVerification() {

	// Year field verification
	if ($('#year').val() === '') {
		$('#year-alert').text('This field is required.');
		yearField = false;
	}

	else if(selectedYear > currentYear){
		$('#year-alert').text('Must be in the past.');
		yearField = false;
	}
	else if (selectedYear < maxYear) {
		$('#year-alert').text('Must be within the last 120 years.');
		yearField = false;
	}
	else if(selectedYear < 0){
		$('#year-alert').text('Must be a valid year');
		yearField = false;
	}

	else{
		$('#year-alert').text('');
		yearField = true;
	}


	// Month field verification
	if ($('#month').val() === '') {
		$('#month-alert').text('This field is required.');
		monthField = false;
	}

	else if(selectedMonth < 1 || selectedMonth > 12){
		$('#month-alert').text('Must be a valid month.');
		monthField = false;	
	}

	else if(selectedYear === currentYear & selectedMonth > currentMonth){
		$('#month-alert').text('Must be in the past.');
		monthField = false;
	}

	else{
		$('#month-alert').text('');
		monthField = true;
	}


	// Day field verification
	if ($('#day').val() === '') {
		$('#day-alert').text('This field is required.');
		dayField = false;
	}

	else if(selectedDay < 1 || selectedDay > 31){
		$('#day-alert').text('Must be a valid day.');
		dayField = false;
	}

	else{
		$('#day-alert').text('');
		dayField = true;
	}

}



function proceedValuesVerification() {
	if (yearField === true & monthField === true & dayField === true) {
		monthVerification();
	}
	else{
		return;
	}
}


//Day verifications
function leapFebruaryVerification() {

	if (selectedDay < 1 || selectedDay > 29) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must in the past.');
		}

		else{
			$('#day-alert').text('');
			calculation();
		}
	}
}



function notLeapFebruaryVerification() {
	if (selectedDay < 1 || selectedDay > 28) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must be in the past.');
		}

		else{
			$('#day-alert').text('');
			calculation();
		}
	}
}



function dayVerificationOddMonth() {
	if (selectedDay < 1 || selectedDay > 31) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must be in the past.');
		}

		else{
			$('#day-alert').text('');
			calculation();
		}
	}
}



function dayVerificationEvenMonth() {
	if (selectedDay < 1 || selectedDay > 30) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must be in the past.');
		}

		else{
			$('#day-alert').text('');
			calculation();
		}
	}
}


//Month verification
function monthVerification() {

	if (selectedMonth === 2 & isLeap === false) {
		notLeapFebruaryVerification();
	}

	else if(selectedMonth === 2 & isLeap === true){
		leapFebruaryVerification();
	}

	else if(oddMonths.includes(selectedMonth)){
		dayVerificationOddMonth();
	}

	else{
		dayVerificationEvenMonth();
	}
}



$('.btn-desktop').click(function () {
	assignValues();
	checkLeapYear(selectedYear);
	fieldVerification();
	proceedValuesVerification();
})


$('.btn-mobile').click(function () {
	assignValues();
	checkLeapYear(selectedYear);
	fieldVerification();
	proceedValuesVerification();
})

$('input').keydown(function (event) {
	console.log(event);
	if (event.keyCode == 13) {
		event.preventDefault();
		assignValues();
		checkLeapYear(selectedYear);
		fieldVerification();
		proceedValuesVerification();
	}
});
