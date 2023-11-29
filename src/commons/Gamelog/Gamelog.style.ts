import styled from "@emotion/styled";

export const Wrapper = styled.section`
  height: 850px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ContentsWrapper = styled.section`
  width: 420px;
  height: 100px;
  border: 5px solid #e6b143;
  background-color: #f7f4c8;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vw 0 3vw;
  color: #fa6400;
`;

export const ScoreDiv = styled.section`
  border: 5px solid #e6b143;
  background-color: #f7f4c8;
  border-radius: 15px;
  text-align: left;
  padding: 0.5vw 2vw 0.5vw 2vw;
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Scoreh2 = styled.h4`
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
`;

export const MyButton = styled.button`
  & {
    appearance: none;
    background-color: #f7f4c8;
    border-radius: 40em;
    border-style: none;
    box-shadow: #e6b143 0 -12px 6px inset;
    box-sizing: border-box;
    color: #000000;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.24px;
    margin: 0;
    outline: none;
    padding: 1rem 1.3rem;
    quotes: auto;
    text-align: center;
    text-decoration: none;
    transition: all 0.15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  &:hover {
    background-color: #ffc229;
    box-shadow: #ff6314 0 -6px 8px inset;
    transform: scale(1.125);
  }

  &:active {
    transform: scale(1.025);
  }

  @media (min-width: 768px) {
    & {
      font-size: 1.5rem;
      padding: 0.75rem 2rem;
    }
  }
`;
