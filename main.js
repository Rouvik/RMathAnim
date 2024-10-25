const {sc, cxt} = CreateCanvas(600, 400, {alpha: false});

// const recorder = CreateCanvasRecorder(sc);

RGlobal.setContext(cxt);

cxt.lineWidth = 2;

const title = new RAText("Welcome to RMathAnim!", 30, 200, undefined, {dashLineMax: 300, fontSize: 40, backColorFinal: new vec3(48, 124, 248), lineColor: 'rgb(48, 124, 248)'});
title.ti = 0.005;
// title.interpolerationFn = (x) => (1 - Math.cos(Math.PI * x)) / 2; // cubic ease-in-out
title.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

const animVec = new RAVector(new vec2(40, 250), new vec2(550, 250));

const hueVec = new RAHueVector(new vec2(40, 300), new vec2(550, 300));
hueVec.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

const vec = new RVector(new vec2(20, 300), new vec2(20, 5));

function animate() {
    cxt.clearRect(0, 0, sc.width, sc.height);
    animVec.update();
    title.update();
    vec.update();
    hueVec.update();
    requestAnimationFrame(animate);
}

animate();
// recorder.recordFor(3000);