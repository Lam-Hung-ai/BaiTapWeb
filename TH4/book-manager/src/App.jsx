// import React, { useState, useEffect, useCallback } from 'react';
// import BookList from './components/BookList.jsx';
// import BookForm from './components/BookForm.jsx';

// // Hàm trợ giúp để tạo ID duy nhất
// const generateId = () => `book_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

// function App() {
//   const [books, setBooks] = useState(() => {
//     const storedBooks = localStorage.getItem('books');
//     try {
//       return storedBooks ? JSON.parse(storedBooks) : [];
//     } catch (error) {
//       console.error("Lỗi khi đọc sách từ localStorage:", error);
//       return [];
//     }
//   });

//   const [editingBook, setEditingBook] = useState(null);

//   useEffect(() => {
//     try {
//       localStorage.setItem('books', JSON.stringify(books));
//     } catch (error) {
//       console.error("Lỗi khi lưu sách vào localStorage:", error);
//     }
//   }, [books]);

//   const handleAddBook = useCallback((newBookData) => {
//     const completeNewBook = { id: generateId(), ...newBookData };
//     setBooks(prevBooks => [...prevBooks, completeNewBook]);
//     setEditingBook(null);
//   }, []);

//   const handleUpdateBook = useCallback((updatedBook) => {
//     setBooks(prevBooks =>
//       prevBooks.map(b => (b.id === updatedBook.id ? updatedBook : b))
//     );
//     setEditingBook(null);
//   }, []);

//   const handleDeleteBook = useCallback((id) => {
//     setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
//     if (editingBook && editingBook.id === id) {
//         setEditingBook(null);
//     }
//   }, [editingBook]);

//   const handleEditClick = useCallback((book) => {
//     setEditingBook(book);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);

//   return (
//     // Container chính, sẽ được căn giữa nếu Bootstrap CSS hoạt động
//     <div className="container py-4 py-md-5"> {/* Đảm bảo có class "container" ở đây */}
//       <header className="text-center mb-4 mb-md-5">
//         <h1 className="display-5 fw-bold">📚 Ứng dụng Quản lý Sách</h1>
//         <p className="lead text-secondary">
//           Sắp xếp danh sách đọc của bạn một cách dễ dàng.
//         </p>
//       </header>

//       <main>
//         {/* Row này sẽ căn giữa cột nội dung bên trong nó */}
//         <div className="row justify-content-center">
//           {/* Cột nội dung, giới hạn chiều rộng và được căn giữa bởi row cha */}
//           <div className="col-lg-8 col-xl-7"> {/* Giữ lại các class này để giới hạn chiều rộng và căn giữa */}
//             <BookForm
//               onAdd={handleAddBook}
//               onUpdate={handleUpdateBook}
//               editingBook={editingBook}
//               setEditingBook={setEditingBook}
//             />
//             <BookList
//               books={books}
//               onEdit={handleEditClick}
//               onDelete={handleDeleteBook}
//             />
//           </div>
//         </div>
//       </main>

//       <footer className="mt-5 pt-4 border-top text-center">
//         <p className="text-muted small">&copy; {new Date().getFullYear()} Ứng dụng Quản lý Sách.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from 'react';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';

// Hàm trợ giúp để tạo ID duy nhất
const generateId = () => `book_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

function App() {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem('books');
    try {
      return storedBooks ? JSON.parse(storedBooks) : [];
    } catch (error) {
      console.error("Lỗi khi đọc sách từ localStorage:", error);
      return [];
    }
  });

  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('books', JSON.stringify(books));
    } catch (error) {
      console.error("Lỗi khi lưu sách vào localStorage:", error);
    }
  }, [books]);

  const handleAddBook = useCallback((newBookData) => {
    const completeNewBook = { id: generateId(), ...newBookData };
    setBooks(prevBooks => [...prevBooks, completeNewBook]);
    setEditingBook(null);
  }, []);

  const handleUpdateBook = useCallback((updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(b => (b.id === updatedBook.id ? updatedBook : b))
    );
    setEditingBook(null);
  }, []);

  const handleDeleteBook = useCallback((id) => {
    setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
    if (editingBook && editingBook.id === id) {
        setEditingBook(null);
    }
  }, [editingBook]);

  const handleEditClick = useCallback((book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    // Sử dụng "container" để giới hạn chiều rộng tối đa và căn giữa toàn bộ khối ứng dụng.
    <div className="container py-4 py-md-5">
      <header className="text-center mb-4 mb-md-5">
        <h1 className="display-5 fw-bold">📚 Ứng dụng Quản lý Sách</h1>
        <p className="lead text-secondary">
          Sắp xếp danh sách đọc của bạn một cách dễ dàng.
        </p>
      </header>

      <main>
        {/* "row justify-content-center" để căn giữa cột (col) bên trong nó */}
        <div className="row justify-content-center">
          {/*
            Cột nội dung chính. Các class col-md-10 col-lg-9 col-xl-8
            sẽ làm cho cột này rộng hơn trên các màn hình khác nhau
            so với cài đặt ban đầu, và nó vẫn được căn giữa.
          */}
          <div className="col-md-10 col-lg-9 col-xl-8">
            <BookForm
              onAdd={handleAddBook}
              onUpdate={handleUpdateBook}
              editingBook={editingBook}
              setEditingBook={setEditingBook}
            />
            <BookList
              books={books}
              onEdit={handleEditClick}
              onDelete={handleDeleteBook}
            />
          </div>
        </div>
      </main>

      <footer className="mt-5 pt-4 border-top text-center">
        <p className="text-muted small">&copy; {new Date().getFullYear()} Ứng dụng Quản lý Sách.</p>
      </footer>
    </div>
  );
}

export default App;