
const apiKey = "AIzaSyDqCN3aoSwqQzaQ5Fu2By_2O_LGaMjO9Wc";

document.addEventListener('DOMContentLoaded', () => {
    fetchDefaultVideos();
});
async function fetchDefaultVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=27&type=video&key=${apiKey}`);
        const data = await response.json();
        renderVideoList(data.items);
    } catch (error) {
        console.error('Error fetching default videos:', error);
    }
}

async function searchVideos() {
    const searchInput = document.getElementById('search-input').value;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&maxResults=20&type=video&key=${apiKey}`);
    const data = await response.json();
    renderVideoList(data.items);
}

function renderVideoList(videos) {
    console.log("hello");
    const videoListContainer = document.getElementById('video-list-container');
    videoListContainer.innerHTML = '';
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <p> ${video.snippet.title}</p>
        `;
        videoItem.addEventListener('click', () => navigateToVideoDetails(video.id.videoId));
        videoListContainer.appendChild(videoItem);
    });
}
function navigateToVideoDetails(videoId) {
    console.log("hello");
    localStorage.setItem('selectedVideoId', videoId);
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    

}



