const projectId = "8njc2y4b"; // Your Sanity project ID
const dataset = "production"; // Your dataset

// Sanity API URL
const sanityAPI = `https://${projectId}.api.sanity.io/v2023-03-07/data/query/${dataset}`;

// Optimized API query for case studies
const query = encodeURIComponent(`*[_type == "caseStudy"] | order(date desc) {title, overview, mainImage{asset->{url}}}`);

async function fetchCaseStudies() {
    const container = document.querySelector(".case-studies-container"); // Updated to select class

    if (!container) {
        console.error("Error: .case-studies-container not found in the DOM.");
        return;
    }

    const url = `${sanityAPI}?query=${query}`;

    try {
        const response = await fetch(url);
        const { result } = await response.json();

        container.innerHTML = ""; // Clear existing content

        result.forEach(caseStudy => {
            const div = document.createElement("div");
            div.classList.add("case-study");

            div.innerHTML = `
                <h3>${caseStudy.title}</h3>
                <p>${caseStudy.overview ?? "No description available."}</p>
                ${caseStudy.mainImage ? `<img src="${caseStudy.mainImage.asset.url}" alt="${caseStudy.title}">` : ""}
            `;

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching case studies:", error);
    }
}

// Ensure DOM is loaded before running the function
document.addEventListener("DOMContentLoaded", () => {
    fetchCaseStudies();
});