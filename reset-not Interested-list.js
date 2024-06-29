(async function() {
    // Set up important constants
    const PAUSE_INTERVAL = 500; // Time to wait between removing games (in milliseconds)
    const STEAM_API_URL = "https://store.steampowered.com";
    const NOT_INTERESTED_LIST_ENDPOINT = "/dynamicstore/userdata";
    const REMOVE_APP_ENDPOINT = "/recommended/ignorerecommendation/";

    // Helper function to pause execution
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to get the list of games you're not interested in
    async function getNotInterestedGames() {
        console.log("Fetching your 'Not Interested' list...");
        const response = await fetch(`${STEAM_API_URL}${NOT_INTERESTED_LIST_ENDPOINT}?t=${new Date().getTime()}`);
        if (!response.ok) {
            throw new Error("Couldn't get the 'Not Interested' list. Please try again later.");
        }
        const data = await response.json();
        return Object.keys(data.rgIgnoredApps);
    }

    // Function to remove a single game from the 'Not Interested' list
    async function removeGameFromList(gameId) {
        console.log(`Removing game with ID ${gameId}...`);
        const formData = new FormData();
        formData.append("sessionid", g_sessionID);
        formData.append("appid", gameId);
        formData.append("remove", 1);
        formData.append("snr", "1_account_notinterested_");

        const response = await fetch(`${STEAM_API_URL}${REMOVE_APP_ENDPOINT}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to remove game ${gameId}. Skipping to next game.`);
        }
    }

    // Function to remove all games from the 'Not Interested' list
    async function removeAllGames(gameList) {
        console.log("Starting to remove games...");
        for (let i = 0; i < gameList.length; i++) {
            try {
                await removeGameFromList(gameList[i]);
                console.log(`Removed ${i + 1} out of ${gameList.length} games`);
                await sleep(PAUSE_INTERVAL); // Wait a bit to avoid overwhelming Steam's servers
            } catch (error) {
                console.error(error.message);
            }
        }
        console.log("Finished removing all games!");
        alert("All games have been removed from your 'Not Interested' list.");
    }

    // Main function to reset the 'Not Interested' list
    async function resetNotInterestedList() {
        try {
            // Get the list of games you're not interested in
            const notInterestedGames = await getNotInterestedGames();

            // Check if the list is empty
            if (notInterestedGames.length === 0) {
                alert("Your 'Not Interested' list is already empty.");
                return;
            }

            // Ask for confirmation before proceeding
            const userWantsToRemove = confirm(`You're about to remove ${notInterestedGames.length} games from your 'Not Interested' list. Do you want to continue?`);
            
            if (userWantsToRemove) {
                // If user confirms, start removing games
                await removeAllGames(notInterestedGames);
            } else {
                console.log("Operation cancelled by user.");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
            alert("Something went wrong. Please try again later.");
        }
    }

    // Start the process
    console.log("Starting the process to reset your 'Not Interested' list...");
    await resetNotInterestedList();
    console.log("Process completed.");

})();