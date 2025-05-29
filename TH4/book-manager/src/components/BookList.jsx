import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  if (!books || books.length === 0) {
    return (
      <div className="card shadow rounded-3 mt-4"> {/* Thêm shadow và rounded-3 */}
        <div className="card-body text-center p-4 p-md-5">
          <h2 className="card-title h4 mb-3">Danh sách Sách</h2>
          <p className="text-muted">Chưa có sách nào. Hãy thêm sách để bắt đầu!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow rounded-3 mt-4"> {/* Thêm shadow và rounded-3 */}
      <div className="card-header bg-white py-3"> {/* Thêm card-header */}
        <h2 className="h4 mb-0 text-center">Danh sách Sách</h2>
      </div>
      <div className="list-group list-group-flush"> {/* Bỏ card-body, dùng list-group-flush */}
        {books.map(book => (
          <div
            key={book.id}
            className="list-group-item list-group-item-action px-3 py-3" // Thêm list-group-item-action
          >
            <div className="d-flex w-100 justify-content-between align-items-start">
              <div>
                <h5 className="mb-1 fw-semibold text-primary">{book.title}</h5>
                <p className="mb-1 text-secondary small">Tác giả: {book.author}</p>
              </div>
              <small className="text-muted">Năm: {book.year}</small>
            </div>
            <div className="mt-2 text-end"> {/* Căn phải các nút */}
              <button
                onClick={() => onEdit(book)}
                className="btn btn-outline-primary btn-sm me-2" /* Đổi thành outline */
                aria-label={`Chỉnh sửa sách ${book.title}`}
              >
                <small>Sửa</small> {/* Chữ nhỏ hơn trong nút */}
              </button>
              <button
                onClick={() => onDelete(book.id)}
                className="btn btn-outline-danger btn-sm" /* Đổi thành outline */
                aria-label={`Xóa sách ${book.title}`}
              >
                <small>Xóa</small> {/* Chữ nhỏ hơn trong nút */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;