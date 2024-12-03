import React, { useState } from "react";
import { Input, Button, Typography, Radio } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";

export function SignUp() {
  const { signUp, loading } = useAuth(); // Get signUp and loading from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [userType, setUserType] = useState("organization"); // Default user type

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData, userType); // Pass user type during sign-up
      alert("Sign-up successful!");
    } catch (error) {
      alert(error.message); // Handle errors gracefully
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to register.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSignUp}
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
              name
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="John Smith"
              name="name"
              value={formData.name}
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
          </div>
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
          <Button className="mt-6" fullWidth type="submit" disabled={loading}>
            {loading ? "Processing..." : "Register Now"}
          </Button>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}
