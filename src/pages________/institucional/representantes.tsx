import React from "react";

export default function Representants() {
  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="max-w-screen-lg m-auto px-10 sm:px-20 py-10 my-10 bg-white font-semibold"
    >
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-7 text-center">
        Consulte o Representante para sua região
      </h1>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1DLnk5Y5tP23m0r7SwzcqwsmDjd7_pKsF&ehbc=2E312F"
        width="100%"
        height="480"
      ></iframe>
    </div>
  );
}
