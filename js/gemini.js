// gemini.js

class GeminiService {

    static async searchRoadConstruction(coordinates, roadAddress) {

        const apiKey = await StorageManager.getApiKey();

        if (!apiKey) {
            throw new Error(
                "Gemini API key not found."
            );
        }

        const prompt = buildPrompt(
            coordinates,
            roadAddress
        );

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },

                body: JSON.stringify({

                    model: "gemini-2.5-flash",

                    input: prompt,

                    tools: [
                        {
                            type: "google_search"
                        }
                    ]

                })
            }
        );

        const data = await response.json();

        console.log(
            "Gemini Interaction Response:",
            data
        );

        if (!response.ok) {

            throw new Error(
                data.error?.message ||
                JSON.stringify(data, null, 2)
            );

        }

        // Find the final text output

        let outputText = "";

        if (data.output_text) {

            outputText = data.output_text;

        } else if (Array.isArray(data.outputs)) {

            for (
                let i = data.outputs.length - 1;
                i >= 0;
                i--
            ) {

                const output =
                    data.outputs[i];

                if (
                    output &&
                    typeof output.text === "string"
                ) {

                    outputText =
                        output.text;

                    break;

                }

            }

        }

        if (!outputText) {

            console.error(
                "Full Gemini response:",
                data
            );

            throw new Error(
                "Gemini returned no usable text."
            );

        }

        console.log(
            "Gemini Output:",
            outputText
        );

        // Try to parse JSON

        let result;

        try {

            result =
                JSON.parse(outputText);

        } catch (error) {

            /*
             * Gemini may return JSON inside
             * markdown code fences.
             */

            const cleaned =
                outputText
                    .replace(
                        /^```json\s*/i,
                        ""
                    )
                    .replace(
                        /^```\s*/i,
                        ""
                    )
                    .replace(
                        /\s*```$/i,
                        ""
                    )
                    .trim();

            try {

                result =
                    JSON.parse(cleaned);

            } catch (secondError) {

                console.error(
                    "Gemini raw output:",
                    outputText
                );

                throw new Error(
                    "Gemini returned an invalid result."
                );

            }

        }

        return result;

    }

}