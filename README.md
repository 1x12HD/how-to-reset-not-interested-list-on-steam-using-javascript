# Steam 'Not Interested' List Clearing Tool

Welcome to the Steam 'Not Interested' List Clearing Tool! This script allows you to easily remove games from your 'Not Interested' list on the Steam platform. Follow the simple steps below to get started.

This tool is based on an original concept by Kevin Yew. The current version has been significantly expanded, with improved code and additional features.

## How It Works

1. **Fetching the List**: The script first retrieves the user's 'Not Interested' list from Steam's servers.

2. **User Confirmation**: It then asks for user confirmation, displaying the number of games to be removed.

3. **Removal Process**: If confirmed, the script proceeds to remove each game from the list one by one.

4. **Rate Limiting**: To avoid overwhelming Steam's servers, there's a short pause between each removal.

5. **Progress Updates**: The script provides console logs to show progress and any errors that occur.

6. **Completion**: Once finished, it alerts the user that all games have been removed.

## Usage

1. Open your web browser's console on the Steam store page. 
   - Chrome: Right-click > Inspect > Console
   - Firefox: Right-click > Inspect Element > Console

2. Copy the entire script and paste it into the console.

3. Press Enter to run the script.

4. Follow the on-screen prompts to confirm and complete the process.

## Important Notes

- This script requires you to be logged into your Steam account in the browser.
- It uses the `g_sessionID` variable, which should be automatically available when logged into Steam.
- The script respects Steam's systems by implementing pauses between actions.
- While efforts have been made to handle errors gracefully, use this script at your own risk.

## Disclaimer

This script is not officially associated with or endorsed by Steam or Valve Corporation. Use it responsibly and at your own discretion. The authors are not responsible for any unintended consequences of using this script.

## Contributing

Feel free to fork this project and submit pull requests with improvements or bug fixes. Issues and feature requests are also welcome in the project's issue tracker.
