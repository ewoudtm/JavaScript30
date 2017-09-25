/* Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const goFullscreen = player.querySelector('.gofullscreen');


/* Functions */
togglePlay = () => video[video.paused ? 'play' : 'pause']();


function toggleButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skipTime() {
  const timeToSkip = parseFloat(this.dataset.skip)
  video.currentTime += timeToSkip
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration)*100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e)

}

function handleGoFullscreen() {
  console.log("fullscreen")
  console.log(player.style.maxWidth)
  player.FullScreen;
  //player.style.maxWidth = 'none'
}


/* Eventlisteners */
video.addEventListener('click', togglePlay)
video.addEventListener('play', toggleButton)
video.addEventListener('pause', toggleButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipTime))

ranges.forEach(range => range.addEventListener('change', rangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

goFullscreen.addEventListener('click', handleGoFullscreen)
