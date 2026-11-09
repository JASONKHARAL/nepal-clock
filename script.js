
const NepaliDate = window.NepaliDate;

const timezone = "Asia/Kathmandu";

function getNepalParts() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const get = (type) => Number(
    parts.find(p => p.type === type).value
  );

  return {
    year: get("year"),
    month: get("month") - 1,
    day: get("day")
  };
}

function updateClock() {
  const now = new Date();

  // Nepal time
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).format(now);

  document.getElementById("time").textContent = time;
  document.getElementById("ampm").textContent = "NEPAL TIME";

  // English date in Nepal timezone
  const englishDate = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(now);

  document.getElementById("englishDate").textContent =
    englishDate;

  // Convert Nepal's calendar date to Bikram Sambat
  if (!NepaliDate) {
    throw new Error("Nepali date library did not load");
  }

  const { year, month, day } = getNepalParts();

  // Build date from Nepal calendar date components
  const nepalCalendarDate = new Date(year, month, day);

  const bsDate = new NepaliDate(nepalCalendarDate);

  document.getElementById("nepaliDate").textContent =
    bsDate.format("DD MMMM YYYY", "np");

  document.getElementById("nepaliDay").textContent =
    bsDate.format("ddd", "np");
}

// Update every second
updateClock();
setInterval(updateClock, 1000);
