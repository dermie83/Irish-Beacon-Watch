'use client';
import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message= "error"}:ErrorMessageProps){
  return (
    <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
      {message || "Something went wrong. Please try again later."}
    </div>
  );
};

