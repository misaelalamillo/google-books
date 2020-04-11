const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/books/", (req, res) => {
  //then add query -> db.nameOfCollection.findAll({})
  const dummyData = [
    {
      _id: 1,
      title: "Cat in the Hat",
      authors: ["Dr.Seuss"],
      description: "cat has some fun",
      image: "image1",
      link: "link1",
    },
    {
      _id: 2,
      title: "And Then There Were None",
      authors: ["Agatha", "Christie"],
      description: "everyone except one person dies in deserted area",
      image: "image2",
      link: "linke2",
    },
    {
      _id: 3,
      title: "The Institute",
      authors: ["Stephen King"],
      description: "government abuses kids' supernatural powers for good?",
      image: "image3",
      link: "link3",
    },
  ];

  res.send(dummyData);
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
