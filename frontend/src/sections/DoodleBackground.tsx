"use client";
import React from 'react';
import { 
  Dna, 
  FlaskConical, 
  Microscope, 
  Syringe, 
  TestTube, 
  Pill, 
  Scan,
  FlaskRound, 
  Atom
} from 'lucide-react';

export default function DoodleBackground() {
  // Array of different background elements using Lucide React icons
  const doodleElements = [
    // DNA
    <Dna key="dna-1" size={40} className="text-gray-400 opacity-10" />,
    // Flask
    <FlaskConical key="flask" size={38} className="text-gray-400 opacity-10" />,
    // Microscope
    <Microscope key="microscope" size={42} className="text-gray-400 opacity-10" />,
    // Syringe
    <Syringe key="syringe" size={38} className="text-gray-400 opacity-10" />,
    // Test Tube
    <TestTube key="testtube" size={40} className="text-gray-400 opacity-10" />,
    // Pill
    <Pill key="pill" size={36} className="text-gray-400 opacity-10" />,
    // Scan
    <Scan key="scan" size={38} className="text-gray-400 opacity-10" />,
    // Round Flask
    <FlaskRound key="flaskround" size={38} className="text-gray-400 opacity-10" />,
    // Atom
    <Atom key="atom" size={42} className="text-gray-400 opacity-10" />,
    
    // Custom SVGs for items not available in Lucide
    
    // DNA base pairs ATGC
    <svg key="atgc" width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
      <text x="5" y="20" fill="#666666" fontSize="16" fontWeight="bold">A</text>
      <text x="30" y="20" fill="#666666" fontSize="16" fontWeight="bold">T</text>
      <text x="55" y="20" fill="#666666" fontSize="16" fontWeight="bold">G</text>
      <text x="80" y="20" fill="#666666" fontSize="16" fontWeight="bold">C</text>
      <line x1="10" y1="30" x2="90" y2="30" stroke="#666666" strokeWidth="1" strokeDasharray="5,5"/>
      <text x="5" y="45" fill="#666666" fontSize="16" fontWeight="bold">T</text>
      <text x="30" y="45" fill="#666666" fontSize="16" fontWeight="bold">A</text>
      <text x="55" y="45" fill="#666666" fontSize="16" fontWeight="bold">C</text>
      <text x="80" y="45" fill="#666666" fontSize="16" fontWeight="bold">G</text>
    </svg>,
    
    // Chromosome
    <svg key="chromosome" width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
      <path d="M15 10C15 10 10 20 10 40C10 60 15 70 15 70" stroke="#666666" strokeWidth="2"/>
      <path d="M25 10C25 10 30 20 30 40C30 60 25 70 25 70" stroke="#666666" strokeWidth="2"/>
      <path d="M15 20H25M15 30H25M15 40H25M15 50H25M15 60H25" stroke="#666666" strokeWidth="1" strokeLinecap="round"/>
    </svg>,
  ];

  // Generate a larger number of positions that will cover the whole page
  const generatePositions = (count: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        top: `${Math.random() * 98}%`,
        left: `${Math.random() * 98}%`
      });
    }
    return positions;
  };

  // Create positions for the entire page - using more positions to cover all sections
  const positions = generatePositions(25);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {positions.map((position, index) => {
        // Select a random element
        const elementIndex = Math.floor(Math.random() * doodleElements.length);
        const element = doodleElements[elementIndex];
        
        // Create a random rotation
        const rotation = Math.floor(Math.random() * 360);
        
        return (
          <div 
            key={`doodle-${index}`} 
            className="absolute"
            style={{
              top: position.top,
              left: position.left,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
}