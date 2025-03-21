import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ post }) {
  return (
    <Link
      to={`/post/${post.slug}`}
      className="group relative w-96 h-64 border border-slate-300 rounded-md overflow-hidden shadow-md flex flex-col"
    >
      <div className="h-44 w-full group-hover:h-36 transition-all duration-300 z-20">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover aspect-[16/9] "
        />
      </div>
      <div className="px-2 flex flex-col gap-4">
        <h1 className="font-semibold text-lg capitalize">
          {post.title.length > 50
            ? post.title.slice(0, 50) + "..."
            : post.title}
        </h1>
        <p className="mt-auto italic text-xs ">{post.category}</p>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 text-center p-1 m-1 text-black  bg-white rounded-md hover:bg-black border-2 border-black hover:text-white transition-all duration-300"
        >
          Read article
        </Link>
      </div>
    </Link>
  );
}
