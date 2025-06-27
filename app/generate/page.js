"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Generate = () => {
  const searchparams = useSearchParams()
  // const [link, setlink] = useState("");
  // const [linktext, setlinktext] = useState("");
  const [links, setlinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchparams.get("handle"));
  const [linkpic, setlinkpic] = useState("");
   const [desc, setdesc] = useState("")

  const handleChange = (index, link, linktext) => {
    setlinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext };
        } else {
          return item;
        }
      });
    });
  };

  const addlink = () => {
    setlinks(links.concat({ link: "", linktext: "" }));
  };

  const submitlinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links, 
      "handle": handle,
      "pic": linkpic,
      "desc": desc
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const r = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await r.json();
    if(result.success){

      toast.success(result.message);
      setlinks([])
     setlinkpic("")
     setHandle("")
    }
    else{
      toast.error(result.message)
    }
  };

  return (
    <div className="bg-[#E9C0E9] min-h-screen grid grid-cols-2">

      <div className="col1 flex justify-center items-center flex-col text-gray-900 mt-25">
        <div className="flex flex-col gap-5 my-8">
          <h1 className="font-bold text-4xl text-gray-700 mt-9">
            Create your Links
          </h1>
          <div className="item">
            <h2 className="font-semibold text-2xl my-2">
              {" "}
              Step 1: Claim your Handle
            </h2>
            <div className="mx-6 flex flex-col gap-3">
              <input
                value={handle || ""}
                onChange={(e) => {
                  setHandle(e.target.value);
                }}
                className=" bg-white px-4 py-3 focus:outline-pink-500 rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="Choose Handle"
              />
            </div>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl my-2 ">
              Step 2: Add your Links
            </h2>
            {links &&
              links.map((item, index) => {
                return (
                  <div key={index} className="mx-4">
                    
                    <input
                      value={item.link || ""}
                      onChange={(e) => {
                        handleChange(index, e.target.value, item.linktext);
                      }}
                      className=" bg-white px-4 py-3 focus:outline-pink-500 rounded-2xl mx-3"
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter link"
                    />
                    <input
                      value={item.linktext || ""}
                      onChange={(e) => {
                        handleChange(index, item.link, e.target.value);
                      }}
                      className=" bg-white px-4 py-3 focus:outline-pink-500 rounded-2xl mx-3 my-3"
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter link text"
                    />
                  </div>
                );
              })}

            <button
              onClick={() => addlink()}
              className="px-3 mx-10 py-3 mt-3  bg-slate-700 cursor-pointer text-white font-bold rounded-2xl"
            >
              Add Link
            </button>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl my-2">
              {" "}
              Step 3: Add Picture and description
            </h2>
            <div className="mx-6 flex flex-col gap-3">
              <input
                value={linkpic || ""}
                onChange={(e) => {
                  setlinkpic(e.target.value);
                }}
                className=" bg-white px-4 py-3 focus:outline-pink-500 rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="Enter link to picture"
              />
              <input
                value={desc || ""}
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
                className=" bg-white px-4 py-3 focus:outline-pink-500 rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="Enter description"
              />
              <button disabled={linkpic == "" || handle=="" || links[0].linktext == ""}
                onClick={() => {
                  submitlinks();
                }}
                className="disabled:bg-slate-500 px-3 mx-2 py-3 w-fit my-3 bg-slate-700 cursor-pointer text-white font-bold rounded-2xl"
              >
                Generate Link
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full h-screen bg-[#E9C0E9]">
        <img
          className="h-full object-contain"
          src="generate.png"
          alt="Generate links"
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Generate;
