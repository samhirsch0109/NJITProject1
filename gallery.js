let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially
  $('.moreIndicator').on('click', function () {
    $('.moreIndicator').toggleClass('rot270, rot90')
    $('.details').slideToggle()
  })
  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', showNextPhoto)
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', showPrevPhoto)
  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images
      console.log(mImages)

      swapPhoto()
      startTimer()

    },
    error: function () {
      alert: ('Failed to load')
    }
  })
}
// On success, parse the JSON and push each image object into mImages array
// After JSON is loaded, call swapPhoto() to display the first image


// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  // Access mImages[mCurrentIndex] to update the image source and details
  const image = mImages[mCurrentIndex];
  // Update the #photo element's src attribute with the current image's path
  $('#photo').attr('src', mImages[mCurrentIndex].imgPath);
  $('.imgName').text(`Name: ${mImages[mCurrentIndex].imgName}`);
  $('.description').text(`Description: ${mImages[mCurrentIndex].description}`);
  $('.location').text(`Location: ${mImages[mCurrentIndex].location}`);

  // Update the .location, .description, and .date elements with the current image's details
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  mCurrentIndex++
  // Increment mCurrentIndex and call swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
  if (mCurrentIndex === mImages.length) {
    mCurrentIndex = 0;
  }
  swapPhoto()
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  // Decrement mCurrentIndex and call swapPhoto()
  mCurrentIndex--
  // Ensure it loops to the end if mCurrentIndex is less than 0
  if (mCurrentIndex < 0) {
    mCurrentIndex = 9;
  }
  swapPhoto()
}

// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  setInterval(showNextPhoto, mWaitTime);
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
