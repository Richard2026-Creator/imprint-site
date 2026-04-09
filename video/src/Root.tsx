import React from 'react';
import {Composition} from 'remotion';
import {loadFont as loadCormorant} from '@remotion/google-fonts/CormorantGaramond';
import {loadFont as loadDMSans} from '@remotion/google-fonts/DMSans';
import {ImprintReel, TOTAL_FRAMES} from './components/ImprintReel';
import {W, H, FPS} from './brand';

// Register fonts early to ensure they are available to the layout engine
loadCormorant();
loadDMSans();

export const RemotionRoot: React.FC = () => {
  // Ensure duration is a valid safe integer for Remotion
  const duration = Math.max(1, Math.floor(TOTAL_FRAMES));

  return (
    <>
      <Composition
        id="ImprintReel"
        component={ImprintReel}
        durationInFrames={duration}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Portrait / Reels variant (9:16) */}
      <Composition
        id="ImprintReelPortrait"
        component={ImprintReel}
        durationInFrames={duration}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
