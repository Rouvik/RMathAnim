const { sc, cxt } = CreateCanvas(600, 700, { alpha: false });

// const recorder = CreateCanvasRecorder(sc);

RGlobal.setContext(cxt);

cxt.lineWidth = 2;

const title = new RAText("RMathAnim Plot Examples!", 10, 40, undefined, { maxLineDash: 300, fontSize: 40, backColorFinal: new vec3(48, 124, 248), lineColor: 'rgb(48, 124, 248)' });
title.ti = 0.005;
// title.interpolerationFn = (x) => (1 - Math.cos(Math.PI * x)) / 2; // cubic ease-in-out
title.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

// let told = 0;

// let points = [-50, 0];
// for (let i = 2; i < 100; i += 2) {
//     points[i] = points[i - 2] + ~~(Math.random() * 8 + 5);
//     points[i + 1] = ~~(Math.random() * 200 - 100);
// }

let points = [];
for (let i = -50; i < 400; i++) {
    points.push(i, 100 * Math.sin(i / 20));
}

const animcurve = new RACurve(points, new vec2(100, 200), new vec2(-50, 400), new vec2(-100, 100), { curveColor: 'rgb(255, 255, 0)', gridColor: 'rgb(255, 128, 255)', gridTextColor: 'rgb(256, 0, 128)' });
animcurve.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

const animhist = new RAHist([9, 6, -3, 7, 5, 2], new vec2(0, 6), new vec2(80, 350), new vec2(500, 300), { strokeColor: 'rgb(255, 255, 255)', mode: RHist.DRAWMODE.stroke | RHist.DRAWMODE.fill });
animhist.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

function animate(t) {
    cxt.clearRect(0, 0, sc.width, sc.height);
    title.update();

    animcurve.update();
    animhist.update();

    // console.log(1000 / (t - told));
    // told = t;

    requestAnimationFrame(animate);
}

animate(performance.now());
// recorder.recordFor(3000);