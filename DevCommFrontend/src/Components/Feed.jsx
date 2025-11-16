import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
  getFeed();
  }, [])
  
 

  return (
    feed && (
      <div>
        <UserCard user={feed[3]} />
      </div>
    )
  );
};

export default Feed;
