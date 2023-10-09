import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState(null);
  
  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    if(files && files.length === 1) {
      if(files[0].size > 1000000) {
        alert("1MB 이하의 사진만 첨부할 수 있습니다");
      }
      else {
        setFile(files[0]);
        // console.log(files[0].size);
      }
    }
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    const user = auth.currentUser
    if(!user || isLoading || tweet === "" || tweet.length > 180) return;
    
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "익명의 사용자",
        userId: user.uid,
      });

      if(file) {
        const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea required rows={5} maxLength={180} onChange={onChange} value={tweet} placeholder="무엇을 하고싶나요?" />
      <AttachFileButton htmlFor="file">{file ? "첨부됨" : "사진 첨부"}</AttachFileButton>
      <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
      <SubmitBtn type="submit" value={isLoading ? "게시 중..." : "트윗 게시"} />
    </Form>
  );
}