export function formatTimeSlot(timeValue) {
  // If already formatted like "10 am" or "3 pm", just return it
  if (typeof timeValue === 'string' && /am|pm/i.test(timeValue)) {
    return timeValue.toLowerCase();
  }

  // Otherwise, try to parse as date
  const date = new Date(timeValue);
  if (isNaN(date)) return timeValue; // invalid date fallback

  // Convert UTC to readable time (fix timezone issue)
  let hour = date.getUTCHours();
  let suffix = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;
  return `${hour} ${suffix}`;
}
