document.addEventListener("DOMContentLoaded", async () => {

    // ==============================
    // API ELEMENTS
    // ==============================

    const apiKeyInput =
        document.getElementById("apiKey");

    const saveBtn =
        document.getElementById("saveApiBtn");


    // ==============================
    // SEARCH ELEMENTS
    // ==============================

    const searchBtn =
        document.getElementById("searchBtn");

    const coordinatesInput =
        document.getElementById("coordinates");

    const roadAddressInput =
        document.getElementById("roadAddress");


    // ==============================
    // RESULT ELEMENTS
    // ==============================

    const constructionFound =
        document.getElementById("constructionFound");

    const startDate =
        document.getElementById("startDate");

    const endDate =
        document.getElementById("endDate");

    const impact =
        document.getElementById("impact");

    const confidence =
        document.getElementById("confidence");

    const summary =
        document.getElementById("summary");

    const sources =
        document.getElementById("sources");


    // ==============================
    // LOAD SAVED API KEY
    // ==============================

    const savedKey =
        await StorageManager.getApiKey();

    if (savedKey) {

        apiKeyInput.value = savedKey;

    }


    // ==============================
    // SAVE API KEY
    // ==============================

    saveBtn.addEventListener("click", async () => {

        const key =
            apiKeyInput.value.trim();

        if (!key) {

            alert(
                "Please enter your Gemini API Key."
            );

            return;

        }

        await StorageManager.saveApiKey(key);

        alert(
            "API Key saved successfully."
        );

    });


    // ==============================
    // SEARCH
    // ==============================

    searchBtn.addEventListener("click", async () => {

        const coordinates =
            coordinatesInput.value.trim();

        const roadAddress =
            roadAddressInput.value.trim();


        // Validate inputs

        if (!coordinates) {

            alert(
                "Please enter coordinates."
            );

            coordinatesInput.focus();

            return;

        }

        if (!roadAddress) {

            alert(
                "Please enter the road address."
            );

            roadAddressInput.focus();

            return;

        }


        // ==============================
        // LOADING STATE
        // ==============================

        searchBtn.disabled = true;

        searchBtn.textContent =
            "🔎 Searching...";

        constructionFound.textContent =
            "Searching...";

        startDate.textContent =
            "--";

        endDate.textContent =
            "--";

        impact.textContent =
            "--";

        confidence.textContent =
            "--";

        summary.textContent =
            "Gemini is researching official sources...";

        sources.textContent =
            "--";


        try {

            // Call Gemini

            const result =
                await GeminiService.searchRoadConstruction(
                    coordinates,
                    roadAddress
                );


            console.log(
                "Parsed Gemini Result:",
                result
            );


            // ==============================
            // DISPLAY RESULT
            // ==============================

            constructionFound.textContent =
                result.constructionFound
                    ? "YES"
                    : "NO";


            startDate.textContent =
                result.startDate || "Not verified";


            endDate.textContent =
                result.endDate || "Not verified";


            impact.textContent =
                result.impact || "Not specified";


            confidence.textContent =
                result.confidence || "Not specified";


            summary.textContent =
                result.summary || "No summary available.";


            // ==============================
            // DISPLAY SOURCES
            // ==============================

            sources.innerHTML = "";


            if (
                Array.isArray(result.sources) &&
                result.sources.length > 0
            ) {

                result.sources.forEach(
                    (source) => {

                        const sourceDiv =
                            document.createElement("div");

                        sourceDiv.style.marginBottom =
                            "10px";


                        const link =
                            document.createElement("a");

                        link.href =
                            source.url;

                        link.textContent =
                            source.title || source.url;

                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";

                        link.style.color =
                            "#1a73e8";

                        link.style.textDecoration =
                            "none";


                        sourceDiv.appendChild(
                            link
                        );

                        sources.appendChild(
                            sourceDiv
                        );

                    }
                );

            } else {

                sources.textContent =
                    "No sources returned.";

            }


        } catch (error) {

            console.error(
                "Search Error:",
                error
            );


            constructionFound.textContent =
                "ERROR";


            summary.textContent =
                error.message;


            sources.textContent =
                "Search failed.";


        } finally {

            searchBtn.disabled = false;

            searchBtn.textContent =
                "🔍 Search";

        }

    });

});