document.addEventListener("DOMContentLoaded", () => {
    fetchCaseStudiesIndex();
});

async function fetchCaseStudiesIndex() {
    const container = document.querySelector(".case-studies-container");
    if (!container) return;

    const query = `*[_type == "caseStudy"] | order(coalesce(publishedAt, _createdAt) desc) {
        title,
        summary,
        mainImage{asset->{url}},
        _id
    }`;

    const data = await fetchSanityData(query);
    if (!data) return;

    container.innerHTML = data.map(caseStudy => `
        <div class="case-study">
            <a href="./case-study.html?id=${caseStudy._id}">
                ${caseStudy.mainImage ? `<img class="preview-image" src="${caseStudy.mainImage.asset.url}" alt="${caseStudy.title}">` : ""}
                <h3>${caseStudy.title}</h3>
                <p>${caseStudy.summary ?? "No summary available."}</p>
            </a>
        </div>
    `).join('');
}