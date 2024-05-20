import { Link } from 'react-router-dom'
import { getAuthorInitials } from '../utils';
import { deleteBookRequest } from '../api';

const BookItem = ({ index, book, updateList }) => {
    const handleRemove = async () => {
        try {
            const response = await deleteBookRequest(book.id)
            if (response === 200) {
                updateList(true, book.id);
            } else {
                updateList(false, book.id);
            }
        } catch (error) {
            updateList(false, book.id);
        }
    };

    return (
        <tr key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{index}</td>
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.title}</th>
            <td className="px-6 py-4">{getAuthorInitials(book.authorName, book.authorSurname, book.authorPatronymic)}</td>
            <td className="px-6 py-4">{book.year}</td>
            <td className="px-6 py-4">{book.quantity}</td>
            <td className="flex items-center px-6 py-4">
                <Link to={`/edit-book/${book.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Редагувати</Link>
                <button type="button"
                    onClick={handleRemove}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Видалити
                </button>
            </td>
        </tr>
    )
}

export default BookItem;
