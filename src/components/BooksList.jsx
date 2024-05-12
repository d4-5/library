import Spinner from "./Spinner";
import BookItem from "./BookItem"
import { useState, useEffect } from "react";
import { getAllBooksRequest, searchBooksRequest, deleteBookRequest } from "../api";

const BooksList = ({ search }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let ok, books;
                if (search === "") {
                    ({ ok, books } = await getAllBooksRequest());
                } else {
                    ({ ok, books } = await searchBooksRequest(search));
                }

                if (ok) {
                    setBooks(books);
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        fetchData();
    }, [search]);

    const updateList = async (ok, id) => {
        if (ok) {
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } else {
            console.log("Error updating book list");
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th >
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr >
                </thead >
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-3 text-center"> <Spinner /> </td>
                        </tr>
                    ) : (
                        books.map((book, index) => (
                            <BookItem
                                key={book.id}
                                index={index + 1}
                                book={book}
                                updateList={updateList}
                                deleteBookRequest={deleteBookRequest} />
                        ))
                    )}
                </tbody>
            </table >
        </div >
    )
}

export default BooksList;