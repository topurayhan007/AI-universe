// modal-description         (text)
// modal-integration-list    (list container)
// modal-feature-list        (list container)
// basic-price               (text)
// pro-price                 (text)
// enterprise-price          (text)
// btn-show-all              (btn)
// btn-sort                  (btn)
// btn-accuracy              (btn)

const loadAIs = async (index) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  // console.log("asdsa", url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.tools);
    displayAIs(data.data.tools, index);
  } catch (error) {
    console.log(error);
  }
};

const returnFeatureList = (data) => {
  // Added the features here into an array then joined all without comma
  const featuresArr = [];
  data.forEach((feature) => {
    const str = `<li>${feature}</li>`;
    featuresArr.push(str);
  });
  const features = featuresArr.join("");
  return features;
};

const displayAIs = (tools, index) => {
  const aiContainer = document.getElementById("ais-container");
  const cardSection = document.getElementById("card-section");
  const showAllButton = document.getElementById("btn-show-all");

  aiContainer.innerHTML = "";

  // console.log(index, tools.length);

  if (tools && index < tools.length) {
    tools = tools.slice(0, index);
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  tools.forEach((tool) => {
    const aiDiv = document.createElement("div");

    const features = returnFeatureList(tool.features);
    // console.log(features);

    aiDiv.innerHTML = `
    <div
            class="max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow p-4"
          >
            <img
              class="rounded-lg"
              src="${tool.image}"
              alt=""
            />

            <div class="pt-4">
              <h5
                class="mb-2 text-2xl font-semibold tracking-tight text-gray-900"
              >
                Features
              </h5>

              <ol class="list-decimal leading-relaxed list-inside mb-4 font-normal text-gray-400">
                ${features}
              </ol> 
                
                           

              <hr class="border" />

              <div class="flex items-center mt-4 justify-between">
                <div>
                  <h5
                    class="mb-3 text-2xl font-semibold tracking-tight text-gray-900"
                  >
                    ${tool.name}
                  </h5>
                  <div class="flex items-center gap-2 text-gray-400">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p class="text-sm">${tool.published_in}</p>
                  </div>
                </div>

                <!-- Modal Button -->
                <button
                  
                  data-modal-target="medium-modal"
                  data-modal-toggle="medium-modal"
                  data-modal-placement="center-center"
                  onclick="loadAIdetails('${tool.id}')"
                  class="bg-[#FEF7F7] block rounded-full p-4"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="#EB5757"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
    `;

    aiContainer.appendChild(aiDiv);
  });

  // stop spinner

  toggleSpinner(false);
  cardSection.classList.remove("hidden");
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  loadAIs();
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};

const loadAIdetails = async (id) => {
  const modal = document.getElementById("medium-modal");
  modal.classList.remove("hidden");

  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data);
  displayAIdetails(data.data);
};

const displayAIdetails = (data) => {
  // console.log(data);
  const aiDescription = document.getElementById("modal-description");
  aiDescription.innerText = data.description;

  // Pricing
  const basic = document.getElementById("basic-price");
  // Features
  const featureList = document.getElementById("modal-feature-list");
  const featureArr = [];
  for (feature in data.features) {
    const str = `<li>${data.features[feature].feature_name}</li>`;
    featureArr.push(str);
  }
  const features = featureArr.join("");
  featureList.innerHTML = features;

  // Integrations
  const integrationList = document.getElementById("modal-integration-list");
  const integrations = returnFeatureList(data.integrations);
  integrationList.innerHTML = integrations;

  // Accuracy
  const accuracyDiv = document.getElementById("btn-accuracy");
  if (data.accuracy.score) {
    accuracyDiv.innerText = data.accuracy.score * 100 + "% accuracy";
    accuracyDiv.classList.remove("hidden");
  } else {
    accuracyDiv.classList.add("hidden");
  }
};

// document
//   .getElementById("btn-modal-close")
//   .addEventListener("click", function () {
//     const modal = document.getElementById("medium-modal");
//     modal.classList.add("hidden");
//   });

loadAIs(6);
