import QuantitySelector from "../components/QuantitySelector";
import { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { editBookRequest } from "../api";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const EditBookPage = () => {
    const { ok, book } = useLoaderData();
    const [isLoading, setIsLoading] = useState(false);
    const currentYear = new Date().getFullYear();
    const [formData, setFormData] = useState({
        title: book.title,
        authorName: book.authorName,
        authorSurname: book.authorSurname,
        authorPatronymic: book.authorPatronymic,
        year: book.year,
        quantity: book.quantity,
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "year") {
            newValue = Math.min(currentYear, parseInt(value, 10) || 1);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            const updatedBook = {
                id,
                ...formData,
            };

            try {
                const response = await editBookRequest(updatedBook);
                if (response === 200) {
                    toast.success("Запис успішно відредаговано");
                    return navigate("/")
                } else if (response === 409) {
                    toast.error("Запис з такою книжкою вже існує");
                } else {
                    toast.error("Виникла помилка. Спробуйте пізніше");
                }
            } catch (error) {
                toast.error("Виникла помилка. Спробуйте пізніше");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <form className="max-w-sm mx-auto" onSubmit={submitForm}>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Назва
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Назва"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="authorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ім'я
                    </label>
                    <input
                        type="text"
                        id="authorName"
                        name="authorName"
                        value={formData.authorName}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Ім'я"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="authorSurname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Прізвище
                    </label>
                    <input
                        type="text"
                        id="authorSurname"
                        name="authorSurname"
                        value={formData.authorSurname}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Прізвище"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="authorPatronymic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        По батькові
                    </label>
                    <input
                        type="text"
                        id="authorPatronymic"
                        name="authorPatronymic"
                        value={formData.authorPatronymic}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="По батькові"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Рік видання
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Рік видання"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Кількість екземплярів
                    </label>
                    <QuantitySelector
                        value={formData.quantity}
                        onChange={(value) => setFormData((prevData) => ({ ...prevData, quantity: value }))}
                    />
                </div>
                <div className="flex items-center justify-between mb-5">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Редагувати
                    </button>
                    {isLoading && <Spinner />}
                </div>
            </form>
        </>
    );
};

export default EditBookPage;
