import { useState } from "react";
import type { ChangeEvent } from "react";
import { usersAPI } from "../../api/axios/users-api.ts";
import { useAppContext } from "../../api/context/context.ts";
import InputLogin from "./InputLogin.tsx";
import ButtonLogin from "./ButtonLogin.tsx";
import WrapperLoginForm from "./WrapperLoginForm.tsx";
import LeftPartOfForm from "./LeftPartOfForm.tsx";
import WrapperInput from "./WrapperInput.tsx";
import HeaderLoginForm from "./HeaderLoginForm.tsx";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { setAuthenticated, setUsers } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await usersAPI.loginUser(
        formData.username,
        formData.password
      );
      const { token, user } = response.data;

      if (!token || !user) {
        setError("Invalid response from server");
        return;
      }

      if (user.blocked === 1) {
        setError(
          "Your account has been blocked. Please contact administrator."
        );
        return;
      }

      localStorage.setItem("token", token);
      setAuthenticated(true);
      const usersResponse = await usersAPI.getUsers();
      setUsers(usersResponse.data.data);
      navigate("/users");
    } catch (error) {
      setError(`Invalid username or password ${error}`);
    }
  };

  const handleInputChange = (field: string) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <>
      <WrapperLoginForm>
        <WrapperInput>
          <HeaderLoginForm />
          <form id="loginForm" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <InputLogin
              value="Username"
              type="text"
              placeholder="Enter your username"
              className="form-control"
              onChange={handleInputChange("username")}
            />
            <InputLogin
              value="Password"
              type="password"
              placeholder="Enter your password"
              className="form-control"
              onChange={handleInputChange("password")}
            />
            <ButtonLogin
              className="btn btn-primary"
              value="Sign In"
              type="submit"
            />
            <div className="text-center mt-3">
              <a href="/register" className="text-decoration-none">
                Don't have an account? Register
              </a>
            </div>
          </form>

          <div className="d-flex justify-content-between small text-muted">
            <span>
              Don't have an account? <a href="#">Sign up</a>
            </span>
            <a href="#">Forgot password?</a>
          </div>
        </WrapperInput>
        <LeftPartOfForm />
      </WrapperLoginForm>
    </>
  );
}

//types
