const slider = document.querySelector('.roda');
let isDragging = false;
let startX = 0;
let scrollStart = 0;
let autoScrollInterval = null; 

const scrollSpeed = 0.5;
let scrollingRight = true; 


function startAutoScroll() {
    if (autoScrollInterval) return; 
    autoScrollInterval = setInterval(() => {
        if (scrollingRight) {
            slider.scrollLeft += 2; 
            if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                scrollingRight = false; 
            }
        } else {
            slider.scrollLeft -= 2; 
            if (slider.scrollLeft <= 0) {
                scrollingRight = true; 
            }
        }
    }, 20);
}


function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null; 
}


window.addEventListener('load', () => {
    startAutoScroll();
});


slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    slider.classList.add('dragging');
    startX = e.clientX;
    scrollStart = slider.scrollLeft;
    stopAutoScroll(); 
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.classList.remove('dragging');
    startAutoScroll(); 
});

slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.classList.remove('dragging');
    startAutoScroll(); 
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.clientX - startX;
    const walk = x * scrollSpeed;
    slider.scrollLeft = scrollStart - walk;
});


slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    scrollStart = slider.scrollLeft;
    stopAutoScroll(); 
});

slider.addEventListener('touchend', () => {
    isDragging = false;
    startAutoScroll(); 
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - startX;
    const walk = x * scrollSpeed;
    slider.scrollLeft = scrollStart - walk;
});


function showAppDownloadModal() {
    const myModal = new bootstrap.Modal(document.getElementById('appDownloadModal'), {
      keyboard: false
    });
    myModal.show();
  }
  
  setInterval(showAppDownloadModal, 300000); 
  
  window.onload = function() {
    setTimeout(showAppDownloadModal, 3000); 
  };



  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.modal-body img');

    images.forEach(img => {
        const zoomContainer = document.createElement('div');
        zoomContainer.classList.add('zoom-container');
        img.parentNode.replaceChild(zoomContainer, img);
        zoomContainer.appendChild(img);

        const lens = document.createElement('div');
        lens.classList.add('zoom-lens');
        zoomContainer.appendChild(lens);

        zoomContainer.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const lensSize = 100; 
            const scale = 2; 

        
            lens.style.display = 'block';

         
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

          
            const lensX = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
            const lensY = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

            lens.style.left = lensX + 'px';
            lens.style.top = lensY + 'px';

      
            lens.style.backgroundImage = `url(${img.src})`;
            lens.style.backgroundSize = `${img.width * scale}px ${img.height * scale}px`;
            lens.style.backgroundPosition = `-${lensX * scale}px -${lensY * scale}px`;
        });

        zoomContainer.addEventListener('mouseleave', () => {
            lens.style.display = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fadeIns = document.querySelectorAll('.fade-in');

    function handleScroll() {
        fadeIns.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

            if (!isVisible) {
                element.classList.remove('appear');
            } else {
                element.classList.add('appear');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
});
