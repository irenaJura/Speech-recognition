### Speech recognition

This application works as a simple note taking app. It listens to you speak and tries to replicate it in a text.

I started by creating a new instance of SpeecRecognition to a variable and made interim results to be true (log the unfinished sentances).

Then I set up the logic to create and append p elements for the incoming text.

Next I added an event listener for results that gives us the result transcript in a string, and if the result is final (you stop speaking), it creates a new paragraph.

Finally, I had to add another event listener (end), which will start the speech recognition again and output the text.