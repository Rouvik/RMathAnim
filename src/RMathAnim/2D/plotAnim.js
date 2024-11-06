class RHist {
    static DRAWMODE = {
        stroke: 1,
        fill: 2
    };

    constructor(values, xRange, translate, dimentions, options = {}) {
        this.values = values;
        this.translate = translate;
        this.dimentions = dimentions;
        this.xRange = xRange;

        this.options = Object.assign({
            strokeColor: 'rgb(205, 92, 92)',
            fillColor: 'rgb(135, 206, 235)',
            segmentGap: 0,
            heightGap: 0,
            border: false,
            displayGraphGuide: true,
            graphGuideColor: 'rgba(255, 255, 255, 0.2)',
            graphDeltaGap: 10,
            graphYDivisions: 10,
            graphDisplayNums: true,
            graphDisplayNumColor: 'rgb(128, 0, 128)',
            graphNumSize: 20,
            graphNumAdjustX: -10,
            graphNumFix: 2,
            mode: RHist.DRAWMODE.fill
        }, options);
    }

    set values(v) {
        this._values = v;
        this.maxVal = this.values[0];
        this.hasNegValues = false;
        for (const val of this._values) {
            if (val < 0) {
                this.hasNegValues = true;
            }

            const absVal = Math.abs(val);
            if (absVal > this.maxVal) {
                this.maxVal = absVal;
            }
        }
    }

    get values() {
        return this._values;
    }

    update() {
        RGlobal.cxt.beginPath();
        RGlobal.cxt.strokeStyle = this.options.strokeColor;
        RGlobal.cxt.fillStyle = this.options.fillColor;
        if (this.options.border) {
            RGlobal.cxt.strokeRect(this.translate.x, this.translate.y, this.dimentions.x + 3, this.dimentions.y);
        }
        
        let segmentWidth = this.dimentions.x / this.values.length;
        let baseY = this.hasNegValues ? this.dimentions.y / 2 : this.dimentions.y;
        
        // draw background graph
        RGlobal.cxt.moveTo(this.translate.x, this.translate.y - this.options.graphDeltaGap);
        RGlobal.cxt.lineTo(this.translate.x, this.translate.y + this.dimentions.y + this.options.graphDeltaGap);
        
        let yDivHeight = this.dimentions.y / this.options.graphYDivisions;
        
        const prevFont = RGlobal.cxt.font;
        RGlobal.cxt.font = `${this.options.graphNumSize}px CMU Serif`;
        RGlobal.cxt.fillStyle = this.options.graphDisplayNumColor;
        
        if (this.options.graphDisplayNums) {
            const yDecrement = this.maxVal / (this.hasNegValues ? this.options.graphYDivisions / 2 : this.options.graphYDivisions);
            for (let currentYVal = this.maxVal, i = 0; i <= this.options.graphYDivisions; i++, currentYVal -= yDecrement) {
                RGlobal.cxt.fillText(currentYVal.toFixed(this.options.graphNumFix), this.translate.x - this.options.graphDeltaGap - this.options.graphNumSize * this.options.graphNumFix + this.options.graphNumAdjustX, this.translate.y + i * yDivHeight);
            }
        }
        
        RGlobal.cxt.fillStyle = this.options.fillColor;
        
        for (let i = 0; i <= this.options.graphYDivisions; i++) {
            RGlobal.cxt.moveTo(this.translate.x - this.options.graphDeltaGap, this.translate.y + i * yDivHeight);
            RGlobal.cxt.lineTo(this.translate.x + this.options.graphDeltaGap, this.translate.y + i * yDivHeight);

        }



        RGlobal.cxt.font = prevFont;

        for (let i = 0; i <= this.values.length; i++) {
            RGlobal.cxt.moveTo(this.translate.x + i * segmentWidth, this.translate.y + baseY - this.options.graphDeltaGap);
            RGlobal.cxt.lineTo(this.translate.x + i * segmentWidth, this.translate.y + baseY + this.options.graphDeltaGap);
        }

        RGlobal.cxt.stroke();

        if (this.options.displayGraphGuide) { // display horizontal graph guide
            RGlobal.cxt.strokeStyle = this.options.graphGuideColor;
            for (let i = 0; i <= this.options.graphYDivisions; i++) {
                RGlobal.cxt.moveTo(this.translate.x + this.options.graphDeltaGap, this.translate.y + i * yDivHeight);
                RGlobal.cxt.lineTo(this.translate.x + this.dimentions.x, this.translate.y + i * yDivHeight);
            }
            RGlobal.cxt.stroke();
        }

        // draw the histogram here
        RGlobal.cxt.strokeStyle = this.options.strokeColor;
        for (let i = 0; i < this.values.length; i++) {
            let colHeight = this.values[i] / this.maxVal * baseY - this.options.heightGap;

            if (this.options.mode & RHist.DRAWMODE.fill) {
                RGlobal.cxt.fillRect(this.translate.x + i * segmentWidth + this.options.segmentGap / 2 + 1, this.translate.y + baseY - colHeight, segmentWidth - this.options.segmentGap + 1, colHeight);
            }

            if (this.options.mode & RHist.DRAWMODE.stroke) {
                RGlobal.cxt.strokeRect(this.translate.x + i * segmentWidth + this.options.segmentGap / 2 + 1, this.translate.y + baseY - colHeight, segmentWidth - this.options.segmentGap + 1, colHeight);
            }
        }
    }
}