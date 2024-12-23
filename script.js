// Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");
// Ensuring the DOM is fully loaded before attaching events
document.addEventListener('DOMContentLoaded', function() {
  
  // Variables for envelope and notes
  const envelopUpPaper = document.querySelector('.js-up-paper');
  const notes = document.querySelectorAll('.js-note');
  
  // Function to open the letterbox
  function openLetterBox() {
    gsap.to(envelopUpPaper, {
      bottom: "1%",
      duration: 0.5,
      onComplete: showNotes
    });
  }

  // Function to display the notes after the envelope opens
  function showNotes() {
    gsap.to(".js-envelop-content", {
      height: "110%",
      duration: 0.5
    });

    // Attach click events for each note
    notes.forEach((note, index) => {
      note.addEventListener("click", () => {
        toggleNoteHeight(note, index);
      });
    });
  }

  // Function to toggle the height of the notes based on screen size
  function toggleNoteHeight(note, index) {
    const mobileMediaQuery = window.matchMedia("(max-width: 400px)");
    const tabletMediaQuery = window.matchMedia("(min-width: 400px) and (max-width: 600px)");

    if (note.classList.contains("active")) {
      note.classList.remove("active");
      gsap.set(note, { height: "30%", clearProps: "all" });
    } else {
      resetNotes(); // Reset all notes before opening the clicked one
      note.classList.add("active");

      if (mobileMediaQuery.matches) {
        gsap.set(note, { height: 125 + 40 * index + "%" });
      } else if (tabletMediaQuery.matches) {
        gsap.set(note, { height: 80 + 21 * index + "%" });
      } else {
        gsap.set(note, { height: 70 + 20 * index + "%" });
      }
    }
  }

  // Function to reset all notes to their default state
  function resetNotes() {
    notes.forEach(note => {
      if (note.classList.contains("active")) {
        note.classList.remove("active");
        gsap.set(note, { height: "30%", clearProps: "all" });
      }
    });
  }

  // Event listener to open the letterbox when the user clicks the up paper
  envelopUpPaper.addEventListener('click', openLetterBox);
});

// Function to reset the size of the notes
function resize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

// Main function to enable all notes
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      let index = Array.from(notes).indexOf(this); // Get the index of the clicked note

      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          resize_notes(); // Reset all notes first
          this.classList.add("active");
          gsap.to(this, {
            height: 125 + 40 * index + "%",
            duration: 0.5
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          resize_notes();
          this.classList.add("active");
          gsap.to(this, {
            height: 80 + 21 * index + "%",
            duration: 0.5
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          resize_notes();
          this.classList.add("active");
          gsap.to(this, {
            height: 70 + 20 * index + "%",
            duration: 0.5
          });
        }
      }
    });
  }
}

// Function to set up the up paper of the envelope
function set_up_paper() {
  const arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

// Function to start the up paper transition
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Function to allow cutting the sticker
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

// Event listener for sticker click
document.querySelector(".js-sticker").addEventListener("click", sticker);

// Resize event that resets the size of the notes
window.onresize = function (event) {
  resize_notes();
};
