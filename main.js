import { data } from "./data.js";

const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector("#close-btn");

const t1 = gsap.timeline({ paused: true, overwrite: "auto" });




t1.to(overlay, {
    duration: 0.5,
    bottom: "0px",
    rotation: 0,
    transformOrigin: "bottom center",
    ease: "power3.inOut",
});

const itemsContainer = document.querySelector('.items');

// Dynamically generate items
data.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    
    const itemIndexDiv = document.createElement('div');
    itemIndexDiv.classList.add('item-index');
    itemIndexDiv.textContent = (index + 1).toString().padStart(2, '0');
    
    const itemNameDiv = document.createElement('div');
    itemNameDiv.classList.add('item-name');
    itemNameDiv.textContent = item.itemName;
    
    const itemYearsDiv = document.createElement('div');
    itemYearsDiv.classList.add('item-years');
    itemYearsDiv.textContent = item.itemYears;
    
    itemDiv.appendChild(itemIndexDiv);
    itemDiv.appendChild(itemNameDiv);
    itemDiv.appendChild(itemYearsDiv);
    
    itemDiv.addEventListener("click", () => {
        console.log(`Clicked item ${index + 1}`);
        updateOverlay(item);
        t1.play();
    });
    
    itemsContainer.appendChild(itemDiv);
});

closeBtn.addEventListener("click", () => {
    t1.reverse();
});

function updateOverlay(dataItem) {
    const itemName = document.querySelector("#item-name");
    const itemCategory = document.querySelector("#item-category");
    const itemLink = document.querySelector("#item-link");
    const itemCopy = document.querySelector("#item-copy");
    const itemImg = document.querySelector("#item-img");

    itemName.textContent = dataItem.itemName;
    itemCategory.textContent = dataItem.itemCategory;
    itemLink.href = dataItem.itemLink;
    itemCopy.textContent = dataItem.itemCopy;
    itemImg.src = dataItem.itemImg;
}

document.addEventListener("click", (e) => {
    if (!overlay.contains(e.target) && !isItem(e.target)) {
        t1.reverse();
    }
});

function isItem(target) {
    return target.closest(".item");
}

// Select the particle container
const particleContainer = document.getElementById('particle-container');

// Create particles
const numParticles = 50;
for (let i = 0; i < numParticles; i++) {
    createParticle();
}

// Function to create a single particle
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particleContainer.appendChild(particle);

    // Random initial position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    gsap.set(particle, { x: x, y: y });

    // Random animation properties
    const duration = 1 + Math.random() * 2; // Duration between 1 and 3 seconds
    const delay = Math.random() * 2; // Random delay

    // Shine animation
    gsap.to(particle, {
        opacity: 0.5,
        scale: 1.5,
        repeat: -1,
        yoyo: true,
        duration: duration,
        delay: delay,
        ease: 'power1.inOut'
    });

    // Blink animation
    gsap.to(particle, {
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
        duration: duration / 2,
        delay: delay,
        ease: 'power1.inOut'
    });

    // Change color animation
    gsap.to(particle, {
        backgroundColor: randomColor(), // Random color
        repeat: -1,
        duration: duration * 2,
        delay: delay,
        ease: 'none'
    });

    // Move particle animation
    gsap.to(particle, {
        x: x + Math.random() * 100 - 50,
        y: y + Math.random() * 100 - 50,
        repeat: -1,
        yoyo: true,
        duration: duration,
        delay: delay,
        ease: 'power1.inOut'
    });
}

// Function to generate a random color
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

