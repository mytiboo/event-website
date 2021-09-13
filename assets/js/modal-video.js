

let player;
let done = false;
const modalElement = document.getElementById('dynamicVideoModal')

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '1DAJdPnL5pc',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
        }
    })
}

function onPlayerReady(event) {
    event.target.playVideo() // autostart
}

function resetVideo() {
    player.stopVideo();
    player.seekTo(0, false);
}

function loadYouTubeVideo() {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}

modalElement.addEventListener('show.bs.modal', () => {
    loadYouTubeVideo();
});

modalElement.addEventListener('hide.bs.modal', () => {
    resetVideo();
});
