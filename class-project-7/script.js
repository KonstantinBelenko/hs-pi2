document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const shapeSize = document.getElementById('shapeSize');
    const lineWidthRange = document.getElementById('lineWidthRange');
    const resetCanvas = document.getElementById('resetCanvas');
    const drawCircleBtn = document.getElementById('drawCircle');
    const drawTriangleBtn = document.getElementById('drawTriangle');
    const drawRectangleBtn = document.getElementById('drawRectangle');
    const drawPencilBtn = document.getElementById('drawPencil');
    const colorPicker = document.getElementById('colorPicker');

    colorPicker.addEventListener('input', function() {
        context.fillStyle = this.value;
        context.strokeStyle = this.value;
    });

    let isDrawing = false;
    let drawingMethod = 'pencil';
    let shapeHeight = 100;

    canvas.width = 700;
    canvas.height = 500;

    function drawCircle(x, y) {
        context.beginPath();
        context.arc(x, y, shapeHeight / 2, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

    function drawTriangle(x, y) {
        context.beginPath();
        context.moveTo(x, y - shapeHeight / 2);
        context.lineTo(x + shapeHeight / 2, y + shapeHeight / 2);
        context.lineTo(x - shapeHeight / 2, y + shapeHeight / 2);
        context.closePath();
        context.fill();
        context.stroke();
    }

    function drawRectangle(x, y) {
        context.beginPath();
        context.rect(x - shapeHeight / 2, y - shapeHeight / 2, shapeHeight, shapeHeight);
        context.fill();
        context.stroke();
    }

    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        if (drawingMethod !== 'pencil') {
            drawShape(drawingMethod, event.offsetX, event.offsetY);
        } else {
            context.beginPath();
            context.moveTo(event.offsetX, event.offsetY);
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing && drawingMethod === 'pencil') {
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        if (drawingMethod === 'pencil') {
            context.closePath();
        }
    });

    function drawShape(method, x, y) {
        switch (method) {
            case 'circle':
                drawCircle(x, y);
                break;
            case 'triangle':
                drawTriangle(x, y);
                break;
            case 'rectangle':
                drawRectangle(x, y);
                break;
        }
    }

    shapeSize.addEventListener('input', function() {
        shapeHeight = this.value;
    });

    lineWidthRange.addEventListener('input', function() {
        context.lineWidth = this.value;
    });

    resetCanvas.addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Button event listeners
    drawCircleBtn.addEventListener('click', () => selectDrawingMethod('circle', drawCircleBtn));
    drawTriangleBtn.addEventListener('click', () => selectDrawingMethod('triangle', drawTriangleBtn));
    drawRectangleBtn.addEventListener('click', () => selectDrawingMethod('rectangle', drawRectangleBtn));
    drawPencilBtn.addEventListener('click', () => selectDrawingMethod('pencil', drawPencilBtn));

    function selectDrawingMethod(method, button) {
        drawingMethod = method;
        // Remove selected class from all buttons
        [drawCircleBtn, drawTriangleBtn, drawRectangleBtn, drawPencilBtn].forEach(btn => {
            btn.classList.remove('selected-button');
        });
        // Add selected class to the clicked button
        button.classList.add('selected-button');
    }
});
