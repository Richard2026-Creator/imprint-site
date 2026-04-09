import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

import {Scene01Hook}   from './Scene01Hook'; // Internal conceptual name: Scene 1 The Gap
import {Scene02Pain}   from './Scene02Pain'; // Internal conceptual name: Scene 2 Built
import {Scene03Method} from './Scene03Method'; // Internal conceptual name: Scene 3 Swipes
import {Scene04Book}   from './Scene04Book'; // Internal conceptual name: Scene 4 The Result
import {Scene05Report} from './Scene05Report'; // Internal conceptual name: Scene 5 Studio Intel
import {Scene06CTA}    from './Scene06CTA'; // Internal conceptual name: Scene 6 The Close

const FADE_T = 24;

export const ImprintReel: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* 01 — The Gap: 420f */}
        <TransitionSeries.Sequence durationInFrames={420}>
          <Scene01Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: FADE_T})}
        />

        {/* 02 — Built: 420f */}
        <TransitionSeries.Sequence durationInFrames={420}>
          <Scene02Pain />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: FADE_T})}
        />

        {/* 03 — Client Swipes: 540f */}
        <TransitionSeries.Sequence durationInFrames={540}>
          <Scene03Method />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: FADE_T})}
        />

        {/* 04 — The Result: 480f */}
        <TransitionSeries.Sequence durationInFrames={480}>
          <Scene04Book />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: FADE_T})}
        />

        {/* 05 — Studio Intelligence: 480f */}
        <TransitionSeries.Sequence durationInFrames={480}>
          <Scene05Report />
        </TransitionSeries.Sequence>

        {/* HARD CUT to Scene 6, no transition */}

        {/* 06 — The Close: 456f */}
        <TransitionSeries.Sequence durationInFrames={456}>
          <Scene06CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Total duration calculation:
// 420 + 420 + 540 + 480 + 480 + 456 = 2796
// minus 4 fade transitions (4 * 24 = 96)
// Total frames = 2700 (Exactly 90.0 seconds at 30 fps)
export const TOTAL_FRAMES = 2700;
