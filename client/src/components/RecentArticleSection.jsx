import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

export default function RecentArticleSection() {
  const [recentPost, setRecentPosts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/post/getposts?limit=3`);
      const data = await res.json();
      if (res.ok) {
        setRecentPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(recentPost);

  return (
    <>
      {recentPost && (
        <div className="m-2 w-full">
          <h1 className="text-xl text-center">Recent articles</h1>
          <div className=" flex flex-col sm:flex-row p-2 gap-6 justify-center items-center">
            {recentPost.map((post) => (
              <ArticleCard key={post._id} post={post}></ArticleCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
