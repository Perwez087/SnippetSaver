import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSnippet, resetAllSnippet } from "../redux/snippetSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Snippet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const snippets = useSelector((state) => state.snippet.snippets);
  const dispatch = useDispatch();

  const filteredData = snippets.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (snippetId) => {
    dispatch(removeFromSnippet(snippetId));
  };

  const handleCopy = (snippet) => {
    navigator.clipboard.writeText(snippet?.content);
    toast.success("copied to clipboard");
  };

  const handleReset = () => {
    dispatch(resetAllSnippet(null));
  };

  return (
    <div className="flex flex-col gap-4 mt-5 max-w-3xl m-auto w-full">
      <div className="flex w-full gap-2 mb-4">
        <input
          className='flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"'
          type="Search"
          placeholder="Search snippet here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* All Snippet */}
      <div className="border">
        <div className="p-4 flex items-center justify-between">
          <h1 className="md:text-2xl text-lg font-semibold">All Snippets</h1>
          <div>
            <button onClick={handleReset}>Reset Snippet</button>
          </div>
        </div>
        <div className="border p-3">
          {filteredData.length > 0 ? (
            filteredData.map((snippet) => {
              return (
                <div
                  key={snippet._id}
                  className="border flex md:flex-row flex-col md:items-center space-y-4 justify-between p-3"
                >
                  <div className="md:w-[70%]">
                    <h1 className="md:text-2xl text-xl font-bold">{snippet.title}</h1>
                    <span>
                      {snippet.content.length > 100
                        ? `${snippet.content.slice(0, 100)}...`
                        : snippet.content}
                    </span>
                  </div>
                  <div>
                    <div className="flex md:items-center md:justify-center gap-2">
                      <Link
                        to={`/?snippetId=${snippet?._id}`}
                        className="border p-1 rounded cursor-pointer"
                      >
                        <FiEdit3 size={20} />
                      </Link>
                      <span
                        onClick={() => handleDelete(snippet?._id)}
                        className="border p-1 rounded cursor-pointer"
                      >
                        <RiDeleteBinLine size={20} />
                      </span>
                      <Link
                        to={`/snippets/${snippet?._id}`}
                        className="border p-1 rounded cursor-pointer"
                      >
                        <IoEyeOutline size={20} />
                      </Link>
                      <span
                        onClick={() => handleCopy(snippet)}
                        className="border p-1 rounded cursor-pointer"
                      >
                        <MdOutlineContentCopy size={20} />
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span>
                        <SlCalender />
                      </span>
                      <span>{snippet.createdAt}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h1>No Snippet found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Snippet;
