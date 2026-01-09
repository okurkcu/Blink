import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BackIconProps {
  size?: number;
  color?: string;
}

export default function BackIcon({ size = 15, color = '#1E1E1E' }: BackIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Path
        d="M13.8333 7.41667H1M1 7.41667L7.41667 13.8333M1 7.41667L7.41667 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}







