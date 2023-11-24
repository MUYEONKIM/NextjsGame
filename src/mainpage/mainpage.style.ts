import styled from "@emotion/styled";

export const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  min-height: 1080px;
  background-color: #f7c563;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/background.png");
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const RankingTable = styled.section`
  border: 15px solid #e6b143;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4em 4em 3.5em 4em;
  background-color: #f7f4c8;
  margin-bottom: 3vh;
`;

export const RankContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  width: 25em;
`;

export const RankContent = styled.article`
  font-size: 18px;
  padding: 0.5em;
`;

export const RankImg = styled.img`
  border-radius: 25px;
  margin-bottom: 3%;
`;

export const CustomInput = styled.input`
  width: 500px;
  height: 40px;
  font-size: 18px;
  border: 1px solid #f7f4c8;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  text-align: center;
  background-color: #f7f4c8;
  margin-bottom: 2vh;
`;

export const CustomButton = styled.button`
  & {
    background-color: orange;
    border: 1px solid #fa6400;
    border-radius: 56px;
    color: #fdfdfd;
    cursor: pointer;
    display: inline-block;
    font-family:
      system-ui,
      -apple-system,
      system-ui,
      "Segoe UI",
      Roboto,
      Ubuntu,
      "Helvetica Neue",
      sans-serif;
    font-size: 18px;
    font-weight: 600;
    outline: 0;
    padding: 16px 21px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  &:before {
    background-color: #f7f4c8;
    border-radius: 125px;
    content: "";
    height: 50%;
    left: 4%;
    opacity: 0.5;
    position: absolute;
    top: 0;
    transition: all 0.3s;
    width: 92%;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    & {
      padding: 16px 48px;
    }
  }
`;
