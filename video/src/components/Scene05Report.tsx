import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, Img} from 'remotion';
import {COLORS, FONTS, ASSETS} from '../brand';

export const Scene05Report: React.FC = () => {
  const frame = useCurrentFrame();

  // Background pan (+40 to 0) AND Zoom (1.0 to 1.04)
  const bgScale = interpolate(frame, [0, 480], [1.0, 1.04], {
     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });
  
  const bgY = interpolate(frame, [0, 480], [40, 0], {
     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });

  // Vignette layer drift (0 to -20px)
  const driftVignetteX = interpolate(frame, [0, 480], [0, -20], {
     easing: Easing.bezier(0.25, 0.1, 0.25, 1),
     extrapolateLeft: 'clamp',
     extrapolateRight: 'clamp'
  });

  // Entry Fades
  const logoOpacity = interpolate(frame, [60, 78], [0, 0.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Text Logic: bottom third, staggered 18 frames apart
  const line1Opacity = interpolate(frame, [100, 118], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const line2Opacity = interpolate(frame, [118, 136], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const line3Opacity = interpolate(frame, [136, 154], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});


  return (
    <AbsoluteFill style={{backgroundColor: '#1A1A1A'}}>
      
      {/* Primary Analytics Background */}
      <AbsoluteFill style={{ padding: 0 }}>
         <Img 
            src={ASSETS.analytics} 
            style={{
               position: 'absolute',
               width: '100%', 
               height: 'calc(100% + 40px)', // Overscan Y to allow 40px pan
               top: -40, // Base offset
               objectFit: 'cover', 
               transform: `scale(${bgScale}) translateY(${bgY}px)`,
               transformOrigin: 'bottom center' // Anchors scale so the Y drift remains clean
            }} 
         />
      </AbsoluteFill>
      
      {/* People Vignette Layer */}
      <div 
        style={{
           position: 'absolute', 
           top: 0, 
           left: 0, 
           height: '100%', 
           width: '25%', // 25% Frame width per specs
           opacity: 0.7, 
           maskImage: 'linear-gradient(to right, black 20%, transparent 100%)', 
           WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
           transform: `translateX(${driftVignetteX}px)`
        }}
      >
         <img 
            src="https://image.pollinations.ai/prompt/interior%20designer%20confident%20desk%20studio%20working?width=1920&height=1080&nologo=true" 
            style={{width: '100%', height: '100%', objectFit: 'cover'}} 
         />
      </div>

      {/* Top Right Logo */}
      <Img 
         src={ASSETS.logo} 
         style={{position: 'absolute', top: 32, right: 32, width: 120, opacity: logoOpacity}} 
      />

      {/* Scrim Overlay applied only to bottom 30% for text gradient readability */}
      <div 
         style={{
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            height: '30%', 
            background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.7) 100%)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            paddingLeft: '8%',
            paddingBottom: '5%'
         }}
      >
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div 
            style={{
              fontFamily: FONTS.display,
              fontSize: 42,
              color: COLORS.bgWarmLinen,
              opacity: line1Opacity,
              marginRight: 20
            }}
          >
            Every session recorded.
          </div>
          
          <div 
            style={{
              fontFamily: FONTS.display,
              fontSize: 42,
              color: COLORS.bgWarmLinen,
              opacity: line2Opacity,
              marginRight: 20
            }}
          >
            Every pattern visible.
          </div>

          <div 
            style={{
              fontFamily: FONTS.display,
              fontStyle: 'italic',
              fontSize: 42,
              color: COLORS.accentGold,
              opacity: line3Opacity,
            }}
          >
            Built in.
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
