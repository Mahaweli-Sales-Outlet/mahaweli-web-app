import React from "react";
import { Link } from "react-router-dom";

const RegisterLink: React.FC = () => (
  <div className="text-center mt-4">
    <p className="text-sm text-gray-600">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="text-green-600 hover:text-green-700 font-medium"
      >
        Register here
      </Link>
    </p>
  </div>
);

export default RegisterLink;
