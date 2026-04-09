import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, Img} from 'remotion';
import {COLORS, FONTS, ASSETS} from '../brand';

export const Scene06CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Final 20 frames composition fade to solid linen
  const fadeOutOpacity = interpolate(frame, [436, 456], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Fades
  const logoOpacity = interpolate(frame, [60, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const imgOpacity = interpolate(frame, [90, 108], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const urlOpacity = interpolate(frame, [126, 144], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); // 18 frames after device 108+18=126

  // Micro Scale 0.97 to 1.0 over 30f
  const imgScale = interpolate(frame, [90, 120], [0.97, 1.0], {
     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bgWarmLinen}}>
      
      {/* Outer wrapper manages the fadeOut to the underlying #F7F5F2 frame layer */}
      <AbsoluteFill style={{opacity: fadeOutOpacity, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        
        {/* Replace wordmark text with SVG Width: 180px */}
        <Img 
           src={ASSETS.logo} 
           style={{width: 180, opacity: logoOpacity, marginBottom: 50}} 
        />
        
        {/* Device Image */}
        <div style={{width: '50%', marginBottom: 50}}>
           <Img 
              src={ASSETS.desktopMob} 
              style={{
                 width: '100%', 
                 opacity: imgOpacity, 
                 transform: `scale(${imgScale})` 
              }} 
           />
        </div>

        {/* URL String */}
        <div 
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            letterSpacing: 4,
            color: COLORS.textPrimary,
            opacity: urlOpacity,
          }}
        >
          useimprint.design
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
