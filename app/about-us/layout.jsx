import React from 'react';

export default function AboutLayout({ children }) {
  return (
    <section className="about-layout-wrapper">
   
      <main>
        {children}
      </main>
    </section>
  );
}