
const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユラリルレロワヲン";
function createMatrix() {
  const matrix = document.getElementById("matrix");


  for (let i = 0; i < 100; i++) {
    const column = document.createElement("div");
    column.className = "matrix-column";

    column.style.left = Math.random() * 100 + "%";
    column.style.animationDelay = Math.random() * 15 + "s";
    column.style.animationDuration = Math.random() * 5 + 5 + "s";
    column.style.fontSize = Math.random() * 10 + 10 + "px";

    for (let row = 0; row < 50; row++) {
      const charSpan = document.createElement("span");
      charSpan.className = "matrix-char";
      charSpan.textContent = randomGlyph(chars);
      column.appendChild(charSpan);

      column.appendChild(document.createElement("br"));
    }

    matrix.appendChild(column);
  }
}

function randomGlyph(chars) {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function refreshAllChars() {
  document.querySelectorAll(".matrix-char").forEach((span) => {
    span.textContent = randomGlyph(chars);
  });
}

setInterval(refreshAllChars, 120);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

function typeWriter(element, text, speed = 100, callback) {
  let i = 0;
  element.textContent = "";

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (typeof callback === "function") {
      callback();
    }
  }
  typing();
}

const observerOptions = {
  threshold: 0.9,
  rootMargin: "0px 0px -100px 0px",
};

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll(".progress-fill");
      progressBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 1000);
      });
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-terminal").forEach((terminal) => {
  progressObserver.observe(terminal);
});

function updateContainerStatus() {
  const indicators = document.querySelectorAll(".status-indicator");
  indicators.forEach((indicator) => {
    if (Math.random() > 0.1) {
      indicator.style.background = "var(--terminal-green)";
      indicator.nextElementSibling.textContent = "RUNNING";
      indicator.nextElementSibling.style.color = "var(--terminal-green)";
    } else {
      indicator.style.background = "var(--syntax-red)";
      indicator.nextElementSibling.textContent = "STOPPED";
      indicator.nextElementSibling.style.color = "var(--syntax-red)";
    }
  });
}

setInterval(updateContainerStatus, 30000);

function updatePromptTime() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour12: false });
  document.querySelectorAll(".terminal-title").forEach((title) => {
    if (title.textContent.includes("justin@")) {
      title.textContent = `justin@dev-machine:~ [${time}]`;
    }
  });
}

setInterval(updatePromptTime, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const gitSpan = document.querySelector(".typing-animation");
  if (!gitSpan) return;

  const gitText = gitSpan.textContent.trim();
  gitSpan.textContent = "";

  const outputs = Array.from(document.querySelectorAll(".typing-output"));

  outputs.forEach((span) => {
    const original = span.textContent.trim();
    span.setAttribute("data-original", original);
    span.textContent = "";
  });

  function typeNextOutput(index) {
    if (index >= outputs.length) return; // done
    const span = outputs[index];
    const fullText = span.getAttribute("data-original");
    typeWriter(span, fullText, 15, () => {
      typeNextOutput(index + 1);
    });
  }

  typeWriter(gitSpan, gitText, 100, () => {
    setTimeout(() => {
      typeNextOutput(0);
    }, 200);
  });
});

window.addEventListener("load", () => {
  setTimeout(createMatrix, 300); // 3000ms = 3s delay
});

const KONAMI_PATTERN = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
window.konamiIndex = 0;

function registerInput(key) {
  if (key === KONAMI_PATTERN[window.konamiIndex]) {
    window.konamiIndex++;
    if (window.konamiIndex === KONAMI_PATTERN.length) {
      toggleKonamiMode();
      window.konamiIndex = 0;
    }
  } else {
    window.konamiIndex = 0;
  }
}

document.addEventListener("keydown", function (e) {
  // e.key will be "ArrowUp", "ArrowDown", "b", "a", etc.
  registerInput(e.key);
});

let touchStartX = 0,
  touchStartY = 0;

document.addEventListener("touchstart", function (e) {
  // Record where the finger started
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const SWIPE_THRESHOLD = 50; // minimum pixels for it to count

  // If the movement is mostly horizontal and exceeds threshold:
  if (absX > absY && absX > SWIPE_THRESHOLD) {
    if (dx > 0) {
      registerInput("ArrowRight");
    } else {
      registerInput("ArrowLeft");
    }
    return; // skip tap logic if it was a swipe
  }

  // If the movement is mostly vertical and exceeds threshold:
  if (absY > absX && absY > SWIPE_THRESHOLD) {
    if (dy > 0) {
      registerInput("ArrowDown");
    } else {
      registerInput("ArrowUp");
    }
    return; // skip tap logic if it was a swipe
  }

  // Otherwise, treat it as a “tap” candidate for 'b' or 'a'
  handleTapForBA(e.changedTouches[0]);
});

let lastTapTime = 0;
function handleTapForBA(touch) {
  const now = Date.now();
  const TAP_DELAY = 500; // ms to consider a “double-tap”
  const x = touch.clientX;
  const y = touch.clientY;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Only proceed if this tap happened within TAP_DELAY of the previous
  if (now - lastTapTime < TAP_DELAY) {
    // Bottom third of screen: y > 70% of vh
    if (y > vh * 0.7) {
      // Left 30% → 'b'
      if (x < vw * 0.3) {
        registerInput("b");
      }
      // Right 30% → 'a'
      else if (x > vw * 0.7) {
        registerInput("a");
      }
    }
  }
  lastTapTime = now;
}

let konamiActive = false;

function toggleKonamiMode() {
  const panel = document.getElementById("dev-panel");

  konamiActive = !konamiActive;
  if (konamiActive) {
    window.scrollTo({ top: 0, behavior: "auto" });
    panel.style.display = "block";
    document.body.classList.add("konami-active");
  } else {
    panel.style.display = "none";
    document.body.classList.remove("konami-active");
  }
}

function copyEmail(event) {
  event.preventDefault();
  const email = "justin@oakenfull.com.au";
  const link = event.currentTarget;
  if (!link.dataset.original) {
    link.dataset.original = link.innerText.trim();
  }
  navigator.clipboard
    .writeText(email)
    .then(() => {
      link.innerText = "copied!";
      setTimeout(() => {
        link.innerText = link.dataset.original;
      }, 1500);
    })
    .catch(() => {
      window.prompt("Copy to clipboard:", email);
    });
}
