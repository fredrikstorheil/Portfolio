document.addEventListener("DOMContentLoaded", () => {
    fetchCaseStudyDetail();
});

async function fetchCaseStudyDetail() {
    const container = document.querySelector(".case-study-container");
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const caseStudyId = urlParams.get("id");
    if (!caseStudyId) {
        container.innerHTML = "<p>Case study not found.</p>";
        return;
    }

    const query = `*[_type == "caseStudy" && _id == "${caseStudyId}"][0] {
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

    try {
        const caseStudy = await fetchSanityData(query);
        if (!caseStudy) {
            container.innerHTML = "<p>Failed to load case study.</p>";
            return;
        }

        container.innerHTML = `
            <h2>${caseStudy.title}</h2>
            ${caseStudy.mainImage ? `<img class="banner-image" src="${caseStudy.mainImage.asset.url}" alt="${caseStudy.title}">` : ""}
            <p><strong>Kort oppsummering:</strong> ${caseStudy.summary ?? "No summary available."}</p>
            <p><strong>Generell oversikt:</strong> ${caseStudy.overview ?? "No overview available."}</p>
            <p><strong>Bedriftssammendrag:</strong> ${caseStudy.companySummary ?? "No company summary available."}</p>
            <p><strong>Utfordringen:</strong> ${caseStudy.challenge ?? "No challenge information available."}</p>
            <p><strong>Mitt bidrag:</strong> ${caseStudy.contribution ?? "No contribution details available."}</p>
            <p><strong>Brukerinnsikt:</strong> ${caseStudy.userResearch ?? "No user research available."}</p>
            <p><strong>Prosess:</strong> ${caseStudy.process ?? "No process details available."}</p>
            <div class="process-gallery">
                ${caseStudy.processImages ? caseStudy.processImages.map(img => `<img src="${img.asset.url}" alt="Process Image">`).join('') : ""}
            </div>
            <p><strong>Resultater og vekst:</strong> ${caseStudy.resultsGrowth ?? "No results information available."}</p>
            <p><strong>Dato:</strong> ${caseStudy.publishedAt ? new Date(caseStudy.publishedAt).toLocaleDateString() : new Date(caseStudy._createdAt).toLocaleDateString()}</p>
        `;
    } catch (error) {
        console.error("Error fetching case study:", error);
        container.innerHTML = "<p>Failed to load case study.</p>";
    }
}
