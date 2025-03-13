const projectId = "8njc2y4b"; // Your Sanity project ID
const dataset = "production"; // Your dataset

// Sanity API URL
const sanityAPI = `https://${projectId}.api.sanity.io/v2023-03-07/data/query/${dataset}`;

// Corrected Query Encoding
const queryIndex = `*[_type == "caseStudy"] | order(coalesce(publishedAt, _createdAt) desc) {
    title,
    summary,
    mainImage{asset->{url}},
    _id
}`;
const queryFull = `*[_type == "caseStudy"] | order(coalesce(publishedAt, _createdAt) desc) {
    title,
    summary,
    overview,
    companySummary,
    challenge,
    contribution,
    userResearch,
    process,
    resultsGrowth,
    publishedAt,
    _createdAt,
    mainImage{asset->{url}},
    processImages[]{asset->{url}}
}`;
async function fetchCaseStudies() {
    const container = document.querySelector(".case-studies-container");

    if (!container) {
        console.error("Error: .case-studies-container not found in the DOM.");
        return;
    }

    const isIndexPage = document.body.classList.contains("index-page");
    const query = isIndexPage ? queryIndex : queryFull;
    const encodedQuery = encodeURIComponent(query);
    const url = `${sanityAPI}?query=${encodedQuery}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched case studies (debug):", JSON.stringify(data.result, null, 2)); // ✅ Log API response

        if (!data.result || data.result.length === 0) {
            console.warn("No case studies found in API response.");
            return;
        }

        container.innerHTML = ""; // Clear existing content

        data.result.forEach(caseStudy => {
            const div = document.createElement("div");
            div.classList.add("case-study");

            if (isIndexPage) {
                div.innerHTML = `
                    <a href="case-study.html?id=${caseStudy._id}">
                        ${caseStudy.mainImage ? `<img class="preview-image" src="${caseStudy.mainImage.asset.url}" alt="${caseStudy.title}">` : ""}
                        <h3>${caseStudy.title}</h3>
                        <p>${caseStudy.summary ?? "No summary available."}</p>
                    </a>
                `;
            } else {
                div.innerHTML = `
                    <h3>${caseStudy.title}</h3>
                    ${caseStudy.mainImage ? `<img class="banner-image" src="${caseStudy.mainImage.asset.url}" alt="${caseStudy.title}">` : ""}
                    <p><strong>Short Summary:</strong> ${caseStudy.summary ?? "No summary available."}</p>
                    <p><strong>General Overview:</strong> ${caseStudy.overview ?? "No overview available."}</p>
                    <p><strong>Company Summary:</strong> ${caseStudy.companySummary ?? "No company summary available."}</p>
                    <p><strong>The Challenge:</strong> ${caseStudy.challenge ?? "No challenge information available."}</p>
                    <p><strong>My Contribution:</strong> ${caseStudy.contribution ?? "No contribution details available."}</p>
                    <p><strong>User Research:</strong> ${caseStudy.userResearch ?? "No user research available."}</p>
                    <p><strong>Process:</strong> ${caseStudy.process ?? "No process details available."}</p>
                    <div class="process-gallery">
                        ${caseStudy.processImages ? caseStudy.processImages.map(img => `<img src="${img.asset.url}" alt="Process Image">`).join('') : ""}
                    </div>
                    <p><strong>Results & Growth:</strong> ${caseStudy.resultsGrowth ?? "No results information available."}</p>
                    <p><strong>Date:</strong> ${caseStudy.publishedAt ? new Date(caseStudy.publishedAt).toLocaleDateString() : new Date(caseStudy._createdAt).toLocaleDateString()}</p>
                `;
            }

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