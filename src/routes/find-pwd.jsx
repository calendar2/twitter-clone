import { sendPasswordResetEmail } from "firebase/auth";
import { Form, Input, Title, Wrapper } from "../components/auth-components";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../firebase";

export default function FindPwd() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    if(e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    if(isLoading || email === "") return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email).then((a) => {
        alert("입력한 이메일로 비밀번호 재설정 메일을 보냈습니다.");
        navigate("/login");
      });
    } catch(e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>비밀번호 찾기</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "비밀번호 찾기"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}