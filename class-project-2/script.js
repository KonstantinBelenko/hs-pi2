document.addEventListener("DOMContentLoaded", () => {
    const tiles = document.querySelectorAll(".tile");


    let confetti = new Confetti('body');
    confetti.setCount(75);
    confetti.setSize(1);
    confetti.setPower(25);
    confetti.setFade(false);
    confetti.destroyTarget(false);


    tiles.forEach((tile) => {
        tile.addEventListener("mousedown", (e) => {
            const currentTile = e.currentTarget;

            currentTile.classList.add("loading");

            setTimeout(() => {
                currentTile.classList.remove("loading");
                currentTile.classList.remove("scale-on-hover");

                // Change the image
                currentTile.style.backgroundImage = "url(./ricardo.gif)";

            }, 1500);
        });

        tile.addEventListener("mouseup", () => {
            tile.classList.remove("loading");
        });

        tile.addEventListener("mouseleave", () => {
            tile.classList.remove("loading");
        });
    });
});
