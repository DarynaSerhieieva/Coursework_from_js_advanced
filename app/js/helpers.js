function getCorrectDate(date) {
    return `${(date<10?'0':'') + date}`;
}

export function getDate() {
    return `${getCorrectDate(new Date().getDate())}/${getCorrectDate(new Date().getMonth()+1)}/${new Date().getFullYear()} ${new Date().getHours()}:${getCorrectDate(new Date().getMinutes())}`;
};

export function validateErrors(arr, len = 2) {
    arr.forEach(input => {
        input.classList.remove('error');
        if (input.value.length < len ) {
            input.classList.add('error');
        }
    });
}