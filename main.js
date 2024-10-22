const {sc, cxt} = CreateCanvas(800, 400, {alpha: false});

cxt.strokeStyle = "rgb(255, 255, 255)";

cxt.lineWidth = 2;

const titleOptions = new AppearingTextOptions("Hello world!", null, null, null, null, 300);

function animate() {
    cxt.clearRect(0, 0, sc.width, sc.height);
    AppearingText(titleOptions, 240, 40);
    requestAnimationFrame(animate);
}

animate();