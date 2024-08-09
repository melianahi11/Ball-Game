document.addEventListener("DOMContentLoaded", function() {
    const ballContainer = document.getElementById('ball-container');
    const numberOfBalls = Math.floor(Math.random() * 10) + 1; /* m.r generated a floating point number between 
    0 and 1, multiplying by 10 brings this to a range between 0-10, m.f rounds down to whole number, therefore 
     + 1 to also include 10 */

    for (let i = 1; i<=numberOfBalls; i++) { /* loop that'll run numberOfBalls times, creating a new ball 
        each iteration */
        
        /* creates new div element that acts as a container for each ball */
        const ballContainerDiv = document.createElement('div');
        /* adds the CSS class to new div giving it the style */
        ballContainerDiv.classList.add('ball-container');
        /* random left/top position, within viewport (allegedly) */
        ballContainerDiv.style.left = `${Math.random() * window.innerWidth}px`;
        ballContainerDiv.style.top = `${Math.random() * window.innerHeight}px`;
        
        /* creates new div that will represent ball itself */
        const ball = document.createElement('div');
        /* adds the CSS class to new div giving it the style */
        ball.classList.add('ball');
        // ball.classList.add(`ball${i}`);
        ball.style.backgroundColor = getRandomColor(); /*calls getRandomColor function */

        /* new div that represents shadow of the ball */
        const shadow = document.createElement('div');
        shadow.classList.add('shadow');

        /* adds the class of ball and shadow as its child */
        /* <div class="ball-container" style="left: someXpx; top; someYpx">
              <div class="ball" style="background-color:generated-color;"></div>
              <div class="shadow"></div>
           </div> */
        ballContainerDiv.appendChild(ball);
        ballContainerDiv.appendChild(shadow);

        /* <div id="ball-container">
            <div class="ball-container" style="left: someXpx; top; someYpx">
              <div class="ball" style="background-color:generated-color;"></div>
              <div class="shadow"></div>
            </div> 
           </div> */
        ballContainer.appendChild(ballContainerDiv);
    }
});

function getRandomColor() {
    const letters = '0123456789ABCDEF'; /* hexadecimal characters */
    let color = '#'; /* initialize color with # */
    for (let i = 0; i<6; i++) { /* 6 characters */
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function moveBalls(e) {
    console.log(e);
    // iterates 3 times to find the values of the 3 balls
    for (let i = 1; i<=3; i++) {
        // Get coords based off the current ball (ex: x1, y1 for ball1)
        const xInput = document.getElementById(`X${i}`);
        const yInput = document.getElementById(`Y${i}`);
        const ball = document.querySelector(`.ballContainer${i}`);

        // Check if they exist then convert numbers to floats
        // floats occupy too much memory
        if (xInput && yInput && ball) {
            //converts to float numbers
            const x = parseInt(xInput.value);
            const y = parseInt(yInput.value);

            console.log(`Ball${i}: X = ${x}, Y = ${y}`);

            // if both valid (not NaN), it moves the ball
            if (!isNaN(x) && !isNaN(y)) {
                console.log(`Moving Ball${i} to (${x}px, ${y}px)`);
                
                ball.style.left = x + 'px';
                ball.style.top = y + 'px';
            } else {
                console.error(`Invalid coordinates for Ball${i}`);
            }
        } else {
            console.error(`Elements for Ball${i} not found.`);
        }
    }
}
