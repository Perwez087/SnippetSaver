import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToSnippet, updateToSnippet } from "../redux/snippetSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const snippetId = searchParams.get("snippetId");
  const dispatch = useDispatch();
  const allSnippets = useSelector((state) => state.snippet.snippets);

  useEffect(() => {
    if (snippetId) {
      const snippet = allSnippets.find((s) => s._id === snippetId);
      setTitle(snippet.title);
      setContent(snippet.content);
    }
  }, [snippetId]);

  const createSnippet = () => {
    const formattedDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty!");
      return;
    }

    const snippet = {
      title: title,
      content: content,
      _id: snippetId || Date.now().toString(36),
      createdAt: formattedDate,
    };

    if (snippetId) {
      dispatch(updateToSnippet(snippet));
    } else {
      dispatch(addToSnippet(snippet));
    }

    setTitle("");
    setContent("");
    setSearchParams({});
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 mt-5">
      {/* Input and Button Section */}
      <div className="flex flex-col sm:flex-row max-w-3xl w-full gap-2 mb-4">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Enter your snippet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createSnippet}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition sm:mt-0 mt-2 sm:w-auto w-full"
        >
          {snippetId ? "Update My Snippet" : "Create My Snippet"}
        </button>
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-3xl flex flex-col mt-5">
        <div className="border-gray-300 border p-2 rounded-md bg-[#121212] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="bg-red-500 w-3 h-3 rounded-full"></span>
            <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
            <span className="bg-green-500 w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <textarea
          rows={15}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gradient-to-r from-red-300 via-yellow-500 to-green-500 text-transparent bg-clip-text"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
