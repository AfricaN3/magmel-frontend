import { TypeAnimation } from "react-type-animation";

const TypingComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        "User prompts + AI-generated images", // Types 'One'
        5000, // Waits 1s
        "Lifetime royalty for minters", // Types 'One'
        2000, // Waits 1s
        "1 GAS per NFT", // Types 'One'
        2000, // Waits 1s
        "3333 unique NFTs", // Deletes 'One' and types 'Two'
        2000, // Waits 2s
        "Summarizer tool for prompts",
        2000,
      ]}
      wrapper="span"
      cursor={false}
      speed={35}
      deletionSpeed={70}
      repeat={Infinity}
      style={{ fontSize: "1em" }}
    />
  );
};

export default TypingComponent;
