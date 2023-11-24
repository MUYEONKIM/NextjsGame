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
