const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour: "numeric", minute: "numeric", hour12:true});

export function reformatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

export function formatTimestampToDay(timestamp: number): string {
  let day = "";
  if (timestamp) {
    day = DAY_FORMATTER.format(timestamp);
  }
  return day;
}

export function formatTimestampToNumericHour(timestamp: number): string {
  let hour = "";
  if(timestamp){
    hour = HOUR_FORMATTER.format(timestamp);
  }

  return hour;
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-UK',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}

export function dynamicSort(property:any) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a:any,b:any) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}
