const getAuthorInitials = (authorName, authorSurname, authorPatronymic) => {
    let initials = authorSurname + ' ';

    if (authorName) {
        initials += authorName.charAt(0) + '. ';
    }
    if (authorPatronymic) {
        initials += authorPatronymic.charAt(0) + '.';
    }
    return initials;

};

export { getAuthorInitials }