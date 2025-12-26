import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BookmarkIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export default function BookmarkIcon({ size = 15, color = '#1E1E1E', filled = false }: BookmarkIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Path
        d="M3.75 1.5H11.25C11.6642 1.5 12 1.83579 12 2.25V13.5L7.5 10.5L3 13.5V2.25C3 1.83579 3.33579 1.5 3.75 1.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}

