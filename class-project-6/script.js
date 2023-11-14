document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidthRange = document.getElementById('lineWidthRange');
    const resetCanvas = document.getElementById('resetCanvas');

    let isDrawing = false;

    canvas.width = 700;
    canvas.height = 500;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    colorPicker.addEventListener('input', function() {
        context.strokeStyle = this.value;
    });

    lineWidthRange.addEventListener('input', function() {
        context.lineWidth = this.value;
    });

    resetCanvas.addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    function startDrawing(event) {
        isDrawing = true;
        context.beginPath();
        context.moveTo(event.offsetX, event.offsetY);
    }

    function draw(event) {
        if (isDrawing) {
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
        }
    }

    function stopDrawing() {
        if (isDrawing) {
            context.stroke();
            context.closePath();
            isDrawing = false;
        }
    }
});
