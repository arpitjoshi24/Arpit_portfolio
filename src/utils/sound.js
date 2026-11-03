import { Howl, Howler } from "howler";

let flip = null;
let music = null;

const MUSIC_VOLUME = 0.25; // 0 to 1

// created lazily so nothing touches the browser during server rendering
function init() {
  if (flip) return;
  flip = new Howl({ src: ["/sounds/pageflip.mp3"], volume: 0.7 });
  music = new Howl({
    src: ["/sounds/bgmusic.mp3"],
    loop: true,
    volume: 0,
    html5: true, // streams long files instead of loading them all at once
  });
}

export function playFlip() {
  init();
  flip.play();
}

// safe to call many times: does nothing if the music is already playing
export function startMusic() {
  init();
  if (music.playing()) return;
  music.volume(0);
  music.play();
  music.fade(0, MUSIC_VOLUME, 2500);
}

export function setMuted(muted) {
  Howler.mute(muted);
}