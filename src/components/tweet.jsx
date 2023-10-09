import { styled } from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

export default function Tweet({ tweet }) {
  return (
    <Wrapper>
      <Column>
        <Username>{tweet.username}</Username>
        <Payload>{tweet.tweet}</Payload>
      </Column>
      {tweet.photo ? (
      <Column>
        <Photo src={tweet.photo} />
      </Column>
) : null}
    </Wrapper>
  );
}
Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
}