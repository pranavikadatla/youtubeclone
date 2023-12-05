//const URL= "https://www.googleapis.com/yputube/v3";
// API Key for YouTube Data API
const apiKey = "AIzaSyATakLlBrycXmEzdd86Pm2ZAzvdGbqPaRE";

document.addEventListener('DOMContentLoaded', () => {
    fetchDefaultVideos();
});
async function fetchDefaultVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=${apiKey}`);
        const data = await response.json();
        renderVideoList(data.items);
    } catch (error) {
        console.error('Error fetching default videos:', error);
    }
}



// Function to fetch videos based on search query
async function searchVideos() {
    const searchInput = document.getElementById('search-input').value;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&maxResults=20&type=video&key=${apiKey}`);
    const data = await response.json();
    renderVideoList(data.items);
}

// Function to render video items
function renderVideoList(videos) {
    const videoListContainer = document.getElementById('video-list-container');
    videoListContainer.innerHTML = '';

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <p>${video.snippet.title}</p>
        `;
        videoItem.addEventListener('click', () => navigateToVideoDetails(video.id.videoId));
        videoListContainer.appendChild(videoItem);
    });
}

// Function to navigate to video details page
function navigateToVideoDetails(videoId) {
    localStorage.setItem('selectedVideoId', videoId);
    window.location.href='';
}

