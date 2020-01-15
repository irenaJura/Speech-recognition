// SpeechRecognition is a global variable that lives in the browser
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// SpeechRecognition() constructor creates a new SpeechRecognition object instance
const recognition = new SpeechRecognition();
recognition.interimResults = true; // interim results are results that are not yet final

// instantiate speech synthesis
const synth = window.speechSynthesis;

// create function speak to call when we want an answer
// SpeechSynthesisUtterance represents a speech request
const speak = (action) => {
    utterThis = new SpeechSynthesisUtterance(action());
    synth.speak(utterThis);
  };

const getTime = () => {
    const time = new Date(Date.now());
    return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
  };

const getDate = () => {
    const time = new Date(Date.now());
    return `today is ${time.toDateString()}`;
  };

  const getTheWeather = (speech) => {
        let city;
        if(speech.split(' ')[5] && speech.split(' ')[6]) {
            city = speech.split(' ')[5] + ' ' + speech.split(' ')[6];
        } else {
            city = speech.split(' ')[5];
        }
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`) 
    .then(function(response){
      return response.json();
    })
    .then(function(weather){
      if (weather.cod === '404') {
        utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
        synth.speak(utterThis);
        return;
      }
      utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
      synth.speak(utterThis);
    });
  };

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
            if (transcript.includes('what is the time')) {
                speak(getTime);
            }; 
            if (transcript.includes('what is today\'s date')) {
                speak(getDate);
            }; 
            if (transcript.includes('what is the weather in')) {
                getTheWeather(transcript);
            };   
        }
        // console.log(transcript);      
});

// add another listener to fire when you continue speaking
recognition.addEventListener('end', recognition.start);


// fired when the speech recognition service has begun listening to incoming audio
// with intent to recognize grammars associated with the current SpeechRecognition
recognition.start();