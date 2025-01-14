import { VideoComponent } from '../optionalDependencies/Video';

export const Video = VideoComponent
  ? ({ onPlaybackStatusUpdate, paused, resizeMode, style, uri, videoRef }) => (
      <VideoComponent
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        ref={videoRef}
        resizeMode={resizeMode}
        shouldPlay={!paused}
        source={{
          uri,
        }}
        style={[style]}
      />
    )
  : null;
