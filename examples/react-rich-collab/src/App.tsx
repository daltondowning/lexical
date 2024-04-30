/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {useRef, useState} from 'react';

import Editor from './Editor';
import ExampleTheme from './ExampleTheme';
import {getRandomUserProfile} from './getRandomUserProfile';
import {$initialEditorState} from './initialEditorState';
import {createWebRTCProvider, createWebsocketProvider} from './providers';

const editorConfig = {
  // NOTE: This is critical for collaboration plugin to set editor state to null. It
  // would indicate that the editor should not try to set any default state
  // (not even empty one), and let collaboration plugin do it instead
  editorState: null,
  namespace: 'React.js Collab Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

export default function App() {
  const providerName =
    new URLSearchParams(window.location.search).get('provider') ?? 'webrtc';
  const [userProfile, setUserProfile] = useState(() => getRandomUserProfile());
  const containerRef = useRef<HTMLDivElement | null>(null);

  // TODO:
  // 1. containerRef doesn't work
  // 2. Hostory revert doesn't propagate to other side
  // 3. Awareness: people online, color selector
  // 4. WSS Server - storage
  // 5. Offline mode - support correct lost of connection & resume

  return (
    <div ref={containerRef}>
      <p>
        <b>Used provider:</b>{' '}
        {providerName === 'webrtc'
          ? 'WebRTC (within browser communication via BroadcastChannel fallback, unless run locally)'
          : 'Websockets (cross-browser communication)'}
      </p>
      <p>
        <b>My Username:</b>{' '}
        <input
          type="text"
          value={userProfile[0]}
          onChange={(e) => setUserProfile([e.target.value, userProfile[1]])}
        />
      </p>
      <LexicalComposer initialConfig={editorConfig}>
        <CollaborationPlugin
          id="lexical/react-rich-collab"
          providerFactory={
            providerName === 'webrtc'
              ? createWebRTCProvider
              : createWebsocketProvider
          }
          // Optional initial editor state in case collaborative Y.Doc won't
          // have any existing data on server. Then it'll user this value to populate editor.
          // It accepts same type of values as LexicalComposer editorState
          // prop (json string, state object, or a function)
          initialEditorState={$initialEditorState}
          shouldBootstrap={true}
          username={userProfile[0]}
          cursorColor={userProfile[1]}
          cursorsContainerRef={containerRef}
        />
        <Editor />
      </LexicalComposer>
    </div>
  );
}
