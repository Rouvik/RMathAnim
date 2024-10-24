const {sc, cxt} = CreateCanvas(1920, 1080, {alpha: false});

// const recorder = CreateCanvasRecorder(sc);

cxt.strokeStyle = "rgb(255, 255, 255)";
cxt.fillStyle = "rgb(255, 255, 255)";

cxt.lineWidth = 2;

AnimatedText.cxt = cxt;
AnimatedVector.cxt = cxt;

const title = new AnimatedText("Welcome to RMathAnim!", 150, 500, undefined, {dashLineMax: 850, fontSize: 120, backColorFinal: new vec3(48, 124, 248), lineColor: 'rgb(48, 124, 248)'});
title.ti = 0.005;
// title.interpolerationFn = (x) => (1 - Math.cos(Math.PI * x)) / 2; // cubic ease-in-out
title.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

const animVec = new AnimatedVector(new vec2(120, 620), new vec2(1800, 620));

function animate() {
    cxt.clearRect(0, 0, sc.width, sc.height);
    animVec.update();
    title.update();
    requestAnimationFrame(animate);
}

animate();
// recorder.recordFor(3000);