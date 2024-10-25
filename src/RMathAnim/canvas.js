/**
 * Generated a canvas, configures it and attaches it to the html body as required,
 * also adds the generated canvas rendering context 2D to the canvas itself as sc.cxt
 * 
 * @param {number} width The width of the canvas
 * @param {number} height The height of the canvas
 * @param {CanvasRenderingContext2DSettings} options Options to be passed for the canvas
 * @returns {Object} An object with the canvas and the canvas context both in it --> {sc, cxt}
 */
function CreateCanvas(width, height, options = {alpha: true}) {
    const sc = document.createElement("canvas");
    sc.width = width;
    sc.height = height;
    sc.cxt = sc.getContext('2d', options);
    document.body.appendChild(sc);
    return {sc, cxt: sc.cxt};    
}

/**
 * Creates a recorder handle for the canvas and returns it.
 * @param {HTMLCanvasElement} canvas The canvas to record rendered frames from
 * @param {MediaRecorderOptions} options Options to be applied for the media recorder
 */
function CreateCanvasRecorder(canvas, options = {}) {
    canvas.MathRecorder = {mediaRecorder: null, chunks: []};
    canvas.MathRecorder.mediaRecorder = new MediaRecorder(canvas.captureStream(), Object.assign({mimeType: 'video/mp4'}, options));
    
    canvas.MathRecorder.mediaRecorder.ondataavailable = (e) => {        
        canvas.MathRecorder.chunks.push(e.data);
    };

    canvas.MathRecorder.mediaRecorder.onstop = () => {
        const media = new Blob(canvas.MathRecorder.chunks);
        const download = document.createElement('a');
        download.href = URL.createObjectURL(media);
        download.download = "MathAnim.mp4";
        download.click();

        canvas.MathRecorder.chunks = []; // reset the chunks once generated
    };

    canvas.MathRecorder.record = canvas.MathRecorder.mediaRecorder.start.bind(canvas.MathRecorder.mediaRecorder);
    canvas.MathRecorder.stopRecord = canvas.MathRecorder.mediaRecorder.stop.bind(canvas.MathRecorder.mediaRecorder);
    
    canvas.MathRecorder.recordFor = (time) => {        
        setTimeout(() => canvas.MathRecorder.stopRecord(), time + 1000);
        canvas.MathRecorder.record();
    };

    return canvas.MathRecorder;
}