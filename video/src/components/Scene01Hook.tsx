import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, Img} from 'remotion';
import {COLORS, FONTS} from '../brand';

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Full-scene duration = 420, transition overlay starts at 420-24=396. 
  // Let's fade local text out before 420.
  const globFadeOut = interpolate(frame, [380, 420], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Text 1 enters at 120 over 18 frames
  const line1Opacity = 
    interpolate(frame, [120, 138], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) *
    globFadeOut;

  // Text 2 staggered by 18 frames (120 + 18 = 138) over 18 frames
  const line2Opacity = 
    interpolate(frame, [138, 156], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) *
    globFadeOut;

  // Ken Burns zoom: 1.0 to 1.06 over 420 frames using bezier. Easing.bezier(0.25, 0.1, 0.25, 1)
  const bgScale = interpolate(frame, [0, 420], [1.0, 1.06], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#1A1A1A'}}>
      <img 
        src="https://image.pollinations.ai/prompt/luxury%20interior%20design%20consultation%20warm%20neutral?width=1920&height=1080&nologo=true"
        style={{
           position: 'absolute', 
           width: '100%', 
           height: '100%', 
           objectFit: 'cover', 
           transform: `scale(${bgScale})`
        }}
      />
      
      {/* Cinematic dark scrim over entire image */}
      <AbsoluteFill style={{backgroundColor: 'rgba(10, 10, 10, 0.45)'}} />

      {/* Centered Typography container */}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        
        <div style={{opacity: line1Opacity, marginBottom: '20px'}}>
          <span 
            style={{
              fontFamily: FONTS.display,
              fontStyle: 'italic',
              fontSize: 48,
              color: COLORS.bgWarmLinen,
            }}
          >
            "Something warm... but clean."
          </span>
        </div>

        <div style={{opacity: line2Opacity}}>
          <span 
            style={{
              fontFamily: FONTS.display,
              fontStyle: 'italic',
              fontSize: 36,
              color: COLORS.accentGold,
            }}
          >
            "You know what I mean?"
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
