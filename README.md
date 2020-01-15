### Speech recognition

This application works as a simple note taking app. It listens to you speak and tries to replicate it in a text.

I started by creating a new instance of SpeecRecognition to a variable and made interim results to be true (log the unfinished sentances).

Then I set up the logic to create and append p elements for the incoming text.

Next I added an event listener for results that gives us the result transcript in a string, and if the result is final (you stop speaking), it creates a new paragraph.

Finally, I had to add another event listener (end), which will start the speech recognition again and output the text.

As an additional task, I instantiated speechSynthesis on a window and a new SpeechSynthesisUtterance instance which will enable the speech service to reply. There are 3 possible questions that you may ask: What is the time, what is today's date, and what is the weather in [city].