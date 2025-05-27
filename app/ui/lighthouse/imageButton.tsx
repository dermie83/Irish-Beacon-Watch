import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

interface ButtonProps {
  imageSrc: string;        // Path to the image (e.g., '/images/my-icon.png')
  imageAlt: string;        // Alt text for accessibility
  onClick: () => void;     // Function to call when button is clicked
  width?: number;          // Optional: Width of the image
  height?: number;         // Optional: Height of the image
  textLabel?: string;      // Optional: Text to display below the image (for descriptive buttons)
}

const ImageButton: React.FC<ButtonProps> = ({ 
  imageSrc, 
  imageAlt, 
  onClick, 
  width = 50, // Default width
  height = 50, // Default height
  textLabel 
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column', // Arrange image and text vertically
        alignItems: 'center',    // Center items horizontally
        justifyContent: 'center',// Center items vertically
        padding: '10px',         // Adjust padding as needed
        backgroundColor: 'transparent', // Make background transparent
        border: 'none',          // Remove default button border
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.2s ease-in-out',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'} // Hover effect
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={width}
        height={height}
        priority={false} // Only set to true for very important images above the fold
      />
      {textLabel && ( // Conditionally render text label if provided
        <span style={{ marginTop: '5px', fontSize: '0.9em', color: '#333' }}>
          {textLabel}
        </span>
      )}
    </button>
  );
};

export default ImageButton;