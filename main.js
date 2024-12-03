const { sc, cxt } = CreateCanvas(600, 700, { alpha: false });

// const recorder = CreateCanvasRecorder(sc);

RGlobal.setContext(cxt);

cxt.lineWidth = 2;

const title = new RAText("RMathAnim Plot Examples!", 10, 40, undefined, { maxLineDash: 300, fontSize: 40, backColorFinal: new vec3(48, 124, 248), lineColor: 'rgb(48, 124, 248)' });
title.ti = 0.005;

// title.interpolerationFn = (x) => (1 - Math.cos(Math.PI * x)) / 2; // cubic ease-in-out
title.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

const animVec = new RAVector(new vec2(200, 200), new vec2(400, 200));
animVec.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

const animVec2 = new RAVector(new vec2(0, 0), new vec2(0, 100), {color: 'rgb(255, 0, 255)'});
animVec2.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

const animComposition = new RComposition([
    {
        func: () => title.update(),
        steps: title.steps + 100
    },
    {
        func: () => {
            animVec.update();
            animVec2.RVector.start = animVec.RVector.tip;
            animVec2.update();
        },
        steps: Math.max(animVec.steps, animVec2.steps)
    }
]);

function animate() {
    cxt.clearRect(0, 0, sc.width, sc.height);
    // title.update();

    // animVec.update();

    animComposition.update();

    requestAnimationFrame(animate);
}

animate();
// recorder.recordFor(3000);