import {createContext, useState, useCallback} from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    }, [])

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });

        console.log(response);
        const update = [
            ...books,
            response.data
        ]
        setBooks(update);
        console.log(books)
    };

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`,
            {
                title: newTitle,
            });

        const update = books.map((book) => {
            if (book.id === id) {
                return {...book, ...response.data};
            }
            return book;
        });

        setBooks(update);
    }

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
        const update = books.filter((book) => {
            return book.id !== id;
        })
        setBooks(update)
    }

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };

    return(
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
    );
}

export {Provider};
export default BooksContext;