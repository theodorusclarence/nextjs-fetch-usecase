import clsx from 'clsx';
import * as React from 'react';

export default function JsonPreview({
  data,
  className,
  varName,
}: {
  data: unknown;
  className?: string;
  varName: string;
}) {
  return (
    <pre
      className={clsx(
        'p-2 overflow-x-auto bg-white rounded shadow space-y-2',
        className
      )}
    >
      <p className='font-medium text-blue-800 font-primary'>{varName}:</p>
      {data ? (
        JSON.stringify(data, null, 2)
      ) : (
        <p className='text-red-500'>
          Exaggerated Loading (ideally skeleton).....
        </p>
      )}
    </pre>
  );
}
