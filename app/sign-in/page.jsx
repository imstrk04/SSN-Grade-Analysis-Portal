"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase/firebase.js";
import { useRouter } from "next/navigation";
import backgroundImage from "@/app/sign-in/ssnbackground.jpg";
const CardMenu = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, userError] =
    useSignInWithEmailAndPassword(auth);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      if (res && res.user) {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap");
        body {
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        body::before {
          content: "";
          background-image: url(${backgroundImage});
          background-size: cover;
          background-position: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .container {
          width: 350px;
          height: 500px;
          border-radius: 20px;
          padding: 40px;
          box-sizing: border-box;
          background: rgba(
            236,
            240,
            243,
            0.8
          ); /* Use rgba to make the background slightly transparent */
          box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
          position: relative;
        }

        .brand-logo {
          height: 100px;
          width: 100px;
          background: url("ssnlogo.svg") no-repeat center center;
          background-size: 90px 50px; /* Adjust these values to make the image larger */
          margin: 20px auto; /* Add margin-top: 20px; */
          border-radius: 50%;
          box-sizing: border-box;
          box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
        }

        .brand-title {
          margin-top: 10px;
          font-weight: 900;
          font-size: 1.8rem;
          color: #0d4ba0;
          letter-spacing: 1px;
          text-align: center; /* Center align the title */
        }

        .inputs {
          text-align: left;
          margin-top: 30px;
        }

        label,
        input,
        button {
          display: block;
          width: 100%;
          padding: 0;
          border: none;
          outline: none;
          box-sizing: border-box;
        }

        label {
          margin-bottom: 4px;
        }

        label:nth-of-type(2) {
          margin-top: 12px;
        }

        input::placeholder {
          color: gray;
        }

        input {
          background: #ecf0f3;
          padding: 10px;
          padding-left: 20px;
          height: 50px;
          font-size: 14px;
          border-radius: 50px;
          box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
        }

        input:focus {
          border: 2px solid #1da1f2;
        }

        button {
          color: white;
          margin-top: 20px;
          background: #0d4ba0;
          height: 40px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 900;
          box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
          transition: 0.3s;
        }

        button:hover {
          box-shadow: none;
          background: #0e86d4;
        }

        .error {
          color: red;
          margin-top: 10px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
      <div className="container">
        <div className="brand-logo" />
        <h1 className="brand-title">Login Page</h1>
        <div className="inputs">
          <label>User ID</label>
          <input
            type="email"
            placeholder="example@__.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 6 characters long"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default CardMenu;
