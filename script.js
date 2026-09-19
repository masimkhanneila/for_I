const startBtn = document.getElementById("startBtn");
const textHeart = document.getElementById("textHeart");
const myPhoto = document.getElementById("myPhoto");
const flyingHearts = document.getElementById("flyingHearts");


// -------------------------
// START
// -------------------------

startBtn.addEventListener("click", () => {

    startBtn.style.display = "none";

    drawTextHeart();

});


// -------------------------
// DRAW "I LUV U" HEART
// -------------------------

function drawTextHeart() {

    const numberOfTexts = 800;

    /*
        Standard mathematical heart:

        x = 16 sin³(t)

        y =
        13 cos(t)
        - 5 cos(2t)
        - 2 cos(3t)
        - cos(4t)
    */

    for (let i = 0; i < numberOfTexts; i++) {

        const t = (Math.PI * 2 * i) / numberOfTexts;

        const x =
            16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);


        const text = document.createElement("span");

        text.classList.add("love-text");

        text.textContent = "I luv u";


        /*
            Multiply the mathematical heart
            to make it large enough around
            the friend's photo.
        */

        const scale = 11;

        text.style.left = `${x * scale}px`;

        /*
            Negative because browser Y
            goes downward.
        */

        text.style.top = `${-y * scale}px`;


        /*
            Each phrase appears slightly later
            than the previous one.
        */

        text.style.animationDelay = `${i * 0.003}s`;


        textHeart.appendChild(text);
    }


    /*
        Wait until the heart has been drawn.
    */

    const drawingTime =
        numberOfTexts * 8 + 1000;


    setTimeout(() => {

        disappearTextHeart();

    }, drawingTime);
}


// -------------------------
// DISAPPEAR TEXT HEART
// -------------------------

function disappearTextHeart() {

    textHeart.style.opacity = "0";


    setTimeout(() => {

        textHeart.innerHTML = "";

        /*
            Now your photo appears
            slightly to the left.
        */

        myPhoto.classList.add("show");


        /*
            Give the browser a little time
            before starting the hearts.
        */

        setTimeout(() => {

            sendHearts();

        }, 800);

    }, 1000);
}


// -------------------------
// SEND HEARTS
// -------------------------

function sendHearts() {

    const numberOfHearts = 35;

    const scene =
        document.querySelector(".scene");

    const myPhotoRect =
        myPhoto.getBoundingClientRect();

    const friendPhoto =
        document.querySelector(".friend-photo");

    const friendPhotoRect =
        friendPhoto.getBoundingClientRect();

    const sceneRect =
        scene.getBoundingClientRect();


    /*
        Starting position:
        center of YOUR photo.
    */

    const startX =
        myPhotoRect.left
        + myPhotoRect.width / 2
        - sceneRect.left;

    const startY =
        myPhotoRect.top
        + myPhotoRect.height / 2
        - sceneRect.top;


    /*
        Target position:
        center of FRIEND'S photo.
    */

    const targetX =
        friendPhotoRect.left
        + friendPhotoRect.width / 2
        - sceneRect.left;

    const targetY =
        friendPhotoRect.top
        + friendPhotoRect.height / 2
        - sceneRect.top;


    for (let i = 0; i < numberOfHearts; i++) {

        const heart =
            document.createElement("div");

        heart.classList.add("flying-heart");

        heart.textContent = "❤️";


        /*
            Start at YOUR photo.
        */

        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;


        /*
            Calculate the distance
            to your friend's photo.
        */

        const distanceX =
            targetX - startX;

        const distanceY =
            targetY - startY;


        heart.style.setProperty(
            "--target-x",
            `${distanceX}px`
        );

        heart.style.setProperty(
            "--target-y",
            `${distanceY}px`
        );


        /*
            Different hearts leave
            at slightly different times.
        */

        heart.style.animationDelay =
            `${i * 0.08}s`;


        /*
            Small random movement
            makes it look more natural.
        */

        const randomX =
            (Math.random() - 0.5) * 100;

        const randomY =
            (Math.random() - 0.5) * 100;


        heart.style.marginLeft =
            `${randomX}px`;

        heart.style.marginTop =
            `${randomY}px`;


        flyingHearts.appendChild(heart);


        /*
            Remove heart after animation.
        */

        setTimeout(() => {

            heart.remove();

        }, 3000 + i * 80);
    }
}