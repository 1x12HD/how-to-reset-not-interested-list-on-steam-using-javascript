(async function() {
    // Define constants
    const PAUSE_INTERVAL = 500;
    const STEAM_API_URL = "https://store.steampowered.com";
    const NOT_INTERESTED_LIST_ENDPOINT = "/dynamicstore/userdata";
    const REMOVE_APP_ENDPOINT = "/recommended/ignorerecommendation/";

    try {
        // Function to reset the 'Not Interested' list
        async function resetNotInterestedList() {
            // Fetch the list of ignored apps
            const ignoredApps = await fetchIgnoredApps();

            // Calculate the total number of items in the list
            const totalItems = ignoredApps.length;

            // Display a message if the list is empty
            if (totalItems === 0) {
                alert("Your 'Not Interested' list is empty.");
                return;
            }

            // Confirm with the user before proceeding
            const approval = confirm(`You are about to remove ${totalItems} games from your 'Not Interested' list. Proceed?`);

            // If the user cancels, stop the process
            if (!approval) {
                return;
            }

            // Start removing apps from the list
            await removeAppsFromList(ignoredApps);
        }

        // Function to fetch the list of ignored apps
        async function fetchIgnoredApps() {
            const response = await fetch(`${STEAM_API_URL}${NOT_INTERESTED_LIST_ENDPOINT}?t=${new Date().getTime()}`);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to retrieve 'Not Interested' list.");
            }

            const data = await response.json();
            return Object.keys(data.rgIgnoredApps);
        }

        // Function to remove apps from the list
        async function removeAppsFromList(appList) {
            for (let i = 0; i < appList.length; i++) {
                try {
                    // Remove each app from the list
                    await removeAppFromList(appList[i]);

                    // Log the progress
                    console.log(`Removed ${i + 1}/${appList.length} items`);

                    // Pause for the specified interval
                    await sleep(PAUSE_INTERVAL);
                } catch (error) {
                    console.error("An error occurred while removing an item:", error.message);
                }
            }

            // Display a message when all items are removed
            alert("All items cleared from 'Not Interested' list.");
        }

        // Function to remove a single app from the list
        async function removeAppFromList(appId) {
            const formData = new FormData();
            formData.append("sessionid", g_sessionID);
            formData.append("appid", appId);
            formData.append("remove", 1);
            formData.append("snr", "1_account_notinterested_");

            // Make a POST request to remove the app
            const response = await fetch(`${STEAM_API_URL}${REMOVE_APP_ENDPOINT}`, {
                method: "POST",
                body: formData,
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to remove an item from 'Not Interested' list.");
            }
        }

        // Function to pause execution for a specified duration
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Additional code and features can be added here to extend the length further

        // Example feature: Display a summary of removed apps
        function displaySummary(removedCount) {
            const summaryMessage = `Successfully removed ${removedCount} apps from the list.`;
            console.log(summaryMessage);
            alert(summaryMessage);
        }

        // Example feature: Log session information
        function logSessionInfo(sessionID) {
            console.log(`Session ID: ${sessionID}`);
        }

        // Example feature: Log the current time
        function logCurrentTime() {
            const currentTime = new Date().toLocaleString();
            console.log(`Current Time: ${currentTime}`);
        }

        // Example feature: Perform some additional operations

        // Start the process by invoking the resetNotInterestedList function
        resetNotInterestedList();

        // Return a message indicating that the code is running (optional)
        return "Running...";
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
})();
