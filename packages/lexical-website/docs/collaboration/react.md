---
sidebar_position: 1
---

# React

Below is an example of a basic plain text editor using `lexical`, `@lexical/react`, and [`yjs`](https://github.com/yjs/yjs)

```jsx
import {$getRoot, $createParagraphNode, $createTextNode} from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import * as Y from 'yjs';
import {WebsocketProvider} from 'y-websocket';

function initialEditorState(editor: LexicalEditor): void {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  const text = $createTextNode('Welcome to collab!');
  paragraph.append(text);
  root.append(paragraph);
}

function Editor() {
  const initialConfig = {
    // NOTE: This is critical for collaboration plugin to set editor state to null. It
    // would indicate that the editor should not try to set any default state
    // (not even empty one), and let collaboration plugin do it instead
    editorState: null,
    namespace: 'Demo',
    nodes: [],
    onError: (error: Error) => {
      throw error;
    },
    theme: {},
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
      />
      <CollaborationPlugin
        id="yjs-plugin"
        providerFactory={(id, yjsDocMap) => {
          const doc = new Y.Doc();
          yjsDocMap.set(id, doc);

          const provider = new WebsocketProvider(
            "ws://localhost:1234",
            id,
            doc
          );

          return provider;
        }}
        // Optional initial editor state in case collaborative Y.Doc won't
        // have any existing data on server. Then it'll user this value to populate editor.
        // It accepts same type of values as LexicalComposer editorState
        // prop (json string, state object, or a function)
        initialEditorState={initialEditorState}
        shouldBootstrap={true}
      />
    </LexicalComposer>
  );
}
```

## See it in action

<iframe width="100%" height="500" src="https://githubbox.com/facebook/lexical/tree/fix%2Fcollab_example/examples/react-rich-collab?file=%2Fsrc%2FEditor.tsx&editorsize=10" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"></iframe>

<iframe width="100%" height="500" src="https://githubbox.com/facebook/lexical/tree/fix%2Fcollab_example/examples/react-rich-collab?file=%2Fsrc%2FEditor.tsx&runonclick=1" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"></iframe>

## Yjs providers

Setting up the communication between clients, managing awareness information, and storing shared data for offline usage is quite a hassle. Providers manage all that for you and are the perfect starting point for your collaborative app.

See [Yjs Website](https://docs.yjs.dev/ecosystem/connection-provider) for the list of the officially endorsed providers. Although it's not an exaustive one.
