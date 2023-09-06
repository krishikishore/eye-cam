// Retrieve the captured image data from localStorage or global variable
const capturedImageData = localStorage.getItem("capturedImage");

// Set the captured image data as the source for the displayed image
const displayedImage = document.getElementById("displayedImage");
displayedImage.src = capturedImageData;

// Add click event handlers for the buttons
const looksGoodButton = document.getElementById("looksGoodButton");
const takeAgainButton = document.getElementById("takeAgainButton");

// Handle "Looks Good" button click
looksGoodButton.addEventListener("click", function() {
    // Navigate to another page where the image is displayed again
    window.location.href = "review.html";
});

// Handle "Take Again" button click
takeAgainButton.addEventListener("click", function() {
    // Clear the captured image data and navigate back to the initial image capture page
    localStorage.removeItem("capturedImage");
    window.location.href = "index.html"; // Replace with your actual capture page
});
