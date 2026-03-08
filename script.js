function syncSemanticalCocoonsCalendar() {
  const SHEET_NAME = "URLs PricingHUB";
  const EVENT_TITLE = "Semantical Cocoons";

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error("Sheet not found: " + SHEET_NAME);

  const calendar = CalendarApp.getDefaultCalendar();
  const tz = Session.getScriptTimeZone();

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("No data found in sheet.");
    return;
  }

  // Read columns F..H (F = URL, H = Date)
  const data = sheet.getRange(2, 6, lastRow - 1, 3).getValues();

  // 1) Build desired state from Sheet: { dateKey -> {date, urls[]} }
  const desiredByDate = {};
  data.forEach(row => {
    const url = row[0];      // F
    const rawDate = row[2];  // H
    if (!url || !rawDate) return;

    const date = new Date(rawDate);
    if (isNaN(date)) return;

    const dateKey = Utilities.formatDate(date, tz, "yyyy-MM-dd");
    if (!desiredByDate[dateKey]) desiredByDate[dateKey] = { date, urls: [] };
    desiredByDate[dateKey].urls.push(url);
  });

  // 2) Load existing "Semantical Cocoons" events (bounded window for performance)
  //    Adjust the window if you need more/less.
  const windowStart = new Date(new Date().getFullYear() - 1, 0, 1); // Jan 1 last year
  const windowEnd   = new Date(new Date().getFullYear() + 2, 11, 31); // Dec 31 in 2 years

  const existing = calendar
    .getEvents(windowStart, windowEnd)
    .filter(e => e.getTitle() === EVENT_TITLE);

  // Group existing events by dateKey => [events...]
  const existingByDate = {};
  existing.forEach(e => {
    const dateKey = Utilities.formatDate(e.getStartTime(), tz, "yyyy-MM-dd");
    if (!existingByDate[dateKey]) existingByDate[dateKey] = [];
    existingByDate[dateKey].push(e);
  });

  // 3) For each date in desired state:
  //    - If multiple events exist that day: keep one, delete others
  //    - Update kept event description (or create if none exists)
  Object.entries(desiredByDate).forEach(([dateKey, payload]) => {
    const description = payload.urls.map((u, i) => `${i + 1}. ${u}`).join("\n");

    const eventsThatDay = existingByDate[dateKey] || [];

    if (eventsThatDay.length === 0) {
      // create new
      calendar.createAllDayEvent(EVENT_TITLE, payload.date, { description });
      return;
    }

    // keep the earliest-created-like (we approximate by earliest start time)
    eventsThatDay.sort((a, b) => a.getStartTime().getTime() - b.getStartTime().getTime());
    const keeper = eventsThatDay[0];

    // update keeper
    keeper.setAllDayDate(payload.date);
    keeper.setDescription(description);

    // delete duplicates
    for (let i = 1; i < eventsThatDay.length; i++) {
      eventsThatDay[i].deleteEvent();
    }
  });

  // 4) Delete obsolete events (dates that exist in calendar but not in sheet)
  Object.entries(existingByDate).forEach(([dateKey, eventsThatDay]) => {
    if (desiredByDate[dateKey]) return; // still needed

    // date no longer present in sheet => remove all events that day
    eventsThatDay.forEach(e => e.deleteEvent());
  });

  SpreadsheetApp.getUi().alert("✅ Calendar synced (duplicates removed).");
}
