'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectModals from './components/ProjectModals';

// This wrapper is used to make sure modals are only loaded once on the client-side
export default function ProjectsClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const modalsMountedRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
    modalsMountedRef.current = true;
  }, []);

  return (
    <>
      {children}
      {isClient && <ProjectModals />}
    </>
  );
}
