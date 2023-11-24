import { useRouter } from "next/router";
import { firebaseapp } from "../../src/commons/firebase/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as S from "./mainpage.style";
import { useRecoilState } from "recoil";
import { nameState } from "../commons/store";

export default function MainPage() {
  const [data, setData] = useState([]);
  const [name, setName] = useRecoilState(nameState);
  const router = useRouter();

  useEffect(() => {
    const db = collection(getFirestore(firebaseapp), "board");
    async function fetchScore() {
      const result = await getDocs(
        query(db, orderBy("score", "desc"), limit(10)),
      );
      const datas = result.docs.map((el) => el.data());
      setData(datas);
      setName("익명");
    }
    fetchScore();
  }, []);
  console.log(data);

  const onChangeName = (e: any) => {
    console.log(e.currentTarget.value);
    setName(e.currentTarget.value);
  };

  const onClickButton = () => {
    localStorage.setItem("name", name);
    router.push("/Game");
  };

  return (
    <S.Wrapper>
      <S.RankingTable>
        <S.RankImg src="/rank.png" />
        <S.RankContentWrapper>
          <h3>랭킹</h3>
          <S.RankContent>
            <h4>닉네임</h4>
          </S.RankContent>
          <S.RankContent>
            <h4>점수</h4>
          </S.RankContent>
        </S.RankContentWrapper>
        {data.map((el, index: any) => (
          <S.RankContentWrapper key={uuidv4}>
            <h3>{index + 1}등</h3>
            <S.RankContent>{el.writer}</S.RankContent>
            <S.RankContent>{el.score} 점</S.RankContent>
          </S.RankContentWrapper>
        ))}
      </S.RankingTable>
      <S.CustomInput
        onChange={onChangeName}
        placeholder="닉네임을 입력해주세요"
      />
      <S.CustomButton onClick={onClickButton}>게임하기</S.CustomButton>
    </S.Wrapper>
  );
}
