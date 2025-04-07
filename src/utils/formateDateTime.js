export function formatDateTime(date) {
    if (!date) return null;
    
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, '0');
  
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1); // Months are zero-indexed
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const seconds = pad(d.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }