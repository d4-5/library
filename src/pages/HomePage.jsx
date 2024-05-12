import BooksList from "../components/BooksList"
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
    const [search, setSearch] = useOutletContext();
    return (
        <BooksList search={search} />
    )
}

export default HomePage