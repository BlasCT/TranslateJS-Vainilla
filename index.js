//selects
const targetLanguage = document.querySelector("#target-language");
const sourceLanguage = document.querySelector("#source-language");

//textTarea
const sourceText = document.querySelector("#source-text");
const targetText = document.querySelector("#target-text");

//button
const btnTranslate = document.querySelector("#btn-translate");

async function getLanguages() {
  const responsive = await fetch(
    "https://text-translator2.p.rapidapi.com/getLanguages",
    {
      headers: {
        "X-RapidAPI-Key": "9adfc01899msh75d1ba4c9cb389bp1c6f57jsn756d6fd1f92a",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
    }
  );

  const data = await responsive.json();
  const languages = data.data.languages;
  renderLanguages(languages, sourceLanguage);
  renderLanguages(languages, targetLanguage);
}

getLanguages();

function renderLanguages(languages, select) {
  languages.forEach((language) => {
    select.innerHTML += `<option value="${language.code}">${language.name}</option>`;
  });
}

btnTranslate.addEventListener("click", async () => {
 
  if (!sourceLanguage.value || !targetLanguage.value || !sourceText.value)
    return;

  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", sourceLanguage.value);
  encodedParams.append("target_language", targetLanguage.value);
  encodedParams.append("text", sourceText.value);

  const response = await fetch(
    "https://text-translator2.p.rapidapi.com/translate",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "9adfc01899msh75d1ba4c9cb389bp1c6f57jsn756d6fd1f92a",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: encodedParams,
    }
  );

  const data = await response.json();
  targetText.textContent = data.data.translatedText
});
