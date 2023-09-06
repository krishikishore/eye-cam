// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

// Adjust the zoom factor (2x)
const zoomFactor = 2;

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    // Capture the current frame from the camera view
    const originalWidth = cameraView.videoWidth;
    const originalHeight = cameraView.videoHeight;

    // Adjust the cameraSensor and cameraOutput dimensions for zoom
    cameraSensor.width = originalWidth / zoomFactor;
    cameraSensor.height = originalHeight / zoomFactor;
    cameraOutput.width = originalWidth / zoomFactor;
    cameraOutput.height = originalHeight / zoomFactor;

    // Draw the zoomed frame onto the canvas
    const context = cameraSensor.getContext("2d");
    context.drawImage(cameraView, 0, 0, originalWidth, originalHeight, 0, 0, cameraSensor.width, cameraSensor.height);

    // Set the captured frame as the source for cameraOutput
    cameraOutput.src = cameraSensor.toDataURL("image/webp");

    // Store the captured image data in local storage
    const capturedImageData = cameraSensor.toDataURL("image/webp");
    localStorage.setItem("capturedImage", capturedImageData);

    // Add a class to indicate that an image has been taken
    cameraOutput.classList.add("taken");

    // Navigate to a new screen (display.html)
    window.location.href = "display.html";
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
