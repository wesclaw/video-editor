// // add a change event to the input file tag and remove 'choose file screen'

// const video_preview = document.querySelector('.video_preview')
// const fileInput = document.querySelector('.fileInput')
// const add_file_screen = document.querySelector('.add_file_screen')

// function chooseFile(e) {
//   const videoUrl = window.URL.createObjectURL(fileInput.files[0])
  
//   video_preview.src = videoUrl

//   add_file_screen.remove()

//   createVideoBlock(videoUrl);
//   createTimeline()

// }

// fileInput.addEventListener('change', chooseFile)


// /////use interact js to create the grid for the video edit timeline

// function initializeInteract(element) {
  
//   const pixelsPerSecond = 50; 

//   interact(element)
//     .draggable({
//       inertia: true,
//       restrict: {
//         restriction: "#grid-timeline",
//         endOnly: true,
//         elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
//       },
//       autoScroll: true,
//       onmove: dragMoveListener,
//       onend: snapBackToContainer
//     })
//     .snap({
//       mode: 'grid',
//       grid: { x: 10, y: 10 },
//       range: Infinity,
//       relativePoints: [{ x: 0, y: 0 }]
//     });

//   function dragMoveListener(event) {
//     const target = event.target;

//     const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
//     const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//     target.style.transform = `translate(${x}px, ${y}px)`;

//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);

//     updateStartTime(target, x);
//   }

//   function snapBackToContainer(event) {
//     const target = event.target;
//     const container = document.getElementById('grid-timeline');
//     const containerRect = container.getBoundingClientRect();
//     const targetRect = target.getBoundingClientRect();

//     let x = parseFloat(target.getAttribute('data-x')) || 0;
//     let y = parseFloat(target.getAttribute('data-y')) || 0;

//     if (targetRect.left < containerRect.left) {
//       x += containerRect.left - targetRect.left;
//     }
//     if (targetRect.top < containerRect.top) {
//       y += containerRect.top - targetRect.top;
//     }
//     if (targetRect.right > containerRect.right) {
//       x -= targetRect.right - containerRect.right;
//     }
//     if (targetRect.bottom > containerRect.bottom) {
//       y -= targetRect.bottom - containerRect.bottom;
//     }

//     target.style.transform = `translate(${x}px, ${y}px)`;
//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);

//     updateStartTime(target, x);
//   }

//   function updateStartTime(element, x) {
//     const startTime = Math.floor(x / pixelsPerSecond);
//     element.setAttribute('data-start-time', startTime);
//     console.log(`Block's start time updated to ${startTime} seconds.`);
//   }
// }

// // ////create the video block in the bottom div with the video url as the bg image
// const grid_timeline = document.getElementById('grid-timeline');

// function createVideoBlock(videoUrl) {
//   const videoBlock = document.createElement('div');
//   videoBlock.classList.add('video_block');
//   videoBlock.setAttribute('data-start-time', 0); 
//   const videoElement = document.createElement('video');
//   videoElement.src = videoUrl;
//   videoElement.muted = true;
//   videoElement.playsInline = true;

//   console.log(videoBlock.getAttribute('data-start-time'))

//   videoElement.addEventListener('loadeddata', function () {
//     // Set the video to an appropriate frame (e.g., 1 second in)
//     videoElement.currentTime = 0;
//   });

//   videoElement.addEventListener('seeked', function () {
//     const canvas = document.createElement('canvas');
//     canvas.width = 150; 
//     canvas.height = 100; 
//     const ctx = canvas.getContext('2d');

//     // Draw the current frame of the video to the canvas
//     ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

//     // Get the thumbnail URL from the canvas
//     const thumbnailUrl = canvas.toDataURL();

//     // Set the background image of the video block
//     videoBlock.style.backgroundImage = `url(${thumbnailUrl})`;
//     videoBlock.style.backgroundSize = 'cover';
//     videoBlock.style.backgroundPosition = 'center';

//     // Calculate the width of the block based on video duration
//     const videoDuration = videoElement.duration;
//     const pixelPerSecond = 50;
//     videoBlock.style.width = `${Math.ceil(videoDuration) * pixelPerSecond}px`;

//     // Add the video block to the grid timeline
//     grid_timeline.appendChild(videoBlock);

//     // Initialize interact.js or other dragging functionality
//     initializeInteract(videoBlock);
//   });
//   videoElement.load();
// }

// const gridTimeline = document.getElementById('grid-timeline'); 


// function createTimeline() {
  
//   const windowWidth = window.innerWidth;
//   const minBlockWidth = 50;
//   const blocksCount = Math.max(31, Math.floor(windowWidth / minBlockWidth)); 

//   for (let i = 0; i < blocksCount; i++) {
//     const timeBlock = document.createElement('div');
//     timeBlock.classList.add('time-block');
//     timeBlock.setAttribute('data-time', i);   
//     gridTimeline.appendChild(timeBlock);
//     // timeBlock.addEventListener('click', () => {
//     //   const videoPreview = document.querySelector('.video_preview');
//     //   videoPreview.currentTime = i; 
//     // });
//   }
// }
































  
// function createTimeline() {
  
//   const windowWidth = window.innerWidth;
//   const minBlockWidth = 50;
//   const blocksCount = Math.max(31, Math.floor(windowWidth / minBlockWidth)); 

//   for (let i = 0; i < blocksCount; i++) {
//     const timeBlock = document.createElement('div');
//     timeBlock.classList.add('time-block');
//     timeBlock.setAttribute('data-time', i);   
//     gridTimeline.appendChild(timeBlock);
//     timeBlock.addEventListener('click', () => {
//       const videoPreview = document.querySelector('.video_preview');
//       videoPreview.currentTime = i; 
//     });
//   }
// }

// // ////move the scrubber
// const playhead = document.getElementById('playhead');
// const videoPreview = document.querySelector('.video_preview');
// const pixelPerSecond = 50;  // Each second on the timeline equals 50px

// function updatePlayhead() {
//   const videoDuration = videoPreview.duration;
//   const currentTime = videoPreview.currentTime;

//   // Calculate the playhead's position based on the current time
//   const playheadPosition = currentTime * pixelPerSecond;

//   // Move the playhead
//   playhead.style.left = `${playheadPosition}px`;

//   // Continue updating if the video is playing
//   if (!videoPreview.paused && !videoPreview.ended) {
//     requestAnimationFrame(updatePlayhead);
//   }
// }

// // When the video starts playing, start updating the playhead
// videoPreview.addEventListener('play', () => {
//   requestAnimationFrame(updatePlayhead);
// });

// // Reset the playhead to the start when the video ends
// videoPreview.addEventListener('ended', () => {
//   playhead.style.left = '0px';
// });

// gridTimeline.addEventListener('click', (event) => {
//   const timelineRect = gridTimeline.getBoundingClientRect();
  
//   // Get the click position relative to the grid-timeline
//   const clickPosition = event.clientX - timelineRect.left;
  
//   // Calculate the corresponding time in the video
//   const clickedTime = clickPosition / pixelPerSecond;

//   // Ensure the time is within the video duration
//   if (clickedTime <= videoPreview.duration) {
//     videoPreview.currentTime = clickedTime;
//     updatePlayhead();  // Update playhead to the new position
//   }
// });

///// add a play btn to the bottom of the grid





































const video_preview = document.querySelector('.video_preview')
const file_input = document.getElementById('file_input')
const grid_timeline = document.getElementById('grid-timeline') 

let videoFilesArray = []

function getFileFromUser(){
  const selectedFile = file_input.files[0]
  const videoURL = URL.createObjectURL(selectedFile)
  const video_el = document.createElement('video')
  video_el.src = videoURL ///add a full width bg image here instead of the videoURL

  video_el.addEventListener('loadedmetadata', (e)=>{
    const videoDuration = Math.round(video_el.duration)
    video_el.style.width = `${videoDuration * 30}px`;
      videoFilesArray.push({
        duration: video_el.duration,
      })
      console.log(videoFilesArray)
  })
  createTimeline()
  createVideoBlob(video_el)
}

function createVideoBlob(video_el){
  const add_file_screen = document.querySelector('.add_file_screen')
  video_el.classList.add('video_block')
  grid_timeline.append(video_el)
  add_file_screen.remove()
  
  initializeInteract(video_el)
}

function createTimeline(){
  const windowWidth = window.innerWidth;
  const minBlockWidth = 30
  const blocksCount = Math.max(35, Math.floor(windowWidth / minBlockWidth)); 
  for(let i=1;i<blocksCount;i++){
    const time_block = document.createElement('div')
    time_block.classList.add('time-block')
    time_block.setAttribute('data-time', i)
    grid_timeline.append(time_block)
  }
}

const scrubber = document.getElementById('scrubber')
const playBtn = document.getElementById('playBtn')

let getFrame;

let timer;
let count = 0;
let elapsedTime = 0
let startTime;

// sync the scrubber with the counter using js only. remove the css animation

function playScrubber(){  
  const grid_timeline_width = grid_timeline.offsetWidth; 
  console.log(grid_timeline_width)
  let speed = 30
  if(playBtn.textContent==='Play'){
    const animationDuration = grid_timeline_width / speed
    scrubber.classList.add('animateScrub')
    scrubber.style.animationDuration = `${animationDuration}s` 
    playBtn.textContent = 'Pause'
    scrubber.style.animationPlayState = 'running'

    startTime = Date.now() - elapsedTime;
    timer = setInterval(()=>{
      elapsedTime = Date.now() - startTime;
      count = Math.ceil(elapsedTime / 1000);
      console.log(count);
    },100)
    checkScrubberPos()
  }else{
    playBtn.textContent = 'Play'
    scrubber.style.animationPlayState = 'paused'
    cancelAnimationFrame(getFrame)
    clearInterval(timer)
  }
}

function checkScrubberPos(){
  const videos = grid_timeline.querySelectorAll('video')
  for(let video of videos){
    const vidRect = video.getBoundingClientRect()
    const scrubRect = scrubber.getBoundingClientRect()
    if(scrubRect.left < vidRect.right && scrubRect.right > vidRect.left){
      console.log('its on the video')
    }else{
      console.log('its off the video')
    }
  }
  getFrame = requestAnimationFrame(checkScrubberPos)
}

function initializeInteract(element) {
  interact(element)
    .draggable({
      inertia: true,
      restrict: {
        restriction: "#grid-timeline",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      autoScroll: true,
      onmove: dragMoveListener,
      onend: snapBackToContainer
    })
    .snap({
      mode: 'grid',
      grid: { x: 10, y: 10 },
      range: Infinity,
      relativePoints: [{ x: 0, y: 0 }]
    });

  function dragMoveListener(event) {
    const target = event.target;

    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

    function snapBackToContainer(event) {
    const target = event.target;
    const container = document.getElementById('grid-timeline');
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    let x = parseFloat(target.getAttribute('data-x')) || 0;
    let y = parseFloat(target.getAttribute('data-y')) || 0;

    if (targetRect.left < containerRect.left) {
      x += containerRect.left - targetRect.left;
    }
    if (targetRect.top < containerRect.top) {
      y += containerRect.top - targetRect.top;
    }
    if (targetRect.right > containerRect.right) {
      x -= targetRect.right - containerRect.right;
    }
    if (targetRect.bottom > containerRect.bottom) {
      y -= targetRect.bottom - containerRect.bottom;
    }

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
}



playBtn.addEventListener('click', playScrubber)
file_input.addEventListener('change', getFileFromUser)
























