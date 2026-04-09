import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Img, Easing} from 'remotion';
import {COLORS, FONTS, ASSETS} from '../brand';

export const Scene02Pain: React.FC = () => {
  const frame = useCurrentFrame();

  const globFadeOut = interpolate(frame, [396, 420], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Text 1 enters at frame 60, takes 18 fames
  const line1Opacity = 
    interpolate(frame, [60, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;

  // Text 2 staggered 18 frames later
  const line2Opacity = 
    interpolate(frame, [96, 114], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;
    
  // Text 3 staggered
  const line3Opacity = 
    interpolate(frame, [132, 150], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;

  // Text 4 staggered
  const line4Opacity = 
    interpolate(frame, [192, 210], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;

  // Motion: drift image left (-30px) so the camera feels like it drifts right
  const driftX = interpolate(frame, [0, 420], [0, -30], {
     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bgWarmLinen}}>
      
      {/* Full-bleed background with drift */}
      <AbsoluteFill style={{ padding: 0 }}>
         <Img 
            src={ASSETS.inHand} 
            style={{
               position: 'absolute',
               width: 'calc(100% + 30px)', // Overscan to allow the 30px translation without clipping
               height: '100%', 
               objectFit: 'cover',
               transform: `translateX(${driftX}px)`
            }} 
         />
      </AbsoluteFill>

      {/* Linen Scrim Full Bleed */}
      <AbsoluteFill style={{backgroundColor: 'rgba(247, 245, 242, 0.55)'}} />

      {/* Lower Third, Left-Aligned Text */}
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: '15%', paddingLeft: '8%'}}>
        
        <div 
          style={{
            fontFamily: FONTS.display,
            fontSize: 48,
            color: COLORS.textPrimary,
            opacity: line1Opacity,
            marginBottom: 10,
          }}
        >
          The session is built.
        </div>
        
        <div 
          style={{
            fontFamily: FONTS.display,
            fontSize: 48,
            color: COLORS.textPrimary,
            opacity: line2Opacity,
            marginBottom: 10,
          }}
        >
          The instinct is captured.
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div 
            style={{
              fontFamily: FONTS.display,
              fontSize: 48,
              color: COLORS.textPrimary,
              opacity: line3Opacity,
              marginRight: 10,
            }}
          >
            And they
          </div>
          <div 
            style={{
              fontFamily: FONTS.display,
              fontStyle: 'italic',
              fontSize: 48,
              color: COLORS.accentGold,
              opacity: line4Opacity,
            }}
          >
            actually use it.
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
