import { parseSecondsInMinutes } from "./utils/parseSeconds.js";
import { updatedurationSliderBackground } from "./utils/updateSlider.js";

const songs = await player.songs();

// temporal variables
let currentSongIndex = 0;
let currentSong = songs[currentSongIndex];
let audioUrl = await player.getSong(currentSong);
let songIconURL = "../../../../Imágenes/wallpaper.jpg";
// elements

// sliders
const $volumeSlider = document.getElementById("volume");
const $durationSlider = document.getElementById("duration");

// audio element 
/**
 * @type {HTMLAudioElement}
 */
const $audio = document.querySelector('#song');


// buttons
const $playButton = document.querySelector(".play");
const $songIcon = document.querySelector('.player > img');
const $forward = document.querySelector('.forward');
const $backward = document.querySelector('.backward');
const $next = document.querySelector('.next');
const $prev = document.querySelector('.prev');
// counters
const $current = document.querySelector('.current');
const $total = document.querySelector('.total');

// song info
const $name = document.getElementById('name');
/**
 * @type {HTMLSelectElement}
 */
const $playbackRate = document.getElementById('rate');

// state
const pauseSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 6H6V18H10.5V6ZM7.5 16.5V7.5H9V16.5H7.5ZM18 6H13.5V18H18V6ZM15 16.5V7.5H16.5V16.5H15Z" fill="#ffffff"></path> </g></svg>`;

const playSVG = `<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play</title> <path d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"></path> </g></svg>`;

// config
$audio.src = audioUrl;
$songIcon.src = songIconURL;
$name.textContent = currentSong;
let isPlaying = false;

// events

$audio.addEventListener('loadeddata', _ => {
  const TimeInMinutes = parseSecondsInMinutes($audio.duration);
  const minutes = TimeInMinutes.minutes < 10 ? `0${TimeInMinutes.minutes}` : `${TimeInMinutes.minutes}`;
  const seconds = TimeInMinutes.seconds < 10 ? `0${TimeInMinutes.seconds}` : `${TimeInMinutes.seconds}`;
  $total.textContent = `${minutes}:${seconds}`;
});

$audio.addEventListener('timeupdate', _ => {
  setTimeout(() => {
    $durationSlider.value = Math.floor(($audio.currentTime / $audio.duration) * 100);
    updatedurationSliderBackground($durationSlider);
  }, 2500);

  const TimeInMinutes = parseSecondsInMinutes($audio.currentTime);
  const minutes = TimeInMinutes.minutes < 10 ? `0${TimeInMinutes.minutes}` : `${TimeInMinutes.minutes}`;
  const seconds = TimeInMinutes.seconds < 10 ? `0${TimeInMinutes.seconds}` : `${TimeInMinutes.seconds}`;
  $current.textContent = `${minutes}:${seconds}`;
});

$durationSlider.addEventListener("input", _ => {
  updatedurationSliderBackground($durationSlider);
  $audio.currentTime = ($audio.duration / 100) * $durationSlider.value;
});

$volumeSlider.addEventListener('input', _ => {
  updatedurationSliderBackground($volumeSlider);
  $audio.volume = $volumeSlider.value / 100;
});

$playButton.addEventListener('click', _ => {
  $playButton.innerHTML = ``;
  $playButton.innerHTML = (isPlaying ? playSVG : pauseSVG);

  $songIcon.classList.toggle('on_play')

  if (isPlaying) {
    $audio.pause();
  } else {
    $audio.play();
  }
  isPlaying = !isPlaying;
});

$forward.addEventListener('click', _ => {
  $audio.currentTime += 15; // forward 15 seconds
});

$backward.addEventListener('click', _ => {
  $audio.currentTime -= 15; // backward 15 seconds
});

$prev.addEventListener('click', async _ => {
  if ((currentSongIndex - 1) < 0) {
    return;
  }

  currentSongIndex--;
  currentSong = songs[currentSongIndex];
  audioUrl = await player.getSong(currentSong);
  $audio.src = audioUrl;
  $name.textContent = currentSong.split('.')[0];
});

$next.addEventListener('click', async _ => {
  if ((currentSongIndex + 1) > (songs.length - 1)) {
    return;
  }

  currentSongIndex++;
  currentSong = songs[currentSongIndex];
  audioUrl = await player.getSong(currentSong);
  $audio.src = audioUrl;
  $name.textContent = currentSong.split('.')[0];
});

$playbackRate.addEventListener('input', _ => {
  $audio.playbackRate = Number($playbackRate.value);
});

updatedurationSliderBackground($durationSlider);
updatedurationSliderBackground($volumeSlider);
$playButton.innerHTML = (isPlaying ? playSVG : pauseSVG);