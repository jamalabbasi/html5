	var first = document.getElementById('number1');
	var second = document.getElementById('number2');

	var result = document.getElementById("result");

	if (window.Worker) { // Check if Browser supports the Worker api.
		// Requires script name as input
		try{
			var myWorker = new Worker("worker.js");
		}
		catch(err){
			console.log(err.message);
		}
		// onkeyup could be used instead of onchange if you wanted to update the answer every time
		// an entered value is changed, and you don't want to have to unfocus the field to update its .value

		first.onchange = function() {
			first = document.getElementById('number1').value;
			second = document.getElementById('number2').value;
			myWorker.postMessage([first,second]);
			console.log('Message posted to worker');			
		};

		second.onchange = function() {
			first = document.getElementById('number1').value;
			second = document.getElementById('number2').value;			myWorker.postMessage([first.value,second.value]);
			myWorker.postMessage([first,second]);
			console.log('Message posted to worker');
			
		};

		myWorker.onmessage = function(e) {
			result.textContent = e.data;
			console.log('Message received from worker');
		};
	}