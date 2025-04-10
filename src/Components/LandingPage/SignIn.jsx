

import { auth, provider } from "../../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./data.css";
// import logo from "../../assets/logo.webp";
import logo from "../../assets/cm.jpg";
const SIGNUP_URL = "http://localhost:5000/api/auth/signup";
const LOGIN_URL = "http://localhost:5000/api/auth/login";

const SignIn = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const navigate = useNavigate();

  // Notification Function
  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  useEffect(() => {
    showNotification("info", "Welcome!", "Welcome to Connect Meet 🎉");
  }, []);

  // Sign-Up Function
  const onSignUp = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification("success", "Sign Up Successful!", "Please log in now.");
        form.resetFields();
      } else {
        showNotification("error", "Sign Up Failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      showNotification("warning", "Incomplete Details", "Please fill in all required fields.");
    } finally {
      setLoading(false);
    }
  };

  // Login Function
  const onLogin = async () => {
    try {
      const values = await form.validateFields(["email", "password"]);
      setLoginLoading(true);

      const userCredentials = {
        email: values.email,
        password: values.password,
      };

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        showNotification("success", "Login Successful!", "Welcome back to Connect Meet.");
        navigate("/Dashboard/*");
      } else {
        showNotification("error", "Login Failed", data.message || "Invalid credentials.");
      }
    } catch (error) {
      showNotification("warning", "Incomplete Details", "Please enter your email and password.");
    } finally {
      setLoginLoading(false);
    }
  };


  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  
  //     const response = await fetch("http://localhost:5000/api/auth/google", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: user.displayName,
  //         email: user.email,
  //         image: user.photoURL,
  //       }),
  //     });
  
  //     const data = await response.json();
  //     if (response.ok) {
  //       localStorage.setItem("user", JSON.stringify(data.user));
  //       localStorage.setItem("token", data.token);
  
  //       showNotification("success", "Google Login Successful!", "You are now signed in.");
  //       navigate("/Dashboard/*");
  //     } else {
  //       showNotification("error", "Google Sign-In Failed", "Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error signing in:", error.message);
  //     showNotification("error", "Google Sign-In Failed", "Please try again.");
  //   }
  // };
  
const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL, 
        };
  
        localStorage.setItem("user", JSON.stringify(userData)); // Save user details
  
        showNotification("success", "Google Login Successful!", "You are now signed in.");
        navigate("/Dashboard/*"); // Redirect after login
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      showNotification("error", "Google Sign-In Failed", "Please try again.");
    }
  };
  
  // In your frontend code
const onGuestLogin = async () => {
  try {
    setGuestLoading(true);
    
    // Make sure this URL matches your actual backend URL
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "guest@gmail.com", password: "123456" }),
    });

    const data = await response.json();
    
    console.log("Guest login response:", data); // Add this to debug

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Update this URL to match your local backend
      await fetch("http://localhost:5000/api/users/guest/reset-scores", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      });

      showNotification("success", "Logged in as Guest", "You are logged in as a guest.");
      navigate("/Dashboard/*");
    } else {
      showNotification("error", "Guest Login Failed", data.message || "Guest login is not available.");
    }
  } catch (error) {
    console.error("Guest login error:", error);
    showNotification("error", "Network Error", "Failed to login as guest. Please try again.");
  } finally {
    setGuestLoading(false);
  }
};
  
  return (
    <div className="start-your-journey">
      <div className="image-container">
        <img src={logo} alt="Start Your Journey" className="journey-image" />
      </div>

      <div className="form-container">
        <h2 className="form-title">Welcome to Connect Meet</h2>
        <p>Sign up or log in to continue.</p>

        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your full name!" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block onClick={onSignUp} loading={loading}>
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" block onClick={onLogin} loading={loginLoading}>
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" block onClick={onGuestLogin} loading={guestLoading}>
              Login as Guest
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" block onClick={handleGoogleSignIn} style={{ backgroundColor: "#db4437", color: "white" }}>
              Sign In with Google
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
