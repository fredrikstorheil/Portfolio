const projectId = "8njc2y4b"; // Your Sanity project ID
const dataset = "production"; // Your dataset
const sanityAPI = `https://${projectId}.api.sanity.io/v2023-03-07/data/query/${dataset}`;

async function fetchSanityData(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `${sanityAPI}?query=${encodedQuery}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.result) throw new Error("No data found");
        return data.result;
    } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        return null;
    }
}