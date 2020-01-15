// SpeechRecognition is a global variable that lives in the browser
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// SpeechRecognition() constructor creates a new SpeechRecognition object instance
const recognition = new SpeechRecognition();
recognition.interimResults = true; // interim results are results that are not yet final

// create a p and append it to div.words
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

// fired when the speech recognition service returns a result
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results) // make an array
        .map(result => result[0]) // give us the first result
        .map(result => result.transcript) // give us the transcript property
        .join(''); // join all strings

        p.textContent = transcript; // types it in the DOM
        if(e.results[0].isFinal) { //  boolean that states whether this result is final
            p = document.createElement('p');
            words.appendChild(p);
        }
        // console.log(transcript);
});

// add another listener to fire when you continue speaking
recognition.addEventListener('end', recognition.start);


// fired when the speech recognition service has begun listening to incoming audio
// with intent to recognize grammars associated with the current SpeechRecognition
recognition.start();