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
                <button class="prev-btn" aria-label="Forrige bilde">&#8592;</button>
                <div class="process-gallery">
                    ${caseStudy.processImages
                        ? caseStudy.processImages.map((img, index) =>
                            `<img src="${img.asset.url}" alt="Prosessbilde ${index + 1}" data-index="${index}" class="process-image">`
                        ).join('')
                        : ""}
                </div>
                <button class="next-btn" aria-label="Neste bilde">&#8594;</button>
            </div>
            <p><strong>Generell oversikt:</strong> ${caseStudy.overview ?? "No overview available."}</p>
            <p><strong>Bedriftssammendrag:</strong> ${caseStudy.companySummary ?? "No company summary available."}</p>
            <p><strong>Utfordringen:</strong> ${caseStudy.challenge ?? "No challenge information available."}</p>
            <p><strong>Mitt bidrag:</strong> ${caseStudy.contribution ?? "No contribution details available."}</p>
            <p><strong>Brukerinnsikt:</strong> ${caseStudy.userResearch ?? "No user research available."}</p>
            <p><strong>Prosess:</strong> ${caseStudy.process ?? "No process details available."}</p>
            <p><strong>Resultater og vekst:</strong> ${caseStudy.resultsGrowth ?? "No results information available."}</p>
    
        `;
        if (caseStudy.processImages && caseStudy.processImages.length > 0) {
            const gallery = document.querySelector(".process-gallery");
            const images = gallery.querySelectorAll(".process-image");
            const prevBtn = document.querySelector(".prev-btn");
            const nextBtn = document.querySelector(".next-btn");

            let currentIndex = 0;

            function updateGalleryView() {
                images.forEach((img, index) => {
                    img.classList.toggle("active", index === currentIndex);
                });
                if (images[currentIndex]) {
                    images[currentIndex].scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                }

                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex === images.length - 1;
            }

            prevBtn.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateGalleryView();
                }
            });

            nextBtn.addEventListener("click", () => {
                if (currentIndex < images.length - 1) {
                    currentIndex++;
                    updateGalleryView();
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
                    currentIndex++;
                    updateGalleryView();
                } else if (e.key === "ArrowLeft" && currentIndex > 0) {
                    currentIndex--;
                    updateGalleryView();
                }
            });

            updateGalleryView();
        }
    } catch (error) {
        console.error("Error fetching case study:", error);
        container.innerHTML = "<p>Failed to load case study.</p>";
    }
}
