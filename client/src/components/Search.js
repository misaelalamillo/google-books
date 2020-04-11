import React from "react";
import axios from "axios";
import "../App.css";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      bookSearchResults: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const bookSearchInput = this.state.value;

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q="${bookSearchInput}"`,
        {}
      )
      .then((result) => {
        let searchResults = result.data.items;

        let formattedResults = [];

        if (!searchResults) {
          this.setState({ bookSearchResults: [] });
          return;
        }

        searchResults.forEach((item) => {
          let bookItem = {};

          bookItem.title = item.volumeInfo.title;
          bookItem.authors = item.volumeInfo.authors;
          bookItem.description = item.volumeInfo.description;
          bookItem.image = item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.thumbnail
            : "";
          bookItem.link = item.volumeInfo.infoLink;
          formattedResults.push(bookItem);
        });

        this.setState({ bookSearchResults: formattedResults });
      });
  }

  handleSave(bookItem) {
    axios.post("/api/books", bookItem);
  }

  render() {
    const allBooks = this.state.bookSearchResults;

    return (
      <div>
        <div className="booksearch">
          <p>Book Search</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Book
              <input
                className="booksearch-search"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input className="booksearch-button" type="submit" value="Submit" />
          </form>
        </div>

        <div>
          <p>Results</p>

          {allBooks.length > 0 &&
            allBooks.map((bookItem, idx) => {
              return (
                <div key={idx}>
                  <div className="bookitem">
                    <div className="bookitem-header">
                      <span>
                        <h3 className="bookitem-title">{bookItem.title}</h3>
                        <h4>
                          {bookItem.authors && bookItem.authors.join(" ")}
                        </h4>
                      </span>
                      <span>
                        <button className="booksearch-view-button">
                          <a target="_blank" href={bookItem.link}>
                            View
                          </a>
                        </button>
                        <button onClick={() => this.handleSave(bookItem)}>
                          Save
                        </button>
                      </span>
                    </div>
                    <div className="bookitem-body">
                      <div>
                        <img alt="image of book cover" src={bookItem.image} />
                      </div>
                      <div>{bookItem.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Search;

