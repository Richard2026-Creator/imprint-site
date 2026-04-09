import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, Img} from 'remotion';
import {COLORS, FONTS, ASSETS} from '../brand';

export const Scene03Method: React.FC = () => {
  const frame = useCurrentFrame();

  const globFadeOut = interpolate(frame, [516, 540], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Background zoom out 1.08 -> 1.0
  const bgScale = interpolate(frame, [0, 540], [1.08, 1.0], {
     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });

  // ImprintTwo Float entry (frame 60, duration 24 frames, +80x to 0)
  const fgOpacity = interpolate(frame, [60, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;
  const fgX = interpolate(frame, [60, 84], [80, 0], {
     easing: Easing.out(Easing.quad),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });

  // Float logic: Y oscillatory 0 to -8 over 90f 
  // We use Math.sin based on frame count normalized over 90f cycle (PI*2 / 90)
  // Shift to start at 0 using -Math.sin or offset so it doesn't jump at f60
  // Note: we can map the sine wave range [-1, 1] to [0, -8]
  const phase = ((frame - 60) % 90) / 90 * Math.PI * 2;
  const fgY = (Math.sin(phase - Math.PI/2) + 1) * -4; // Math.sin starts bottom, goes up

  // Staggered Text - Left aligned over scrim
  const line1Opacity = interpolate(frame, [90, 108], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;
  const line2Opacity = interpolate(frame, [108, 126], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;
  const line3Opacity = interpolate(frame, [150, 168], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;


  return (
    <AbsoluteFill style={{backgroundColor: '#1A1A1A'}}>
      
      {/* Dynamic Rendered Background */}
      <img 
         src="https://image.pollinations.ai/prompt/couple%20looking%20at%20phone%20together%20laughing%20home%20warm%20light?width=1920&height=1080&nologo=true" 
         style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transform: `scale(${bgScale})`,
            transformOrigin: 'center center'
         }}
      />

      {/* Dark Scrim */}
      <AbsoluteFill style={{backgroundColor: 'rgba(10, 10, 10, 0.5)'}} />

      {/* Foreground Device - Imprint Two - 35% frame width right of center vertically centered */}
      <div 
         style={{
            position: 'absolute',
            width: '35%',
            top: '50%',
            left: '55%',
            transform: `translateY(-50%)`, // Base vertical center
         }}
      >
         <Img 
            src={ASSETS.twoClients}
            style={{
               width: '100%',
               height: 'auto',
               opacity: fgOpacity,
               transform: `translate(${fgX}px, ${fgY}px)`
            }}
         />
      </div>

      {/* Text Container - Left Aligned */}
      <AbsoluteFill style={{justifyContent: 'center', paddingLeft: '8%', paddingRight: '50%'}}>
        
        <div style={{opacity: line1Opacity, marginBottom: 10}}>
          <span 
            style={{
              fontFamily: FONTS.display,
              fontSize: 52,
              color: COLORS.bgWarmLinen,
            }}
          >
            They swipe.
          </span>
        </div>
        
        <div style={{opacity: line2Opacity, marginBottom: 40}}>
          <span 
            style={{
              fontFamily: FONTS.display,
              fontSize: 48,
              color: COLORS.bgWarmLinen,
            }}
          >
            They sort.
          </span>
        </div>

        <div style={{opacity: line3Opacity}}>
          <span 
            style={{
              fontFamily: FONTS.display,
              fontStyle: 'italic',
              fontSize: 48,
              color: COLORS.accentGold,
            }}
          >
            They show you who they are.
          </span>
        </div>

      </AbsoluteFill>

    </AbsoluteFill>
  );
};
