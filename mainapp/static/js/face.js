// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel

const positive = window.frames[0].document.getElementById("face_positive")
const neutral = window.frames[0].document.getElementById("face_neutral")

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function initface() {
	const URL = "https://teachablemachine.withgoogle.com/models/_CICFgMTO/";
	// const URL = "https://teachablemachine.withgoogle.com/models/vLUxJBq1N/";
	const modelURL = URL + "model.json";
	const metadataURL = URL + "metadata.json";

	// load the model and metadata
	// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
	// or files from your local hard drive
	// Note: the pose library adds "tmImage" object to your window (window.tmImage)
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = 2;

	// Convenience function to setup a webcam
	const flip = true; // whether to flip the webcam
	webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
	await webcam.setup(); // request access to the webcam
	await webcam.play();
	loop();

	// append elements to the DOM
	labelContainer = window.frames[0].document.getElementById("label-container");
	labelContainer.appendChild(document.createElement("div"));
	labelContainer.appendChild(document.createElement("div"));
}

async function loop() {
	webcam.update(); // update the webcam frame
	await predict();
}

// run the webcam image through the image model
async function predict() {
	// predict can take in an image, video or canvas html element
	const prediction = await model.predict(webcam.canvas);
	for (let i = 0; i < maxPredictions; i++) {
		const classPrediction =
			prediction[i].className + ": " + prediction[i].probability.toFixed(2);
		labelContainer.childNodes[i].innerHTML = classPrediction;
	}
	if (prediction[0].probability > prediction[1].probability)
		positive.innerText = Number(positive.innerText) + 1;
	else{
		neutral.innerText = Number(neutral.innerText) + 1;
	}
}

