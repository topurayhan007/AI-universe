// modal-integration-list    (list container)
// modal-feature-list        (list container)
// basic-price               (text)
// pro-price                 (text)
// enterprise-price          (text)
// btn-show-all              (btn)
// btn-sort                  (btn)

const loadAIs = async (index) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  // console.log("asdsa", url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.tools);
    displayAIs(data.data.tools, index);
  } catch (error) {
    console.log(error);
  }
};

const displayAIs = (tools, index) => {
  const aiContainer = document.getElementById("ais-container");
  const showAllButton = document.getElementById("btn-show-all");

  aiContainer.innerHTML = "";

  console.log(index, tools.length);

  if (tools && index < tools.length) {
    tools = tools.slice(0, index);
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  tools.forEach((tool) => {
    const aiDiv = document.createElement("div");

    // Added the feaatues here into an array then joined all without comma
    const featuresArr = [];
    tool.features.forEach((feature) => {
      const str = `<li>${feature}</li>`;
      featuresArr.push(str);
    });
    const features = featuresArr.join("");
    console.log(features);

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
                  class="bg-[#FEF7F7] rounded-full p-4"
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
  loadAIs();
});

loadAIs(6);
