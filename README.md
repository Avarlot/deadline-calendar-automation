# Deadline Calendar Automation

This project uses Google Apps Script to automatically create and update Google Calendar events from deadlines entered in Google Sheets.

## Overview

Managing project deadlines across multiple tools can make it difficult to maintain clear visibility on upcoming tasks.  
During project discussions, deadlines may change frequently, which makes it easy to lose track of updates.

This automation helps centralize deadline tracking by generating Google Calendar events directly from a Google Sheet.

The goal is to simplify project follow-up and reduce the risk of missing important deadlines.

## Features

- Automatically creates Google Calendar events from Google Sheets deadlines
- Avoids duplicate events when the script is run multiple times
- Updates existing calendar events when deadlines are modified
- Allows users to manually trigger the synchronization directly from Google Sheets
- Uses a button in the sheet to easily run the automation after project updates

## How It Works

1. A user fills a Google Sheet with task information.
2. The sheet must contain:
   - Task name
   - Deadline
   - Task description
3. When deadlines are updated (for example after a meeting or project discussion), the user triggers the script by clicking a button in the Google Sheet.
4. The script reads the rows of the sheet.
5. For each row, the script creates or updates the corresponding Google Calendar event.

The event created in Google Calendar contains:

- **Event title** → task name  
- **Event date** → task deadline  
- **Event description** → task description  

This allows teams to keep their calendar synchronized with project deadlines stored in the spreadsheet.

## Example Sheet Structure

| Task | Deadline | Description |
|-----|-----|-----|
| Prepare client report | 2026-04-01 | Compile analytics data and finalize slides |
| Product demo | 2026-04-05 | Demo new features to potential client |

## Technologies Used

- Google Sheets  
- Google Apps Script  
- Google Calendar API  

## Use Cases

This automation is useful for:

- Project management
- Operational follow-ups
- Deadline tracking
- Task visibility across teams

## Possible Improvements

Future improvements could include:

- Adding reminders or notifications
- Supporting multiple calendars
