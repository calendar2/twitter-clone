import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { query, collection, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Tweet from './tweet';

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweet] = useState([]);
  const fetchTweets = async() => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
      const {tweet, createdAt, userId, username, photo} = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweet(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, [])

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
      {/* {JSON.stringify(tweets)} */}
      {/* {tweets.length} */}
      {/* {tweets} */}
    </Wrapper>
  );
}