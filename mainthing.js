// Create the bar element
const topBar = document.createElement('div');

// Style the bar
topBar.style.position = 'fixed';
topBar.style.top = '0';
topBar.style.left = '0';
topBar.style.width = '100%';
topBar.style.height = '40px'; // small bar height
topBar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black
topBar.style.zIndex = '9999'; // stay on top
topBar.style.backdropFilter = 'blur(6px)'; // optional blur effect
topBar.style.display = 'flex';
topBar.style.alignItems = 'center';
topBar.style.justifyContent = 'center';
topBar.style.color = '#fff';
topBar.style.fontFamily = 'Inter, sans-serif';
topBar.style.fontWeight = '600';
topBar.style.fontSize = '14px';
topBar.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

// Add text to the bar
topBar.textContent = 'This is a small top bar';

// Append to the body
document.body.appendChild(topBar);
