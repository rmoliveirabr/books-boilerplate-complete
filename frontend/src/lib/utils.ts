// validate if a string is a valid date or datetime
export function isValidDate(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

// format date to YYYY-MM-DD, consider input date is in UTC
export function dateToString(date: Date):string {
    if (!date) return '';

    const day = String(date.getUTCDate()).padStart(2, '0'); 
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    // console.log('date:', date, ', day:', day, `${year}-${month}-${day}`)

    return `${year}-${month}-${day}`;
}

export function stringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Months are zero-based
}


// the return from an action function
export type State = {
    errors: boolean;
    message?: any;
};

// format a string with a date
export function formatDateString(dateString: string): string {
    const day = dateString.substring(8, 10);
    const month = dateString.substring(5, 7);
    const year = dateString.substring(0, 4);
    return year+'-'+month+'-'+day;
}

  