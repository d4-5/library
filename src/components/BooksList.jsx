import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import BookItem from "./BookItem";
import { getAllBooksRequest, searchBooksRequest, deleteBookRequest } from "../api";
import { toast } from "react-toastify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const BooksList = ({ search }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let response, books;
                if (search === "") {
                    ({ response, books } = await getAllBooksRequest());
                } else {
                    ({ response, books } = await searchBooksRequest(search));
                }

                if (response === 200) {
                    setBooks(books);
                    setLoading(false);
                } else {
                    toast.error("Виникла помилка");
                }
            } catch (error) {
                toast.error("Виникла помилка");
            }
        };

        fetchData();
    }, [search]);

    const updateList = async (ok, id) => {
        if (ok) {
            toast.success("Книжку було успішно видалено");
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } else {
            toast.error("Виникла помилка. Спробуйте пізніше");
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedBooks = () => {
        if (sortConfig.direction === 'asc') {
            return books.sort((a, b) => (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1))
        }
        return books.sort((a, b) => (a[sortConfig.key] > b[sortConfig.key] ? -1 : 1))
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        <th scope="col" className="px-6 py-3 w-64 min-w-64" onClick={() => handleSort('title')}>
                            <div className="flex items-center">
                                Назва
                                {sortConfig && sortConfig.key === 'title' && (
                                    sortConfig.direction === 'asc' ? <FaArrowDown /> : <FaArrowUp />
                                )}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 w-64 min-w-64" onClick={() => handleSort('authorSurname')}>
                            <div className="flex items-center">
                                Автор
                                {sortConfig && sortConfig.key === 'authorSurname' && (
                                    sortConfig.direction === 'asc' ? <FaArrowDown /> : <FaArrowUp />
                                )}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 w-64 min-w-64" onClick={() => handleSort('year')}>
                            <div className="flex items-center">
                                Рік видання
                                {sortConfig && sortConfig.key === 'year' && (
                                    sortConfig.direction === 'asc' ? <FaArrowDown /> : <FaArrowUp />
                                )}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 w-64 min-w-64" onClick={() => handleSort('quantity')}>
                            <div className="flex items-center">
                                Кількість
                                {sortConfig && sortConfig.key === 'quantity' && (
                                    sortConfig.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />
                                )}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-3 items-center"> <Spinner /> </td>
                        </tr>
                    ) : (
                        sortedBooks().map((book, index) => (
                            <BookItem
                                key={book.id}
                                index={index + 1}
                                book={book}
                                updateList={updateList} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BooksList;