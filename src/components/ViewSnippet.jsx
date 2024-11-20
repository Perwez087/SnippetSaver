import React from 'react'
import toast from 'react-hot-toast';
import { MdContentCopy } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const ViewSnippet = () => {
  const {id} = useParams();
  const allSnippet = useSelector((state)=> state.snippet.snippets);
  const snippet = allSnippet.filter((s)=> s._id === id)[0];
  
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.content);
    toast.success('Content copied to clipboard');
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 mt-5">
      {/* Input and Button Section */}
      <div className="flex max-w-2xl w-full gap-2 mb-4">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          placeholder="Enter your snippet"
          value={snippet.title}
          disabled
        />
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-2xl flex flex-col mt-5">
        <div className="border-gray-300 border p-2 rounded-md bg-[#121212] flex items-center justify-between px-4">
           <div className="flex items-center gap-2">
            <span className="bg-red-500 w-3 h-3 rounded-full"></span>
            <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
            <span className="bg-green-500 w-3 h-3 rounded-full"></span>
           </div>
           <div>
             <span onClick={handleCopy} className="cursor-pointer"><MdContentCopy/></span>
           </div>
        </div>
        <textarea
          rows={10}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write your content here..."
          value={snippet.content}
          disabled
        ></textarea>
      </div>
    </div>
  )
}

export default ViewSnippet
