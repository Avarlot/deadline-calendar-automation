# Setup Guide

This guide explains how to install and use the Google Apps Script contained in this repository.

⚠️ Important:  
This script was built for a specific spreadsheet structure.  
If your Google Sheet uses different columns or a different sheet name, you will need to adapt the script accordingly.

## 1. Prepare Your Google Sheet

Create a Google Sheet containing the data you want to track.

The current script expects the following structure:

| Column | Content |
|------|------|
| F | URL / task item |
| G | Optional column |
| H | Deadline date |

The script reads data starting from **row 2**, which means **row 1 should contain headers**.

## 2. Check the Sheet Name

The script currently reads data from a sheet called:

const SHEET_NAME = "URLs PricingHUB";

If your sheet uses a different name, update this value in the script.

## 3. Open Google Apps Script

In your Google Sheet:

Extensions → Apps Script

## 4. Add the Script

Copy the code from the `script.js` file in this repository and paste it into the Apps Script editor.

Save the script.

## 5. Adapt the Script if Your Columns Are Different

The script reads the following range:

const data = sheet.getRange(2, 6, lastRow - 1, 3).getValues();

Meaning:

- start at row 2
- start at column 6 (column F)
- read 3 columns (F to H)

In the script:

- column F contains the URL
- column H contains the deadline date

If your spreadsheet uses different columns, update these values accordingly.

## 6. Authorize Permissions

Run the script once from the Apps Script editor and approve access to Google Calendar.

## 7. Add a Button in Google Sheets

Insert a drawing or button in the sheet.

Assign the following function to it:

syncSemanticalCocoonsCalendar

Clicking the button will run the synchronization.

## 8. Run the Synchronization

1. Update the sheet data
2. Click the button
3. The script will synchronize Google Calendar

## 9. Workflow

This script uses a manual synchronization approach.

Calendar events are not automatically updated when the spreadsheet changes.

Instead:
- update deadlines in the sheet
- click the button
- calendar events are refreshed
