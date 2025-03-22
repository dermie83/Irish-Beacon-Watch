import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2025 IBW. All rights reserved.</p>
        <div className="mt-2">
          <a href="https://www.irishlights.ie/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white mx-2">Inspired by Irish Lights</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
