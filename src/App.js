import {useState, useEffect} from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

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

    return (
        <div className={'app'}>
            <h1>Reading List</h1>
            <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;