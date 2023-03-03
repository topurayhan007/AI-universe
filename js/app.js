// modal-description         (text)
// modal-integration-list    (list container)
// modal-feature-list        (list container)
// basic-price               (text)
// pro-price                 (text)
// enterprise-price          (text)
// btn-show-all              (btn)
// btn-sort                  (btn)
// btn-accuracy              (btn)

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  const cardSection = document.getElementById("card-section");

  if (isLoading) {
    loaderSection.classList.remove("hidden");
    cardSection.classList.add("hidden");
  } else {
    loaderSection.classList.add("hidden");
    cardSection.classList.remove("hidden");
  }
};

const loadAIs = async (sort, index) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  // console.log("asdsa", url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.tools);
    if (sort) {
      data.data.tools.sort(
        (date1, date2) =>
          new Date(date1.published_in) - new Date(date2.published_in)
      );
    }
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
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  const btn = document.getElementById("btn-sort");
  if (btn.dataset.status === "true") {
    loadAIs(true);
  } else {
    loadAIs(false);
  }
});

const loadAIdetails = async (id) => {
  const modal = document.getElementById("my-modal");
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
  basic.innerText = `${
    data.pricing === null ||
    data.pricing[0].price === "No cost" ||
    data.pricing[0].price === "0"
      ? "Free of Cost/"
      : data.pricing[0].price.replace("/", "/\n")
  }`;

  const pro = document.getElementById("pro-price");
  pro.innerText = `${
    data.pricing === null ||
    data.pricing[1].price === "No cost" ||
    data.pricing[1].price === "0"
      ? "Free of Cost/"
      : data.pricing[1].price.replace("/", "/\n")
  }`;

  const enterprise = document.getElementById("enterprise-price");
  enterprise.innerText = `${
    data.pricing === null ||
    data.pricing[2].price === "No cost" ||
    data.pricing[2].price === "0"
      ? "Free of Cost/"
      : data.pricing[2].price.slice(0, 10).replace(" ", "\n")
  }`;

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
  const integrations = `${
    data.integrations === null
      ? "No Data Found"
      : returnFeatureList(data.integrations)
  }`;
  integrationList.innerHTML = integrations;

  // Image
  const image = document.getElementById("modal-image");
  image.src = data.image_link[0];

  // Accuracy
  const accuracyDiv = document.getElementById("btn-accuracy");
  if (data.accuracy.score) {
    accuracyDiv.innerText = data.accuracy.score * 100 + "% accuracy";
    accuracyDiv.classList.remove("hidden");
  } else {
    accuracyDiv.classList.add("hidden");
  }

  // Input Output examples
  const input = document.getElementById("input-question");
  // console.log(data.input_output_examples[0].input);
  input.innerText = `${
    data.input_output_examples === null
      ? "Can you give any example?"
      : data.input_output_examples[1].input
  }`;

  const output = document.getElementById("output-answer");
  // console.log(data.input_output_examples[0].input);
  output.innerText = `${
    data.input_output_examples === null
      ? "No! Not Yet! Take a break!!!"
      : data.input_output_examples[1].output
  }`;
};

document.getElementById("btn-sort").addEventListener("click", function () {
  const btn = document.getElementById("btn-sort");
  btn.dataset.status = "true";
  loadAIs(true, 6);
});

document
  .getElementById("btn-modal-close")
  .addEventListener("click", function () {
    const modal = document.getElementById("my-modal");
    modal.classList.add("hidden");
  });

loadAIs(false, 6);
