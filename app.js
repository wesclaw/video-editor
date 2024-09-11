// add a change event to the input file tag and remove 'choose file screen'

const video_preview = document.querySelector('.video_preview')
const fileInput = document.querySelector('.fileInput')
const add_file_screen = document.querySelector('.add_file_screen')

function chooseFile(e) {
  const videoUrl = window.URL.createObjectURL(fileInput.files[0])
  
  video_preview.src = videoUrl

  add_file_screen.remove()
}

fileInput.addEventListener('change', chooseFile)

