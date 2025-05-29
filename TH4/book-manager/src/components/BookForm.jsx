import React, { useState, useEffect } from 'react';

function BookForm({ onAdd, onUpdate, editingBook, setEditingBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year.toString());
      setErrorMessage('');
    } else {
      setTitle('');
      setAuthor('');
      setYear('');
      setErrorMessage('');
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !year.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin các trường.');
      return;
    }
    const currentYear = new Date().getFullYear();
    const parsedYear = parseInt(year, 10);
    if (isNaN(parsedYear) || parsedYear < 0 || parsedYear > currentYear + 5) {
      setErrorMessage(`Vui lòng nhập năm hợp lệ (ví dụ: từ 0 đến ${currentYear + 5}).`);
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      year: parsedYear,
    };

    if (editingBook) {
      onUpdate({ ...editingBook, ...bookData });
    } else {
      onAdd(bookData);
    }
    setErrorMessage('');
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="card shadow mb-4 rounded-3"> {/* Thêm shadow và rounded-3 */}
      <div className="card-body p-4"> {/* Thêm padding cho card-body */}
        <h2 className="card-title h4 mb-3 text-center"> {/* Căn giữa tiêu đề form */}
          {editingBook ? 'Chỉnh sửa Sách' : 'Thêm Sách Mới'}
        </h2>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-medium">Tựa đề:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control form-control-lg" // Thử input lớn hơn
              placeholder="Ví dụ: Nhà Giả Kim"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label fw-medium">Tác giả:</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Ví dụ: Paulo Coelho"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="year" className="form-label fw-medium">Năm xuất bản:</label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Ví dụ: 1988"
            />
          </div>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-end mt-4"> {/* Căn phải nút trên màn hình lớn */}
            {editingBook && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-outline-secondary btn-lg" // Nút Hủy lớn hơn
              >
                Hủy
              </button>
            )}
            <button type="submit" className="btn btn-primary btn-lg"> {/* Nút chính lớn hơn */}
              {editingBook ? 'Cập nhật Sách' : 'Thêm Sách'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;