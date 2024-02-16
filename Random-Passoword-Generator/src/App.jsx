import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let finalPass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let chars = "!@#$%^&*()-_+=`~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      finalPass += str.charAt(char);
    }

    if (numberAllowed) {
      let num = Math.floor(Math.random() * nums.length);
      let passArray = finalPass.split("");
      passArray[length - 2] = nums.charAt(num);
      finalPass = passArray.join("");
    }

    if (characterAllowed) {
      let symbol = Math.floor(Math.random() * chars.length);
      let passArray = finalPass.split("");
      passArray[length - 1] = chars.charAt(symbol);
      finalPass = passArray.join("");
    }
    finalPass = finalPass.charAt(0).toUpperCase() + finalPass.slice(1);
    setPassword(finalPass);
    console.log(finalPass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="flex flex-wrap justify-center flex-row">
      <h1 className="text-4xl text-center text-black mt-6 mb-4">
        Random Password Generator
      </h1>
      <div className="w-4/5 border border-black flex flex-wrap justify-center gap-4 py-2 content-center rounded-xl flex-row">
        <div className="w-4/5 flex flex-wrap justify-center gap-4 py-2 content-center rounded-xl flex-row">
          <label htmlFor="passwordInput">Password :</label>
          <input
            type="text"
            value={password}
            id="passwordInput"
            className="bg-black text-white border border-orange-500 text-sm rounded-lg px-2 py-2 w-1/5"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="border border-black px-3 text-center rounded-lg bg-blue-800 text-white"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="w-4/5 flex flex-wrap justify-center gap-4 py-2 content-center rounded-xl flex-row">
          <input
            type="range"
            min={6}
            max={18}
            value={length}
            id="lengthField"
            onChange={(e) => setLength(e.target.value)}
          ></input>
          <label htmlFor="lengthField">Length: {length}</label>
          <input
            type="checkbox"
            id="numbersField"
            onChange={() => setNumberAllowed((n) => !n)}
          ></input>
          <label htmlFor="numbersField" className="-ml-2">
            Numbers
          </label>
          <input
            type="checkbox"
            id="charactersField"
            onChange={() => setCharacterAllowed((c) => !c)}
          ></input>
          <label htmlFor="charactersField" className="-ml-2">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
