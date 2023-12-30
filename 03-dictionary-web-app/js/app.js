const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".dict-input-word");
const themeChangeIcon = document.getElementById("theme-icon");

// After DOM load, set default theme.
document.addEventListener("DOMContentLoaded", setInitialTheme);
document.addEventListener("DOMContentLoaded", () => {
  handleSelectChange("Sans serif");
});

// Event listeners
themeChangeIcon.addEventListener("change", toggleTheme);

searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    callApi();
  }
});

searchIcon.addEventListener("click", function () {
  callApi();
});

function callApi() {
  const word = document.querySelector(".dict-input-word").value.trim();

  if (!word) {
    return;
  }
  fetchWordDefinition(word);
}

function clearContainer() {
  const container = document.getElementById("data-container");

  // Remove existing children
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function fetchWordDefinition(word) {
  if (!word) {
    throw new Error("You must provide a word");
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  clearContainer();
  showSpinner();

  setTimeout(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        parseData(word, data);
        hideSpinner();
      })
      .catch((error) => {
        showErrorMessage(error);
        hideSpinner();
      });
  }, 2000);
}

function showErrorMessage(error) {
  const container = document.getElementById("data-container");
  clearContainer();

  let errorContainer = document.createElement("div");
  errorContainer.classList.add("error-container");
  container.appendChild(errorContainer);

  let headingEl = document.createElement("h1");
  headingEl.textContent = "No Definitions Found";
  errorContainer.appendChild(headingEl);

  let errorMessageEl = document.createElement("p");
  errorMessageEl.textContent =
    "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.";
  errorContainer.appendChild(errorMessageEl);
}

function parseData(searchWord, data) {
  // Access the first element
  let firstElement = data[0];

  // Access properties of the first element
  let word = firstElement.word;
  let phonetic = firstElement.phonetic;
  let phonetics = firstElement.phonetics;
  let origin = firstElement.origin;
  let meanings = firstElement.meanings;

  // Access nested data
  let firstPhoneticText = phonetics[0].text;
  let firstMeaningPartOfSpeech = meanings[0].partOfSpeech;

  console.log("Word:", word);
  console.log("Phonetic:", phonetic);
  console.log("Origin:", origin);

  console.log(phonetics);

  phonetics.forEach((p) => {
    if (p.text === undefined) {
      return;
    }

    console.log("Phonetic Text:", p.text);
    if (p.audio) {
      console.log("Audio URL:", p.audio);
    }
  });

  meanings.forEach((m) => {
    console.log("Part of Speech:", m.partOfSpeech);
    m.definitions.forEach((d) => {
      console.log("Definition:", d.definition);
      if (d.example) {
        console.log("Example:", d.example);
      }
    });
  });

  renderData(searchWord, data);
}

function renderData(searchWord, data) {
  const container = document.getElementById("data-container");
  clearContainer();

  // Add search word
  let searchWordEl = document.createElement("h1");
  searchWordEl.textContent = `${searchWord}`;
  container.appendChild(searchWordEl);

  data.forEach((item) => {
    i = 0;

    // Process and append phonetics
    item.phonetics.forEach((phonetic) => {
      i++;

      if (phonetic.text === undefined) {
        return;
      }

      // If audio not present, ignore.
      if (!phonetic.audio) {
        return;
      }

      // Add phonetic
      let phoneticLine = document.createElement("div");
      phoneticLine.classList.add("phonetic-line");
      container.appendChild(phoneticLine);

      let phoneticEl = document.createElement("p");
      phoneticEl.textContent = `${phonetic.text}`;
      phoneticLine.appendChild(phoneticEl);

      if (phonetic.audio) {
        let audioEl = document.createElement("audio");
        audioEl.setAttribute("controls", "");
        let sourceEl = document.createElement("source");
        sourceEl.setAttribute("src", phonetic.audio);
        sourceEl.setAttribute("type", "audio/mpeg");
        audioEl.appendChild(sourceEl);
        phoneticLine.appendChild(audioEl);

        // Add an element which will be used for smaller screens.
        let audioEl2 = document.createElement("div");
        audioEl2.classList.add("audio-small-screen");
        phoneticLine.appendChild(audioEl2);

        let audioSmall = document.createElement("audio");
        audioSmall.id = "audio-small-" + i;
        audioEl2.appendChild(audioSmall);

        let sourceSmall = document.createElement("source");
        sourceSmall.setAttribute("src", phonetic.audio);
        sourceSmall.setAttribute("type", "audio/mpeg");
        audioSmall.appendChild(sourceSmall);

        let svgImage = document.createElement("img");
        svgImage.classList.add("playButton");
        svgImage.id = "playButton-" + i;
        svgImage.setAttribute("src", "./assets/images/icon-play.svg");
        audioEl2.appendChild(svgImage);

        svgImage.addEventListener("click", function (event) {
          let elementId = event.target.id;
          let id = elementId.split("-")[1];

          let audio = document.getElementById("audio-small-" + id);

          if (audio.paused) {
            audio.play();
            this.textContent = "Pause";
          } else {
            audio.pause();
            this.textContent = "Play";
          }
        });
      }
    });

    // Process and append meanings
    item.meanings.forEach((meaning) => {
      let partOfSpeechWrapper = document.createElement("div");
      partOfSpeechWrapper.classList.add("part-of-speech-wrapper");
      container.appendChild(partOfSpeechWrapper);

      // Part of Speech
      let partOfSpeechEl = document.createElement("div");
      partOfSpeechWrapper.appendChild(partOfSpeechEl);
      partOfSpeechEl.classList.add("part-of-speech");

      let partOfSpeechHeading = document.createElement("h3");
      partOfSpeechHeading.textContent = `${meaning.partOfSpeech}`;
      partOfSpeechEl.appendChild(partOfSpeechHeading);

      let hLine = document.createElement("div");
      hLine.classList.add("h-line");
      partOfSpeechEl.appendChild(hLine);

      // Add "Meaning"
      let meaningEl = document.createElement("p");
      meaningEl.classList.add("meaning");
      meaningEl.textContent = "Meaning";
      partOfSpeechWrapper.appendChild(meaningEl);

      // This is a Unordered list.
      let definitionParent = document.createElement("ul");
      partOfSpeechWrapper.appendChild(definitionParent);

      meaning.definitions.forEach((definition) => {
        let definitionEl = document.createElement("li");
        definitionParent.appendChild(definitionEl);

        let para = document.createElement("p");
        para.textContent = `${definition.definition}`;
        definitionEl.appendChild(para);

        if (definition.example) {
          let exampleEl = document.createElement("p");
          exampleEl.classList.add("example");
          exampleEl.textContent = `"${definition.example}"`;
          definitionEl.appendChild(exampleEl);
        }
      });
    });

    // Add a divider for readability if there are multiple entries
    let dividerEl = document.createElement("hr");
    container.appendChild(dividerEl);
  });
}

function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

document
  .getElementById("font-selection-dropdown")
  .addEventListener("change", function () {
    handleSelectChange(this.value);
  });

function handleSelectChange(selectedValue) {
  fontName = "Inter";

  if (selectedValue === "Serif") {
    fontName = "Lora";
  } else if (selectedValue === "Sans serif") {
    fontName = "Inter";
  } else {
    fontName = "Inconsolata";
  }

  // Select all elements in the body
  var allElements = document.body.getElementsByTagName("*");

  // Loop through all elements and change their font
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.fontFamily = fontName;
  }
}

function toggleTheme() {
  const lightTheme = document.getElementById("light-theme");
  const darkTheme = document.getElementById("dark-theme");

  if (this.checked) {
    darkTheme.disabled = false;
    lightTheme.disabled = true;
  } else {
    darkTheme.disabled = true;
    lightTheme.disabled = false;
  }
}

function setInitialTheme() {
  const lightTheme = document.getElementById("light-theme");
  const darkTheme = document.getElementById("dark-theme");

  darkTheme.disabled = true;
  lightTheme.disabled = false;
}
