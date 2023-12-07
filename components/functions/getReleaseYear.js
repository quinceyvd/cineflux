export const getReleaseYear = (date) => {
    // Get release year from date string
    if (date) {
      return date.substring(0, 4);
    }
    return '';
  }