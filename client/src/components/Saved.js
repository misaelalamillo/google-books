import React from "react";
import axios from "axios";
import "../App.css";

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedBooks: [],
    };
  }

  handleDelete(bookId) {
    axios.delete(`/api/books/${bookId}`);
  }

  componentDidMount() {
    axios.get("/api/books").then((response) => {
      const results = response.data;
      this.setState({ savedBooks: results });
    });
  }

  render() {
    const savedBooks = this.state.savedBooks;

    return (
      <div>
        {savedBooks.map((savedBook) => {
          return (
            <div key={savedBook._id}>
              <div className="bookitem">
                <div className="bookitem-header">
                  <span>
                    <h3 className="bookitem-title">{savedBook.title}</h3>
                    <h4>{savedBook.authors && savedBook.authors.join(" ")}</h4>
                  </span>
                  <span>
                    <button className="booksearch-view-button">
                      <a target="_blank" href={savedBook.link}>
                        View
                      </a>
                    </button>
                    <button onClick={() => this.handleDelete(savedBook._id)}>
                      Delete
                    </button>
                  </span>
                </div>
                <div className="bookitem-body">
                  <div>
                    <img alt="image of book cover" src={savedBook.image} />
                  </div>
                  <div>{savedBook.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Saved;