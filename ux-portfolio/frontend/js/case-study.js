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
        document.getElementById("case-title-header").textContent = caseStudy.title ?? "Uten tittel";
        if (!caseStudy) {
            container.innerHTML = "<p>Failed to load case study.</p>";
            return;
        }

        container.innerHTML = `
            ${caseStudy.mainImage ? `<img class="banner-image" src="${caseStudy.mainImage.asset.url}" alt="${caseStudy.title}">` : ""}
            <p><strong>Kort oppsummering:</strong> ${caseStudy.summary ?? "No summary available."}</p>

            <div class="gallery-wrapper">
                <div class="process-gallery">
                    ${caseStudy.processImages
                        ? caseStudy.processImages.map((img, index) =>
                            `<img src="${img.asset.url}" alt="Prosessbilde ${index + 1}" data-index="${index}" class="process-image">`
                        ).join('')
                        : ""}
                </div>
            </div>
            <p><strong>Generell oversikt:</strong> ${caseStudy.overview ?? "No overview available."}</p>
            <p><strong>Bedriftssammendrag:</strong> ${caseStudy.companySummary ?? "No company summary available."}</p>
            <p><strong>Utfordringen:</strong> ${caseStudy.challenge ?? "No challenge information available."}</p>
            <p><strong>Mitt bidrag:</strong> ${caseStudy.contribution ?? "No contribution details available."}</p>
            <p><strong>Brukerinnsikt:</strong> ${caseStudy.userResearch ?? "No user research available."}</p>
            <p><strong>Prosess:</strong> ${caseStudy.process ?? "No process details available."}</p>
            <p><strong>Resultater og vekst:</strong> ${caseStudy.resultsGrowth ?? "No results information available."}</p>
        `;

        const galleryImages = document.querySelectorAll(".process-image");
        galleryImages.forEach(img => {
            img.addEventListener("click", () => openLightbox(img));
        });

        if (!caseStudy.processImages || caseStudy.processImages.length === 0) {
            const galleryWrapper = document.querySelector(".gallery-wrapper");
            if (galleryWrapper) {
                galleryWrapper.style.display = "none";
            }
        }
        
        if (caseStudy.processImages && caseStudy.processImages.length > 0) {
            const gallery = document.querySelector(".process-gallery");
            const images = gallery.querySelectorAll(".process-image");
        }
    } catch (error) {
        console.error("Error fetching case study:", error);
        container.innerHTML = "<p>Failed to load case study.</p>";
    }
}

function openLightbox(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
