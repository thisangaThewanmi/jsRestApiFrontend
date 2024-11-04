function fetchBooks() {
    $.get('http://localhost:3000/api/books', function(data) { // Ensure the URL matches your backend
        const bookList = $('#bookList');
        bookList.empty(); // Clear the current list
        data.forEach(book => {
            bookList.append(`
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                </tr>
            `);
        });
    }).fail(function(err) {
        alert('Error fetching books: ' + err.responseText);
    });
}

// Event listener for adding a book
$('#btnAdd').on('click', function(e) { // Change from '#btnAdd' to '#addBookForm'
    console.log('savebtn')
    e.preventDefault(); // Prevent form submission
    const title = $('#bookTitle').val();
    const author = $('#bookAuthor').val();
    console.log(title,author);

    $.ajax({
        url: 'http://localhost:3000/api/books',
        type: 'POST',
        contentType: 'application/json', // Set content type to JSON
        data: JSON.stringify({ title, author }), // Stringify the data
        success: function(data) {
            fetchBooks(); // Refresh the book list
            $('#addBookForm')[0].reset(); // Reset the form
        },
        error: function(err) {
            alert('Error: ' + err.responseJSON.error);
        }
    });
});


// Event listener for deleting a book
$('#deleteBookBtn').on('click', function() {
    console.log("delete")
    const id = $('#bookId').val();
    $.ajax({
        url: `http://localhost:3000/api/books/${id}`, // Ensure the URL matches your backend
        type: 'DELETE',
        success: function(data) {
            fetchBooks(); // Refresh the book list
            $('#addBookForm')[0].reset(); // Reset the form
        },
        error: function(err) {
            alert('Error: ' + err.responseText);
        }
    });
});

// Event listener for updating a book
$('#updateBookBtn').on('click', function() {
    const id = $('#bookId').val();
    const title = $('#bookTitle').val();
    const author = $('#bookAuthor').val();

    $.ajax({
        url: `http://localhost:3000/api/books/${id}`, // Ensure the URL matches your backend
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ title, author }),
        success: function(data) {
            fetchBooks(); // Refresh the book list
            $('#addBookForm')[0].reset(); // Reset the form
        },
        error: function(err) {
            alert('Error: ' + err.responseText);
        }
    });
});

// Fetch books on page load
$(document).ready(function() {
    fetchBooks();
    console.log("Page loaded and books fetched");
});
