console.log("YT Shorts Autoscroll extension is active!");

setInterval(() => {
    if (!window.location.pathname.includes('/shorts/')) return;

    const videos = document.querySelectorAll('video');
    let activeVideo = null;

    videos.forEach(video => {
        if (!video.paused && video.readyState > 2) {
            activeVideo = video;
        }
    });

    if (activeVideo) {
        if (activeVideo.loop) {
            console.log("Loop property disabled.");
            activeVideo.loop = false;
        }

        if (!activeVideo.dataset.autoscrollAttached) {
            console.log("Added 'ended' listener to the video.");
            
            activeVideo.addEventListener('ended', () => {
                console.log("Video ended. Triggering scroll...");
                
                const nextButton = document.querySelector('#navigation-button-down button') || 
                                   document.querySelector('#navigation-button-down ytd-button-renderer');
                
                if (nextButton) {
                    nextButton.click();
                } else {
                    console.error("Error: Next button not found.");
                }
            });
            
            activeVideo.dataset.autoscrollAttached = "true";
        }
    }
}, 1000);