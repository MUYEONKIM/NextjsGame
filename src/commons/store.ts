import { atom } from "recoil";

export const scoreState = atom({
  key: "scoreState",
  default: 0,
});

export const nameState = atom({
  key: "nameState",
  default: "익명",
});
