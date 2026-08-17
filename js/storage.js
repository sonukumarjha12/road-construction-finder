// storage.js

class StorageManager {

    static async saveApiKey(apiKey) {

        return new Promise((resolve) => {

            chrome.storage.local.set(
                {
                    geminiApiKey: apiKey
                },
                () => resolve(true)
            );

        });

    }

    static async getApiKey() {

        return new Promise((resolve) => {

            chrome.storage.local.get(
                ["geminiApiKey"],
                (result) => {

                    resolve(result.geminiApiKey || "");

                });

        });

    }

    static async clearApiKey() {

        return new Promise((resolve) => {

            chrome.storage.local.remove(
                "geminiApiKey",
                () => resolve(true)
            );

        });

    }

}