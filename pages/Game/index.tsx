import MyGame from "../../src/Game/Gameindex";
import Gamelog from "../../src/commons/Gamelog/Gamelog";
import styled from "@emotion/styled";

const Wrapper = styled.section`
  min-height: 1080px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f7c563;
  background-image: url("/background.png");
  background-size: 100%;
  background-repeat: no-repeat;
`;
// 엔진 스타트
export default function index(): JSX.Element {
  return (
    <Wrapper>
      <MyGame />
      <Gamelog />
    </Wrapper>
  );
}
