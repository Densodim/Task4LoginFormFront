import { useState } from "react";
import type { ChangeEvent } from "react";
import { usersAPI } from "../../api/axios/users-api.ts";
import { useNavigate } from "react-router-dom";
import InputLogin from "../LoginForm/InputLogin.tsx";
import ButtonLogin from "../LoginForm/ButtonLogin.tsx";
import WrapperLoginForm from "../LoginForm/WrapperLoginForm.tsx";
import LeftPartOfForm from "../LoginForm/LeftPartOfForm.tsx";
import WrapperInput from "../LoginForm/WrapperInput.tsx";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await usersAPI.createUser(
        formData.username,
        formData.email,
        formData.password
      );
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
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
    <WrapperLoginForm>
      <LeftPartOfForm />
      <div className="col-md-6">
        <WrapperInput>
          <div className="mb-4">
            <div className="fs-4 fw-bold text-primary">THE APP</div>
            <div className="text-muted mt-2">Start your journey</div>
            <h2 className="card-title h3 mb-4">Create Account</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <InputLogin
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange("username")}
              className="form-control"
            />
            <InputLogin
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className="form-control"
            />
            <InputLogin
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange("password")}
              className="form-control"
            />
            {error && <div className="text-danger mb-3">{error}</div>}
            <ButtonLogin
              type="submit"
              value="Register"
              className="btn btn-primary"
            />
            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none">
                Already have an account? Login
              </a>
            </div>
          </form>
        </WrapperInput>
      </div>
    </WrapperLoginForm>
  );
}
