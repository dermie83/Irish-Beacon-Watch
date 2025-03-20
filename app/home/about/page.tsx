import React from 'react';

export default async function Page(){
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
      </header>

      {/* Introduction Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <p className="text-lg text-gray-700">
          We are a passionate team focused on delivering high-quality web solutions to help businesses thrive online.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Our mission is to provide innovative and affordable digital tools that empower small and medium-sized businesses to reach their full potential.
        </p>
      </section>

      {/* Story Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-lg text-gray-700">
          Founded in 2015, we started with a small team of developers working out of a shared office. Since then, we've grown to become a trusted partner for businesses worldwide.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
        <div className="flex justify-center gap-10">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-800">Dermie Madsen</h3>
            <p className="text-gray-600">Student Developer</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-800">SETU Waterford</h3>
            <p className="text-gray-600">HDip in Computer Science</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-700 mb-4">
          Want to learn more about the SETU HDip course in computer science? Feel free to{' '}
          <a href="https://www.setu.ie/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">contact SETU</a> for more information!
        </p>
      </section>
    </div>
  );
};
