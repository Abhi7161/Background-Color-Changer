
const presetColors = document.querySelectorAll(".color-circle");
const colorPicker = document.getElementById("color-picker");
const colorCode = document.getElementById("color-code");
const addColorBtn = document.getElementById("add-color");
const randomColorBtn = document.getElementById("random-color");
const copyBtn = document.querySelector(".copy-btn");
const customColors = document.getElementById("ccolors");
const addSquareBtn = document.querySelector(".add-square");

function changeBackground(color) {
    document.body.style.background = color;

    presetColors.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.color === color.toLowerCase()
        );
    });

    document.querySelectorAll(".color-square").forEach((button) => {
        button.style.outline =
            button.dataset.color === color.toLowerCase()
                ? "2px solid white"
                : "none";
    });
}

function updateColorCode(color) {
    colorPicker.value = color;
    colorCode.textContent = color.toUpperCase();
}

presetColors.forEach((button) => {
    const color = getComputedStyle(button)
        .getPropertyValue("--color")
        .trim()
        .toLowerCase();

    button.dataset.color = color;

    button.addEventListener("click", () => {
        changeBackground(color);
    });
});

colorPicker.addEventListener("input", () => {
    updateColorCode(colorPicker.value);
});

function addCustomColor(color) {
    const normalizedColor = color.toLowerCase();

    const existingColors = [
        ...customColors.querySelectorAll(".color-square")
    ];

    const alreadyExists = existingColors.some((button) => {
        return button.dataset.color === normalizedColor;
    });

    if (alreadyExists) {
        changeBackground(normalizedColor);
        updateColorCode(normalizedColor);
        return;
    }

    const button = document.createElement("button");

    button.className = "color-square";
    button.style.setProperty("--color", normalizedColor);
    button.dataset.color = normalizedColor;
    button.setAttribute("aria-label", normalizedColor);

    button.addEventListener("click", () => {
        changeBackground(normalizedColor);
        updateColorCode(normalizedColor);
    });

    customColors.insertBefore(button, addSquareBtn);

    changeBackground(normalizedColor);
    updateColorCode(normalizedColor);
}

addColorBtn.addEventListener("click", () => {
    addCustomColor(colorPicker.value);
});

randomColorBtn.addEventListener("click", () => {
    const randomColor = "#" +
        Math.floor(Math.random() * 16777216)
            .toString(16)
            .padStart(6, "0");

    updateColorCode(randomColor);
    changeBackground(randomColor);
});

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(colorPicker.value);
        copyBtn.textContent = "✓";

        setTimeout(() => {
            copyBtn.textContent = "▢";
        }, 1000);
    } catch (error) {
        console.error("Could not copy color:", error);
    }
});

addSquareBtn.addEventListener("click", () => {
    colorPicker.click();
});

updateColorCode(colorPicker.value);
