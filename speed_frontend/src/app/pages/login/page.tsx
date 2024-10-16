"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful", data);
        // Store the access token in localStorage
        localStorage.setItem("access_token", data.access_token);
        // Update the login state in AuthContext
        login();
        // Redirect to the home page or another page
        router.push("/pages/browse");
            } else {
        console.error("Login Failed", data.message);
        setError(data.message || "Failed to log in.");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSignup = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase, lowercase, and special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup Successful", data);
      } else {
        console.error("Signup Failed", data.message);
        setError(data.message || "Failed to sign up.");
      }
    } catch (error) {
      console.error("An error occurred while signing up:", error);
      setError("An error occurred. Please try again.");
    }
  };

  function validatePassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()|._]/.test(
      password
    );

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasSpecialChar
    );
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-8 mt-10 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <input
          className="w-full bg-white p-2 border border-gray-300 rounded mt-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        {!isLogin && (
          <input
            className="w-full bg-white p-2 border border-gray-300 rounded mt-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        )}
        <input
          className="w-full bg-white p-2 border border-gray-300 rounded mt-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          className="w-full bg-[#ff8c00] hover:bg-[#ff8c00] text-white p-3 rounded mt-4"
          type="submit"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        className="text-sm text-blue-500 hover:text-blue-600 mt-4"
        onClick={toggleForm}
      >
        {isLogin ? "Need to create an account?" : "Already have an account?"}
      </button>
    </div>
  );
}

export default AuthPage;
