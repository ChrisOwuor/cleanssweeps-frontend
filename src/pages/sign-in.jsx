import React, { useState } from "react";
import { Input, Button, Typography, Radio } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";

export function SignIn() {
  const { login, loading } = useAuth(); // Get signIn and loading from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [userType, setUserType] = useState("organization");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(formData, userType); // Use the signIn function from context
      alert("Sign-in successful!");
      navigate("/");
    } catch (error) {
      alert(error.message); // Handle errors gracefully
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSignIn}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Radio
              label="Organization Sign Up"
              checked={userType === "organization"}
              onChange={() => setUserType("organization")}
            />
            <Radio
              label="Volunteer Sign Up"
              checked={userType === "volunteer"}
              onChange={() => setUserType("volunteer")}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit" disabled={loading}>
            {loading ? "Processing..." : "Sign In"}
          </Button>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Not registered?
            <Link to="/sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}
