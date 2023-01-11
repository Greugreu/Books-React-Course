import {useState} from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
    const [books, setBooks] = useState([]);

    const deleteBookById = (id) => {
        const update = books.filter((book) => {
            return book.id !== id;
        })
        setBooks(update)
    }

    const createBook = (title) => {
      const update = [
          ...books, {
          id: books.length+1,
          title
      }]
      setBooks(update);
      console.log(books)
    };

    const editBookById = (id, newTitle) => {
        const update = books.map((book) => {
            if (book.id === id) {
                return {...book, title: newTitle};
            }
            return book;
        });
        setBooks(update);
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