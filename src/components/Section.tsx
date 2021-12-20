import React from 'react';

interface SectionProps {
  children: React.ReactNode;
}

export default function Section(props: SectionProps) {
  return <div className="section">{props.children}</div>;
}

export const SectionTitle = (props: SectionProps) => (
  <div className="section__title">{props.children}</div>
);

export const SectionBody = (props: SectionProps) => (
  <div className="section__body">{props.children}</div>
);
