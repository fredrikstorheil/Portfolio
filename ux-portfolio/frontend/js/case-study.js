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
            <div class="tldr-box">
                <p><strong>Kort oppsummering:</strong> ${caseStudy.summary ?? "No summary available."}</p>
            </div>
            <p class="gallery-instruction">Klikk på et bilde for å forstørre og navigere mellom dem</p>
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
        enableArrowScrollInGallery();

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

// Variables to keep track of lightbox state and images
let currentLightboxIndex = 0;
let lightboxImages = [];

function openLightbox(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    // Get all process images in array
    lightboxImages = Array.from(document.querySelectorAll(".process-image"));
    // Set current index for navigation
    currentLightboxIndex = lightboxImages.indexOf(img);
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";

    // Add keyboard navigation listener
    document.addEventListener("keydown", handleLightboxKey);
}

function handleLightboxKey(event) {
    const lightboxImg = document.getElementById("lightbox-img");
    if (event.key === "ArrowRight") {
        // Move to next image if possible
        if (currentLightboxIndex < lightboxImages.length - 1) {
            currentLightboxIndex++;
            lightboxImg.src = lightboxImages[currentLightboxIndex].src;
        }
    } else if (event.key === "ArrowLeft") {
        // Move to previous image if possible
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            lightboxImg.src = lightboxImages[currentLightboxIndex].src;
        }
    } else if (event.key === "Escape") {
        closeLightbox();
    }
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    // Remove keyboard navigation listener
    document.removeEventListener("keydown", handleLightboxKey);
}

function navigateLightbox(direction) {
    const lightboxImg = document.getElementById("lightbox-img");
    const newIndex = currentLightboxIndex + direction;
    if (newIndex >= 0 && newIndex < lightboxImages.length) {
        currentLightboxIndex = newIndex;
        lightboxImg.src = lightboxImages[currentLightboxIndex].src;
    }
}

function enableArrowScrollInGallery() {
    const gallery = document.querySelector(".process-gallery");
    if (!gallery) return;

    document.addEventListener("keydown", function (e) {
        // Skip if lightbox is open
        if (document.getElementById("lightbox").style.display === "flex") return;

        const scrollAmount = gallery.querySelector(".process-image")?.offsetWidth || 200;

        if (e.key === "ArrowRight") {
            gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
        } else if (e.key === "ArrowLeft") {
            gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    });
}
