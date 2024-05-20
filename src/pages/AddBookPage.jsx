import QuantitySelector from "../components/QuantitySelector";
import { useState } from "react";
import { addBookRequest } from "../api";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const AddBookPage = () => {
    const currentYear = new Date().getFullYear();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        authorName: "",
        authorSurname: "",
        authorPatronymic: "",
        year: currentYear,
        quantity: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await addBookRequest(formData);
                if (response === 201) {
                    toast.success("Книжку було успішно додано");
                } else if (response == 409) {
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

    return (
        <>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
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
                        min="1"
                        max={currentYear}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                        Додати Книгу
                    </button>
                    {isLoading && <Spinner />}
                </div>
            </form>
        </>
    );
};

export default AddBookPage;
