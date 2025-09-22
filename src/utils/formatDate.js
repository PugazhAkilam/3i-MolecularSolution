export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export const formatTo12Hour = (isoString) => {
    // Return an empty string if the input is not a valid string or is empty
    if (typeof isoString !== 'string' || !isoString.trim()) {
        return "";
    }
    
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Get the hour from the Date object in local time
    let hours = date.getHours();
    
    // Get the minutes and pad with a leading zero if necessary
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    // Determine the AM/PM suffix
    const suffix = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    // The hour '0' should be '12'
    hours = hours === 0 ? 12 : hours;

    // Return the formatted string with minutes
    return `${hours}:${minutes} ${suffix}`;
};

//console.log(formatDate("2025-08-15T00:00:00.000Z")); // 15-Aug-25
