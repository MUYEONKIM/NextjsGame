import { useRecoilState } from "recoil";
import * as S from "./Gamelog.style";
import { nameState, scoreState } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FruitScore = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55];
export default function Gamelog(): JSX.Element {
  const router = useRouter();
  const [score] = useRecoilState(scoreState);
  const [name, setName] = useRecoilState(nameState);

  useEffect(() => {
    const name = localStorage.getItem("name");
    console.log(name);
    setName(name);
  }, []);

  return (
    <S.Wrapper>
      <img src="/score.png" />
      <S.ScoreDiv>
        <S.Scoreh2>{name}</S.Scoreh2>
        <h4>님</h4>
      </S.ScoreDiv>
      <S.ContentsWrapper>
        <h2>{score}</h2>
        <h2>점</h2>
      </S.ContentsWrapper>
      <img src="/keyboard.png" />
      <S.MyButton onClick={() => router.reload()}>재도전</S.MyButton>
    </S.Wrapper>
  );
}
