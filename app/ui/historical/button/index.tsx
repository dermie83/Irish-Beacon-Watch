'use client';

import { reformatDate } from '@/app/lib/utils';
import Button from './yearlyRangeChangebutton';
import { useRouter, useSearchParams } from 'next/navigation';

const YearRangeButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleYearRangeChange = (start: string, end: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('startDate', start);
    params.set('endDate', end);
    
    // Preserve existing query params like page and search
    router.push(`?${params.toString()}`);
  };

  const date = new Date().toISOString();
  const formattedDate = reformatDate(date);
  

  return (
    <>
    <div className="flex space-x-4">
      <div style={{ padding: '10px' }}>
        <Button label="2000-2009" onClick={()=>handleYearRangeChange('2000-01-01', '2009-12-31')} />
      </div>
      <div style={{ padding: '10px' }}>
        <Button label="2010-2019" onClick={()=>handleYearRangeChange('2010-01-01', '2019-12-31')} />
      </div>
      <div style={{ padding: '10px' }}>
        <Button label="2020" onClick={()=>handleYearRangeChange('2020-01-01', '2020-12-31')} />
      </div>
      <div style={{ padding: '10px' }}>
        <Button label="2021" onClick={()=>handleYearRangeChange('2021-01-01', '2021-12-31')} />
      </div>
      <div style={{ padding: '10px' }}>
        <Button label="2022" onClick={()=>handleYearRangeChange('2022-01-01', '2022-12-31')} />
      </div>
      <div style={{ padding: '10px' }}>
        <Button label="2023" onClick={()=>handleYearRangeChange('2023-01-01', '2023-12-31')} />
      </div>
      <div style={{ padding: '10px' }}>
        <Button label="2024" onClick={()=>handleYearRangeChange('2024-01-01', '2024-12-31')} />
      </div>
      <div style={{ padding: '10px' }}>
        <Button label="2025" onClick={()=>handleYearRangeChange('2025-01-01', formattedDate)} />
      </div>
    </div>
    </>
  );
};

export default YearRangeButtons;