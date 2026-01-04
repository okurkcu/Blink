import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface LogoIconProps {
  size?: number;
  color?: string;
}

export default function LogoIcon({ size = 24, color = '#000000' }: LogoIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Simple eye/blink logo design */}
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
      <Circle cx="12" cy="12" r="3" fill={color} />
      {/* Eyelids for blink effect */}
      <Path
        d="M4 12 Q12 8, 20 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
