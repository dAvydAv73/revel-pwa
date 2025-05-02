// components/ClientWrapper/ClientWrapper.js
'use client';

import { ScrollToAnchor } from '../ScrollToAnchor';

export function ClientWrapper({ children }) {
  return (
    <>
      <ScrollToAnchor />
      {children}
    </>
  );
}
