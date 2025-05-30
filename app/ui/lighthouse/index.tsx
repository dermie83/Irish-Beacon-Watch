'use client'; // This directive is correct for client-side components

import React from 'react';
import ImageButton from './imageButton'; // Assuming imageButton.tsx is in the same directory
import { useRouter} from 'next/navigation';
import { LighthouseType } from "@/app/lib/definitions";


export default function LighthouseImageButtons(lighthouse: LighthouseType) {
  const router = useRouter();

  const handleImageClick = (lighthouseName: string) => {
    router.push(`forecast?page=1&query=${lighthouseName}`);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <ImageButton
          key={lighthouse.id} // Essential for mapping over arrays in React
          imageSrc={lighthouse.image_url}
          imageAlt={lighthouse.name}
          textLabel={lighthouse.name} // Display the lighthouse name as a text label
          onClick={() => handleImageClick(lighthouse.name)} // Pass the dynamic name to the handler
          width={250} // Example size
          height={300} // Example size
        />
    </div>
  );
};