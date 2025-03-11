// ✅ Replace with your actual project ID from Sanity
const projectId = "8njc2y4b"; // Your Sanity project ID
const dataset = "production"; // Your dataset

// Sanity API URL
const sanityAPI = `https://${projectId}.api.sanity.io/v2023-03-07/data/query/${dataset}`;

// Function to fetch and display case studies
async function fetchCaseStudies() {
    const query = encodeURIComponent(`*[_type == "caseStudy"]{title, overview, mainImage{asset->{url}}}`);
    const url = `${sanityAPI}?query=${query}`;

    try {
        const response = await fetch(url);
        const { result } = await response.json();
        
        const container = document.getElementById("case-studies-container");
        container.innerHTML = ""; // Clear existing content

        result.forEach(caseStudy => {
            const div = document.createElement("div");
            div.classList.add("case-study");

            div.innerHTML = `
                <h3>${caseStudy.title}</h3>
                <p>${caseStudy.overview}</p>
                ${caseStudy.mainImage ? `<img src="${caseStudy.mainImage.asset.url}" alt="${caseStudy.title}">` : ""}
            `;

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching case studies:", error);
    }
}

// Function to fetch and display About Me section
async function fetchAbout() {
    const query = encodeURIComponent(`*[_type == "about"]{bio, photo{asset->{url}}}`);
    const url = `${sanityAPI}?query=${query}`;

    try {
        const response = await fetch(url);
        const { result } = await response.json();

        const container = document.getElementById("about-container");
        container.innerHTML = ""; // Clear existing content

        result.forEach(about => {
            const div = document.createElement("div");

            div.innerHTML = `
                <p>${about.bio}</p>
                ${about.photo ? `<img src="${about.photo.asset.url}" alt="Profile Photo">` : ""}
            `;

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching about data:", error);
    }
}

// ✅ Fetch data when the page loads
fetchCaseStudies();
fetchAbout();