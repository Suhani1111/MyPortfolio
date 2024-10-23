const massInput = document.getElementById('mass');
const lengthInput = document.getElementById('length');
const frictionInput = document.getElementById('friction');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const timeDisplay = document.getElementById('time');
const oscillationsDisplay = document.getElementById('oscillations');
const pendulum = document.getElementById('pendulum');
const string = document.getElementById('string');

let oscillationCount = 0;
let timeElapsed = 0;
let animationFrameId;
let isRunning = false;
let startTime;
let angle = 0; // Current angle
let velocity = 0; // Current velocity

// Update displayed values for sliders
massInput.oninput = () => document.getElementById('massValue').textContent = massInput.value;
lengthInput.oninput = () => {
    const length = parseFloat(lengthInput.value);
    document.getElementById('lengthValue').textContent = mass;massInput.oninput = () => {
        const mass = massInput.value;
        document.getElementById('massValue').textContent = mass;
        // Update bob size based on mass
        pendulum.style.width = `${mass * 2}px`; // Width based on mass
        pendulum.style.height = `${mass * 2}px`; // Height based on mass
             pendulum.style.borderRadius = '50%'; } // Make it circular 
    // Adjust the string height visually
    string.style.height = `${length * 30}px`; // Scale for visual representation
    string.style.top = `${300 - length * 30}px`;
    // Update pendulum position
    updatePendulumPosition(length);
};
frictionInput.oninput = () => document.getElementById('frictionValue').textContent = frictionInput.value;

// Update pendulum's position based on the current angle and length
function updatePendulumPosition(length) {
    const pendulumX = 50 + (length * 3 * Math.sin(angle)); // Adjusting for visual representation
    pendulum.style.left = `${pendulumX}%`;
}

// Start the pendulum oscillation
function startPendulum() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now();
    oscillationCount = 0;
    timeElapsed = 0;

    angle = Math.PI / 4; // Start at 45 degrees
    velocity = 0; // Reset velocity

    function update() {
        const length = parseFloat(lengthInput.value);
        const friction = parseFloat(frictionInput.value);

        // Simple harmonic motion equations
        const gravity = 9.81; // Acceleration due to gravity
        const acceleration = (-gravity / length) * Math.sin(angle) - (friction * velocity);

        velocity += acceleration; // Update velocity
        angle += velocity; // Update angle

        // Dampen the movement based on friction
        velocity *= (1 - friction);

        // Rotate and update position of the pendulum
        pendulum.style.transform = `translate(-50%, 0) rotate(${angle}rad)`;
        updatePendulumPosition(length);

        // Check for stopping condition
        if (Math.abs(velocity) < 0.01) {
            isRunning = false;
            cancelAnimationFrame(animationFrameId);
            return;
        }

        // Update the time and oscillation count
        timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        timeDisplay.textContent = timeElapsed;

        // Count oscillations: left to right completion
        if (angle < 0 && velocity > 0) {
            oscillationCount++;
            oscillationsDisplay.textContent = oscillationCount;
        }

        animationFrameId = requestAnimationFrame(update);
    }

    update();
}

// Stop the pendulum oscillation
function stopPendulum() {
    isRunning = false;
    cancelAnimationFrame(animationFrameId);
}

startButton.onclick = startPendulum;
stopButton.onclick = stopPendulum;

// Initialize the string length visually on load
lengthInput.oninput();




 



