import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Img, Easing} from 'remotion';
import {COLORS, FONTS, ASSETS} from '../brand';

export const Scene04Book: React.FC = () => {
  const frame = useCurrentFrame();

  const globFadeOut = interpolate(frame, [456, 480], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const bgScale = interpolate(frame, [0, 480], [1.0, 1.05], {
     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });

  // Stagger Text Centered Upper Half
  const line1Opacity = interpolate(frame, [60, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;
  const line2Opacity = interpolate(frame, [100, 118], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;
  const line3Opacity = interpolate(frame, [118, 136], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;

  // Foreground Image Enters at 150, fades up +40 to 0 over 30f
  const fgOpacity = interpolate(frame, [150, 168], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * globFadeOut;
  const fgY = interpolate(frame, [150, 180], [40, 0], {
     easing: Easing.out(Easing.quad), 
     extrapolateLeft: 'clamp', 
     extrapolateRight: 'clamp'
  });


  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bgWarmLinen}}>
      <Img 
         src={ASSETS.report}
         style={{
           position: 'absolute', 
           width: '100%', 
           height: '100%', 
           objectFit: 'cover', 
           transform: `scale(${bgScale})`,
           transformOrigin: 'center center'
         }}
      />
      {/* Linen Scrim */}
      <AbsoluteFill style={{backgroundColor: 'rgba(247, 245, 242, 0.5)'}} />

      {/* Upper Half Centered Text Container */}
      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: '15%'}}>
        
        <div 
          style={{
            fontFamily: FONTS.display,
            fontStyle: 'italic',
            fontSize: 52,
            color: COLORS.textPrimary,
            opacity: line1Opacity,
            marginBottom: 60,
          }}
        >
          "Oh. That's exactly it."
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
           <div 
             style={{
               fontFamily: FONTS.display,
               fontSize: 36,
               color: COLORS.textPrimary,
               opacity: line2Opacity,
               marginBottom: 10,
             }}
           >
             Now they know.
           </div>
           
           <div 
             style={{
               fontFamily: FONTS.display,
               fontSize: 36,
               color: COLORS.accentGold,
               opacity: line3Opacity,
             }}
           >
             And so do you.
           </div>
        </div>
      </AbsoluteFill>

      {/* Foreground Device floating bottom right */}
      <Img 
         src={ASSETS.book}
         style={{
             position: 'absolute', 
             bottom: '5%', 
             right: '5%',
             width: '30%', 
             opacity: fgOpacity,
             transform: `translateY(${fgY}px)`
         }}
      />
    </AbsoluteFill>
  );
};
