// add a change event to the input file tag and remove 'choose file screen'

const video_preview = document.querySelector('.video_preview')
const fileInput = document.querySelector('.fileInput')
const add_file_screen = document.querySelector('.add_file_screen')

function chooseFile(e) {
  const videoUrl = window.URL.createObjectURL(fileInput.files[0])
  
  video_preview.src = videoUrl

  add_file_screen.remove()

  createVideoBlock(videoUrl);
  createTimeline()

}

fileInput.addEventListener('change', chooseFile)


/////use interact js to create the grid for the video edit timeline

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
    grid: { x: 5, y: 5 },
    range: Infinity,
    relativePoints: [{ x: 0, y: 0 }]
  });

  function dragMoveListener(event) {
  var target = event.target;

  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  }

  function snapBackToContainer(event) {
  var target = event.target;
  var container = document.getElementById('grid-timeline');
  var containerRect = container.getBoundingClientRect();
  var targetRect = target.getBoundingClientRect();

  var x = parseFloat(target.getAttribute('data-x')) || 0;
  var y = parseFloat(target.getAttribute('data-y')) || 0;

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

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  }

}

////create the video block in the bottom div with the video url as the bg image

const grid_timeline = document.getElementById('grid-timeline')

function createVideoBlock(videoUrl) {
  const videoBlock = document.createElement('div');
  videoBlock.classList.add('video_block');
  const videoElement = document.createElement('video');
  videoElement.src = videoUrl;
  videoElement.muted = true
  videoElement.playsInline = true;
  videoElement.currentTime = 5; 

  videoElement.addEventListener('loadeddata', function () {
  
    const canvas = document.createElement('canvas');
    canvas.width = 150; 
    canvas.height = 100; 
    const ctx = canvas.getContext('2d');

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const thumbnailUrl = canvas.toDataURL();
    videoBlock.style.backgroundImage = `url(${thumbnailUrl})`;
    videoBlock.style.backgroundSize = 'cover';
    videoBlock.style.backgroundPosition = 'center';

    // 
    const videoDuration = videoElement.duration; // This will give you the duration in seconds

  // Define the pixel width per second (e.g., 10px per second)
    const pixelPerSecond = 50;

    // Set the width of the video block based on the video's duration
    videoBlock.style.width = `${videoDuration * pixelPerSecond}px`;

    // 

    const grid_timeline = document.getElementById('grid-timeline');
    grid_timeline.appendChild(videoBlock);

    initializeInteract(videoBlock);
  });

  
  videoElement.load();
}

// 
const gridTimeline = document.getElementById('grid-timeline');

// Create 30 time blocks (1s to 30s)

function createTimeline(){
  for (let i = 1; i <= 30; i++) {
    const timeBlock = document.createElement('div');
    timeBlock.classList.add('time-block');
    timeBlock.setAttribute('data-time', i); // Set time as data attribute
    
    // Add the block to the timeline
    gridTimeline.appendChild(timeBlock);
  
    // Add an event listener to seek video when a block is clicked
    timeBlock.addEventListener('click', () => {
      const videoPreview = document.querySelector('.video_preview');
      videoPreview.currentTime = i; // Set the video to play from the clicked second
    });
  }

}
  










