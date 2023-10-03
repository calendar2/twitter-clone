import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const onChange = (e) => {
    if(e.target.name === 'name') {
      setName(e.target.value);
    }
    else if(e.target.name === 'email') {
      setEmail(e.target.value);
    }
    else if(e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    setError("");
    if(isLoading || name === '' || email === '' || password === '') return;
    try {
      setLoading(true);

      // 1. 계정 생성
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);

      // 2. 사용자의 이름 설정
      await updateProfile(credentials.user, {
        displayName: name
      });

      // 3. 홈페이지로 redirect
      navigate("/");
    } catch(e) {
      if(e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
    
    // console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        이미 계정이 있으신가요? <Link to="/login">로그인 &rarr;</Link>
      </Switcher>
      <Switcher>
        <Link to="/find-pwd">비밀번호를 잊었어요!</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}