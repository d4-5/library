import { Link } from 'react-router-dom'

const BookItem = ({ index, book, updateList, deleteBookRequest }) => {
    const handleRemove = async () => {
        try {
            const ok = deleteBookRequest(book.id)
            updateList(ok, book.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <tr key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{index}</td>
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.title}</th>
            <td className="px-6 py-4">{book.author}</td>
            <td className="px-6 py-4">{book.quantity}</td>
            <td className="flex items-center px-6 py-4">
                <Link to={`/edit-book/${book.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                <button type="button"
                    onClick={handleRemove}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove
                </button>
            </td>
        </tr>
    )
}

export default BookItem;