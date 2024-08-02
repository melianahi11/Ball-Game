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