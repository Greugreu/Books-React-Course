import { useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";
import useBookContext from "./hooks/useBookContext";

function App() {
    const { fetchBooks } = useBookContext(BooksContext);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);
    
    return (
        <div className={'app'}>
            <h1>Reading List</h1>
            <BookList />
            <BookCreate />
        </div>
    );
}

export default App;