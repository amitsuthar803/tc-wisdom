const container = document.querySelector(".container");
const fixedHeading = document.querySelector(".fixed-heading");
let targetScroll = 0;

function snapToSection() {
  const sectionHeight = container.clientHeight;
  const scrollTop = container.scrollTop;
  const sectionIndex = Math.round(scrollTop / sectionHeight);
  targetScroll = sectionIndex * sectionHeight;

  container.scrollTo({
    top: targetScroll,
    behavior: "auto", // Instant snapping
  });
}

let isScrolling;
container.addEventListener("scroll", () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    snapToSection();
  }, 20); // Reduced delay for quicker snap
});

// app.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const fixedHeading = document.querySelector(".fixed-heading");

  function updateHeadingRotation() {
    const section2 = document.querySelector(".section2");
    const section3 = document.querySelector(".section3");
    const section2Top = section2.offsetTop;
    const section2Height = section2.offsetHeight;
    const section3Top = section3.offsetTop;
    const section3Height = section3.offsetHeight;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;

    // Calculate trigger points
    const triggerPoint =
      section2Top + section2Height * 0.6 - containerHeight / 2;
    const reverseTriggerPoint =
      section3Top + section3Height * 0.8 - containerHeight / 2;

    if (scrollTop >= triggerPoint && scrollTop < section3Top) {
      // When scrolling down past the trigger point in Section 2 and before Section 3
      fixedHeading.style.transform = "translate(-200%, -100%) rotate(-90deg)"; // Rotate and move to the left
    } else if (scrollTop >= section3Top && scrollTop < reverseTriggerPoint) {
      // When scrolling down in Section 3
      fixedHeading.style.transform = "translate(-200%, -100%) rotate(-90deg)"; // Maintain the rotation and position
    } else if (scrollTop < reverseTriggerPoint) {
      // When scrolling up and crossing the 80% point of Section 3
      fixedHeading.style.transform = "translate(-50%, -100%) rotate(0deg)"; // Reset to initial position
    }
  }

  container.addEventListener("scroll", updateHeadingRotation);

  // Initial check in case the page is loaded with scroll position
  updateHeadingRotation();
});
