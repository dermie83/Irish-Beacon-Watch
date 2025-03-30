import Footer from '@/app/ui/footer';
import React from 'react';

export default async function getServerSideProps(){
  return (
      <>
        <div className="max-w-4xl mx-auto p-6">
          {/* Header Section */}
          <header className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">About Me</h1>
          </header>
          {/* Introduction Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
            <p className="text-lg text-gray-700">
              I am student of computer science with a keen interest in Lighthouses, education and open source technology.
            </p>
          </section>
          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Mission</h2>
            <p className="text-lg text-gray-700">
            My mission is to create an affordable, educational application that harnesses open-source software to enhance 
            accessibility and value. This project aims to continuously evolve, with regular updates and new features, 
            and may eventually expand to showcase lighthouse data from around the world.
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
        <footer className="w-full bg-gray-800 text-white text-center p-4 mt-4 text-sm md:text-base">
          <Footer />
        </footer>
    </>
  );
};
