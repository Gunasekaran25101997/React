import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import api from "./api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  // [
  //   {
  //     id: 1,
  //     title: "Java",
  //     datetime: "feb 01,2022 11:17:36 AM",
  //     body: "Completed in Accord Infomatrics"
  //   },
  //   {
  //     id: 2,
  //     title: "Django",
  //     datetime: "June 01,2022 11:17:36 AM",
  //     body: "Completed Django framework project on my own"
  //   },
  //   {
  //     id: 3,
  //     title: "Data Migration and Software Testing",
  //     datetime: "March 01,2022 11:17:36 AM",
  //     body: "Completed DVD project"
  //   },
  //   {
  //     id: 4,
  //     title: "React",
  //     datetime: "July 30,2023 11:17:36 AM",
  //     body: "Completed React with To Do List Project"
  //   },
  // ])
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchPosts();
  }, []);
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      // ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response=await api.post('/post',newPost)
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
  }catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  const handleDelete =async (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate("/");
  };
  return (
    <div className="App">
      <Header title="Social Media" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="About" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
