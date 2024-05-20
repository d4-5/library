const url = "https://library-server.azurewebsites.net"

const getAllBooksRequest = async () => {
    const response = await fetch(url + `/api/books`);
    const books = await response.json();
    return { response: response.status, books: books };
};

const getBookRequest = async ({ params }) => {
    const response = await fetch(url + `/api/books/${params.id}`);
    const book = await response.json();
    return { response: response.status, book: book };
};

const addBookRequest = async (newBook) => {
    const response = await fetch(url + '/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
    });
    return response.status;
};

const deleteBookRequest = async (id) => {
    const response = await fetch(url + `/api/books/${id}`, {
        method: 'DELETE',
    });
    return response.status;
};

const editBookRequest = async (updatedBook) => {
    console.log(updatedBook)
    const response = await fetch(url + `/api/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
    });
    return response.status;
};

const searchBooksRequest = async (query) => {
    const response = await fetch(url + `/api/books/search?query=${query}`, {
        method: 'GET',
    });
    const books = await response.json();
    return { response: response.status, books: books };
};

export { getAllBooksRequest, getBookRequest, addBookRequest, deleteBookRequest, editBookRequest, searchBooksRequest }