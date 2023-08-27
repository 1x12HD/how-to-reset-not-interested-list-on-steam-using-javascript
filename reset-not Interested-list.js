(function() {
    // Define the interval between each request (in milliseconds)
    const PAUSE_INTERVAL = 500;

    // Function to reset the 'Not Interested' list
    async function resetNotInterestedList() {
        try {
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
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    }

    // Function to fetch the list of ignored apps
    async function fetchIgnoredApps() {
        try {
            // Make a GET request to retrieve the list
            const response = await fetch("https://store.steampowered.com/dynamicstore/userdata?t=" + new Date().getTime());

            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to retrieve 'Not Interested' list.");
            }

            // Parse the JSON response and extract the app IDs
            const data = await response.json();
            return Object.keys(data.rgIgnoredApps);
        } catch (error) {
            throw new Error("Error fetching 'Not Interested' list: " + error.message);
        }
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
        try {
            // Create a form data object with the necessary parameters
            const formData = new FormData();
            formData.append("sessionid", g_sessionID);
            formData.append("appid", appId);
            formData.append("remove", 1);
            formData.append("snr", "1_account_notinterested_");

            // Make a POST request to remove the app
            const response = await fetch("https://store.steampowered.com/recommended/ignorerecommendation/", {
                method: "POST",
                body: formData,
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to remove an item from 'Not Interested' list.");
            }
        } catch (error) {
            throw new Error("Error removing app from 'Not Interested' list: " + error.message);
        }
    }

    // Function to pause execution for a specified duration
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Start the process by invoking the resetNotInterestedList function
    resetNotInterestedList();

    // Return a message indicating that the code is running (optional)
    return "Running...";
})();