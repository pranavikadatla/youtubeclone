// API Key for YouTube Data API
const apiKey = 'AIzaSyATakLlBrycXmEzdd86Pm2ZAzvdGbqPaRE';

document.addEventListener('DOMContentLoaded', () => {
    const videoId = localStorage.getItem('selectedVideoId');
    loadVideoDetails(videoId);
    loadVideoComments(videoId);
});

// Function to load video details
async function loadVideoDetails(videoId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`);
    const data = await response.json();
    const videoDetails = data.items[0];

    // Update video player
    const videoFrame = document.getElementById('video-frame');
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;

    // Update video stats
    document.getElementById('like-count').innerText = `Likes: ${videoDetails.statistics.likeCount}`;
    document.getElementById('dislike-count').innerText = `Dislikes: ${videoDetails.statistics.dislikeCount}`;
    document.getElementById('subscribers').innerText = `Subscribers: ${videoDetails.statistics.subscriberCount}`;
    document.getElementById('channel-name').innerText = `Channel: ${videoDetails.snippet.channelTitle}`;
}

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`);
        const data = await response.json();
    

        if (data.items) {
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = ''; // Clear existing comments

            data.items.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.innerHTML = `
                    <p>${comment.snippet.topLevelComment.snippet.authorDisplayName}: ${comment.snippet.topLevelComment.snippet.textOriginal}</p>
                    <button onclick="loadReplyComments('${comment.id}')">Show Replies</button>
                    <div class="reply-container" id="reply-container-${comment.id}"></div>
                `;
                commentsContainer.appendChild(commentItem);
            });
        } else {
            console.error('No comments found.');
        }
    } catch (error) {
        console.error('Error loading comments:', error);
    }



// Function to load reply comments
async function loadReplyComments(parentCommentId) {
    
    const response = await fetch(`https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${parentCommentId}&key=${apiKey}`);
    const data = await response.json();
    const replyContainer = document.getElementById(`reply-container-${parentCommentId}`);

    data.items.forEach(reply => {
    
        const replyItem = document.createElement('div');
        replyItem.classList.add('reply-item');
        replyItem.innerHTML = `
            <p>${reply.snippet.authorDisplayName}: ${reply.snippet.textOriginal}</p>
        `;
        replyContainer.appendChild(replyItem);
    });
}
