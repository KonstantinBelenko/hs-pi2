document.addEventListener('DOMContentLoaded', function() {
    var revealButton = document.getElementById('reveal-button');
    var resetButton = document.getElementById('reset-button');

    var switched = false;
    var backgroundColors = [
        "#f0f0f0",
        "#ffa1cb"
    ]
    
    revealButton.addEventListener('click', function() {
        answer.style.display = 'block';
        revealButton.style.display = 'none';
        resetButton.style.display = 'inline-block';

        switchBackground();
    });
    
    resetButton.addEventListener('click', function() {
        answer.style.display = 'none';
        revealButton.style.display = 'inline-block';
        resetButton.style.display = 'none';

        switchBackground();
    });

    const switchBackground = () => {
        switched = !switched;
        document.body.style.backgroundColor = backgroundColors[switched ? 1 : 0];
    }
});
