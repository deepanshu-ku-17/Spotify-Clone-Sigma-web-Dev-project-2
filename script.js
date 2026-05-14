const allSong=["song/song1.mp3",
    "song/song2.mp3",
    "song/song3.mp3",
    "song/song4.mp3",
    "song/song5.mp3",
    "song/song6.mp3",
    "song/song7.mp3",
    "song/song8.mp3",
    "song/song9.mp3",
    "song/song10.mp3",
]

const playBtn = document.querySelectorAll(".playBtn")
const audio =new Audio()
let currentIndex=0

playBtn.forEach((btn, index) => {
    btn.onclick = () => {
        let realIndex = index % allSong.length   // repeat logic
        currentIndex= realIndex
        audio.src = allSong[realIndex]           // song set
        audio.play()                             // play
        let playBox = document.querySelector(".playBox")
        playBox.style.display = "flex"
    }
})

const playPauseBtn = document.querySelector(".playStop")
playPauseBtn.onclick = () => {
    if(audio.paused){
        audio.play()
        playPauseBtn.innerText = "⏸"
    } else {
        audio.pause()
        playPauseBtn.innerText = "▶"
    }
}

let previous= document.querySelector(".previous")

previous.onclick=()=>{
    currentIndex--
    if (currentIndex < 0) {
        currentIndex = allSong.length - 1
    }

    audio.src = allSong[currentIndex]
    audio.play()
}

let next = document.querySelector(".next")
next.onclick=()=>{
    currentIndex++
    if(currentIndex>= allSong.length){
        currentIndex = 0
    }
    audio.src=allSong[currentIndex]
    audio.play()
}

const progress = document.querySelector(".progress")
const songBar = document.querySelector(".songBar")

setInterval(() => {
    if (audio.duration) {
        let percent = (audio.currentTime / audio.duration) * 100
        progress.style.width = percent + "%"
    }
}, 500)

songBar.onclick = (e) => {
    let width = songBar.clientWidth
    let clickX = e.offsetX

    let percent = clickX / width
    audio.currentTime = percent * audio.duration
}

const volumeSlider = document.querySelector(".volumnRoker")

volumeSlider.oninput = () => {
    audio.volume = volumeSlider.value / 100
}

const muteBtn = document.querySelector(".muteBtn")

muteBtn.onclick = () => {
    if(audio.volume > 0){
        audio.volume = 0
        muteBtn.innerText = "🔇"
        volumeSlider.value = 0
    } else {
        audio.volume = 1
        muteBtn.innerText = "🔊"
        volumeSlider.value = 100
    }
}