const {sc, cxt} = CreateCanvas(600, 400, {alpha: false});

// const recorder = CreateCanvasRecorder(sc);

RGlobal.setContext(cxt);

cxt.lineWidth = 2;

const title = new RAText("Welcome to RMathAnim!", 30, 40, undefined, {maxLineDash: 300, fontSize: 40, backColorFinal: new vec3(48, 124, 248), lineColor: 'rgb(48, 124, 248)'});
title.ti = 0.005;
// title.interpolerationFn = (x) => (1 - Math.cos(Math.PI * x)) / 2; // cubic ease-in-out
title.interpolerationFn = (x) => x < 0.5 ? 4 * x ** 3 : 1 - ((-2 * x + 2) ** 3) / 2; // quadratic ease-in-out

// let told = 0;

const hist = new RHist([9, 6, -3, 7, 5, 2], new vec2(0, 6), new vec2(80, 80), new vec2(500, 300), {strokeColor: 'rgb(255, 255, 255)', mode: RHist.DRAWMODE.stroke | RHist.DRAWMODE.fill});

function animate(t) {
    cxt.clearRect(0, 0, sc.width, sc.height);
    title.update();

    hist.update();

    // console.log(1000 / (t - told));
    // told = t;
    
    requestAnimationFrame(animate);
}

animate(performance.now());
// recorder.recordFor(3000);