document.addEventListener("DOMContentLoaded", function() {
    const ballContainer = document.getElementById('ball-container');
    const numberOfBalls = Math.floor(Math.random() * 10) + 1; /* m.r generated a floating point number between 
    0 and 1, multiplying by 10 brings this to a range between 0-10, m.f rounds down to whole number, therefore 
     + 1 to also include 10 */

    const balls = []; // array to keep track of each ball and their velocities

    for (let i = 1; i<=numberOfBalls; i++) { // loop that'll run numberOfBalls times, creating a new ball each iteration 
        
        // creates new div element that acts as a container for each ball 
        const ballContainerDiv = document.createElement('div');
        // adds the CSS class to new div giving it the style 
        ballContainerDiv.classList.add('ball-container');
        // random left/top position, within viewport (allegedly) 
        ballContainerDiv.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
        ballContainerDiv.style.top = `${Math.random() * (window.innerHeight - 150)}px`;
        
        // creates new div that will represent ball itself 
        const ball = document.createElement('div');
        // adds the CSS class to new div giving it the style 
        ball.classList.add('ball');
        // ball.classList.add(`ball${i}`);
        ball.style.backgroundColor = getRandomColor(); // calls getRandomColor function 

        // new div that represents shadow of the ball 
        const shadow = document.createElement('div');
        shadow.classList.add('shadow');

        // adds the class of ball and shadow as its child 
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

        const velocity = {
            x: Math.random() * 4 + 1, //random value between [1-5)
            y: Math.random() * 4 + 1
        }

        balls.push({ element: ballContainerDiv, velocity}); //adds (to end of list) an object for array, keep track of each ball


        // let because their values will change
        let isDragging = false;
        let offsetX, offsetY; 
 
        ballContainerDiv.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - ballContainerDiv.getBoundingClientRect().left;
            offsetY = e.clientY - ballContainerDiv.getBoundingClientRect().top;
            lastMouseX = e.clientX; // Get initial coords of the mouse pointer
            lastMouseY = e.clientY;
            ballContainerDiv.style.zIndex = '1000';
        });

        document.addEventListener('mousemove', function(e) {
            if(isDragging) {
                ballContainerDiv.style.left = `${e.clientX - offsetX}px`;
                ballContainerDiv.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            if(isDragging) {
                isDragging = false;
                ballContainerDiv.style.zIndex = '';
            }
        });
    
    }
    function moveBalls() {
        balls.forEach((ball, index) => { //performs an operation for each element in balls array
            //getting bounding rectangle properties for each ball element in array
            const ballRect = ball.element.getBoundingClientRect(); //returns width/height/top/right/bottom/left properties
            let x = parseFloat(ball.element.style.left); //current x/y positions
            let y = parseFloat(ball.element.style.top);

            if (x + ballRect.width >= window.innerWidth || x<=0) {
                ball.velocity.x *= -1; // reverse x velocity when hitting left/right edge
            }

            if (y + ballRect.height >= window.innerHeight || y<=0) {
                ball.velocity.y *= -1;
            }

            ball.element.style.left = `${x + ball.velocity.x}px`; //move ball in x direction
            ball.element.style.top = `${y + ball.velocity.y}px`; 

            for(let j = index + 1; j<balls.length; j++) {
                const otherBall = balls[j];
                const otherBallRect = otherBall.element.getBoundingClientRect();

                const radius1 = ballRect.width / 2;
                const radius2 = otherBallRect.width /2;

                const dx = (x + radius1) - (parseFloat(otherBall.element.style.left) + radius2);
                const dy = (y + radius1) - (parseFloat(otherBall.element.style.top) + radius2);
                const distance = Math.sqrt(dx * dx + dy *dy);

                if (distance <= radius1 + radius2) {
                    let vx1 = ball.velocity.x;
                    let vy1 = ball.velocity.y;
                    let vx2 = otherBall.velocity.x;
                    let vy2 = otherBall.velocity.y;
                
                    // Swapping velocities
                    ball.velocity.x = vx2;
                    ball.velocity.y = vy2;
                    otherBall.velocity.x = vx1;
                    otherBall.velocity.y = vy1;
                
                    // Move them apart
                    const overlap = (radius1 + radius2) - distance;
                    const moveX = dx * (overlap / distance);
                    const moveY = dy * (overlap / distance);
                
                    ball.element.style.left = `${x + moveX}px`;
                    ball.element.style.top = `${y + moveY}px`;
                    otherBall.element.style.left = `${parseFloat(otherBall.element.style.left) - moveX}px`;
                    otherBall.element.style.top = `${parseFloat(otherBall.element.style.top) - moveY}px`;
                }
            }

        });
        
        requestAnimationFrame(moveBalls); //keep animation going
    }

    moveBalls();
});


function getRandomColor() {
    const letters = '0123456789ABCDEF'; // hexadecimal characters 
    let color = '#'; // initialize color with # 
    for (let i = 0; i<6; i++) { // 6 characters 
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
 


//if diameters/radius is the exact length of 2, that means they collided, if its more, they're far away, if its less, then they already collided.
// check each ball and each of their radiuses and if it equals the correct amount then it bounces