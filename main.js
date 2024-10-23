const {sc, cxt} = CreateCanvas(600, 400, {alpha: false});

cxt.strokeStyle = "rgb(255, 255, 255)";
cxt.fillStyle = "rgb(255, 255, 255)";

cxt.lineWidth = 2;

AnimatedText.cxt = cxt;
// AnimatedVector.cxt = cxt;

const title = new AnimatedText("Welcome to RMathAnim!", 40, 220, undefined, {dashLineMax: 300, fontSize: 40, backColorFinal: new vec3(48, 124, 248), lineColor: 'rgb(48, 124, 248)'});
title.ti = 0.005;
// title.interpolerationFn = (x) => (1 - Math.cos(Math.PI * x)) / 2; // cubic ease-in-out
title.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

// TODO: Enabling this causes weird issues!
// const animVec = new AnimatedVector(new vec2(40, 270), new vec2(560, 270));

function animate() {
    cxt.clearRect(0, 0, sc.width, sc.height);
    title.update();
    // animVec.update();
    requestAnimationFrame(animate);
}

animate();