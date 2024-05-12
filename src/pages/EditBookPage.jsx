import QuantitySelector from "../components/QuantitySelector"
import { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { editBookRequest } from "../api";

const EditBookPage = () => {
    const { ok, book } = useLoaderData();
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [quantity, setQuantity] = useState(book.quantity);

    const { id } = useParams();
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        const updatedBook = {
            id,
            title,
            author,
            quantity,
        };

        const ok = editBookRequest(updatedBook);
        if (ok) {
            console.log("Updated")
        }
        return navigate("/")
    };

    return (
        <form className="max-w-sm mx-auto" onSubmit={submitForm}>
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Title"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Author"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Quantity
                </label>
                <QuantitySelector
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Edit Book
            </button>
        </form>
    );
};

export default EditBookPage;