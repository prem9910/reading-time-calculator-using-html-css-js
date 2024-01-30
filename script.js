let form = document.querySelector(".reading-avg");
let textarea = form.querySelector("textarea");
let infoWrapper = form.querySelector(".info-wrapper");

function leadingZeros(num) {
  return num.toString().padStart(2, 0);
}

function formatTime(time) {
  let inSeconds = Math.floor(time % 60);
  let inMinutes = Math.floor(time / 60) % 60;
  let inHours = Math.floor(time / 3600);

  if (inMinutes === 0) {
    return `00:${leadingZeros(inSeconds)} (${inSeconds} ${
      inSeconds > 1 ? "Seconds" : "Second"
    })`;
  } else if (inHours === 0) {
    return `${leadingZeros(inMinutes)}:${leadingZeros(
      inSeconds
    )} (${inMinutes} ${inMinutes > 1 ? "Minutes" : "Minute"} ${inSeconds} ${
      inSeconds > 1 ? "Seconds" : "Second"
    })`;
  } else {
    return `${inHours}:${leadingZeros(inMinutes)}:${leadingZeros(
      inSeconds
    )} (${inHours} ${inHours > 1 ? "Hours" : "Hour"} ${inMinutes} ${
      inMinutes > 1 ? "Minutes" : "Minute"
    } ${inSeconds} ${inSeconds > 1 ? "Seconds" : "Second"})`;
  }
}

function mainTemplate() {
  return (infoWrapper.innerHTML = `
  <div class="info-box result">
      <div>
          <strong>Estimated reading time:</strong>
          <span class="result-text">0 hours, 0 minutes, 0 seconds</span>
      </div>
  </div>
  <div class="info-box details">
      <ul>
          <li><strong>Words Count:</strong>0 Word</li>
          <li><strong>Letters Count:</strong>0 Letter</li>
      </ul>
    </div>
  `);
}

function showDetails(formatTime, wordLength, lettersLength) {
  return `
  <div class="info-box result">
      <div>
          <strong>Estimated reading time:</strong>
          <span class="result-text">${formatTime}</span>
      </div>
  </div>
  <div class="info-box details">
    <ul>
        <li><strong>Words Count:</strong>${wordLength} ${
    wordLength > 1 ? "Words" : "Word"
  }
         </li>
        <li><strong>Letters Count:</strong>${lettersLength} ${
    lettersLength > 1 ? "Letters" : "Letter"
  }     </li>
    </ul>
  </div>
  `;
}

function showError() {
  return `
  <div class="info-box result warn">
      <div>
          Please type/paste your text to estimate the reading time.
      </div>
  </div>
  <div class="info-box details">
    <ul>
        <li><strong>Words Count:</strong>0 Word</li>
        <li><strong>Letters Count:</strong>0 Letter</li>
    </ul>
  </div>
  `;
}

function calcReadingAverage(timeUnitInMinutes = 1) {
  let averagePerMinute = 200;
  let wordLength = textarea.value.trim().replace(/\s+/g, " ").split(" ").length;
  let lettersLength = textarea.value.trim().replace(/\s+/g, "").split("")
    .length;

  if (wordLength === 1 && textarea.value.length === 0) {
    infoWrapper.innerHTML = showError();
  } else {
    let time = (wordLength * (timeUnitInMinutes * 60)) / averagePerMinute;
    infoWrapper.innerHTML = showDetails(
      formatTime(time),
      wordLength,
      lettersLength
    );
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  calcReadingAverage();
});

form.addEventListener("reset", () => {
  mainTemplate();
  // Reset textarea height
  textarea.style.height = "auto";
});

window.addEventListener("DOMContentLoaded", () => {
  mainTemplate();
});
