import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat With Your OWN AI",
        1000,
        "Built With OpenAI ",
        2000,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "black", 
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
