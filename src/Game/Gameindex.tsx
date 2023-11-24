import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
import { useEffect, useRef } from "react";
import { FRUITS_BASE } from "../commons/fruit";
import { useRecoilState } from "recoil";
import { nameState, scoreState } from "../commons/store";
import { firebaseapp } from "../commons/firebase/firebase";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";

const FruitScore = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55];

// 엔진 스타트
export default function MyGame(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setScore] = useRecoilState(scoreState);
  const [name, setName] = useRecoilState(nameState);
  const router = useRouter();
  let currentScore: number = 0;
  useEffect(() => {
    let engine = Engine.create();
    // 엔진을 그려주는 render
    let render = Render.create({
      engine,
      canvas: canvasRef.current,
      // element: document.body,
      options: {
        // wireframes를 true로 하면 개발자가 만든듯한 느낌
        wireframes: false,
        background: "#F7F4C8",
        width: 620,
        height: 790,
      },
    });

    const world = engine.world;
    // rectangle 파라미터를 보면 x,y, 넓이, 높이
    // x,y좌표는 중앙으로 부터 x로부터 얼만큼 떨어져 있는지, y만큼 얼만큼 떨어져 있는지
    const leftWall = Bodies.rectangle(15, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });

    const rightWall = Bodies.rectangle(605, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });

    const ground = Bodies.rectangle(310, 790, 620, 60, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });

    const topLine = Bodies.rectangle(310, 150, 620, 2, {
      name: "topLine",
      isStatic: true,
      // isSensor은 현재 변수를 sensor로 지정하고 통과할수 있게 만드는 것
      isSensor: true,
      render: { fillStyle: "#E6B143" },
    });

    World.add(world, [leftWall, rightWall, ground, topLine]);

    Render.run(render);
    Runner.run(engine);

    let currentBody = null;
    let currentFruit = null;
    let disabledAction = false;
    let interval = null;

    const addFruit = () => {
      // index에 random 5를 주면서 5까지 인덱스에서 랜덤으로 과일 추출
      const index = Math.floor(Math.random() * 5);
      const fruit = FRUITS_BASE[index];
      const body = Bodies.circle(300, 50, fruit.radius, {
        index: index,
        // isSleeping으로 상단에 고정되게 만들기
        isSleeping: true,
        render: {
          sprite: { texture: `/${fruit.name}.png` },
        },
        // restitution은 탄성이라고 보면됨 0.1~0.2가 적당 1하면 많이 튐
        restitution: 0.2,
      });

      currentBody = body;
      currentFruit = fruit;

      World.add(world, body);
    };

    // window.onkeydown 으런걸 이용해서 키보드 입력 감지

    window.onkeydown = (event) => {
      // disabledAction으로 중복 키다운 방지
      if (disabledAction) return;
      switch (event.code) {
        case "KeyA":
          if (interval) return;
          // 여기서 setInterval을 통해서 부드러운 움직임 효과라는데 왜?
          interval = setInterval(() => {
            // 화면 밖으로 키보드를 눌렀을 때 못움직이게 막기
            if (currentBody.position.x - currentFruit.radius > 30)
              Body.setPosition(currentBody, {
                x: currentBody.position.x - 1,
                y: currentBody.position.y,
              });
          }, 5);
          break;
        case "KeyD":
          if (interval) return;
          // 여기서 setInterval을 통해서 부드러운 움직임 효과라는데 왜?
          interval = setInterval(() => {
            // 화면 밖으로 키보드를 눌렀을 때 못움직이게 막기
            if (currentBody.position.x + currentFruit.radius < 590)
              Body.setPosition(currentBody, {
                x: currentBody.position.x + 1,
                y: currentBody.position.y,
              });
          }, 5);
          break;
        case "KeyS":
          currentBody.isSleeping = false;
          disabledAction = true;

          // 키보드 s를 누르면 addFruit 함수가 실행되게 하지만 이렇게 될 경우 s를 연타할 경우 문제가 발생, 때문에 1초동안 조작이 안되게 막아야 함
          setTimeout(() => {
            addFruit();
            // disabledAction 이라는 변수를 통해 keydown이 되었을 때 1초 동안 아무것도 못하게 설정
            disabledAction = false;
          }, 1000);
          break;
      }
    };

    window.onkeyup = (event) => {
      switch (event.code) {
        case "KeyA":
          clearInterval(interval);
          interval = null;
        case "KeyD":
          clearInterval(interval);
          interval = null;
      }
    };

    // collisionStart란 충돌이 되면 실행이 되는 콜백 함수를 불러오는 것

    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((collision) => {
        // 충돌한 bodyA와 bodyB의 index 가 같다면 즉 충돌한 과일 두개, 물체 두개 라는 뜻
        if (collision.bodyA.index === collision.bodyB.index) {
          // 충돌한 과일의 인덱스를 얻어서 다음 인덱스를 얻기 위해 index를 선언해주는 과정
          const index = collision.bodyA.index;
          // 현재의 과일이 마지막 fruits_base즉 수박일 경우 합쳐지지 않게 설정
          if (index === FRUITS_BASE.length - 1) {
            return;
          }
          currentScore += FruitScore[index];
          setScore(currentScore);
          World.remove(world, [collision.bodyA, collision.bodyB]);

          const newFruit = FRUITS_BASE[index + 1];

          const newBody = Bodies.circle(
            collision.collision.supports[0].x,
            collision.collision.supports[0].y,
            newFruit.radius,
            {
              render: {
                sprite: { texture: `/${newFruit.name}.png` },
              },
              index: index + 1,
            },
          );
          // 기존 과일이 없어지고 다음 과일이 생기는 것
          World.add(world, newBody);
        }

        if (
          // disabledAction이 아닐 때만 topLine에 걸쳐질때 게임이 끝나게 됨
          !disabledAction &&
          (collision.bodyA.name === "topLine" ||
            collision.bodyB.name === "topLine")
        ) {
          if (name === "") {
            setName("익명");
          }
          const board = collection(getFirestore(firebaseapp), "board");
          console.log(currentScore);
          void addDoc(board, {
            writer: name,
            score: currentScore,
          });
          alert("Game Over");
          localStorage.clear;
          currentScore = 0;
          setScore(0);
          router.push("/");
        }
      });
    });

    addFruit();

    return () => {
      World.clear(world, false); // 모든 Bodies, Constraints 등을 제거
      Engine.clear(engine); // 엔진의 모든 객체를 제거
      Runner.stop(engine); // Runner를 중지
      Render.stop(render); // Render를 중지

      // window 이벤트 리스너 제거
      window.onkeydown = null;
      window.onkeyup = null;
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />;
    </>
  );
}
