Live Web Editing

A scratch project where I'm testing text editing mechanisms focused on sending small packets between clients to enable low-latency collaborative editing.

The current module under test.htm uses a Lit-based Web Component that captures and stores it's per-character input, and produces a progress bar that can be used to rewind its input, including any mistakes or deletions. This is a micro-level implementation of a concept used in Google Wave to rewind large conversation threads to earlier dates and understand what's happeneing.

![A moving demo of the textbox and its rewind bar](https://raw.githubusercontent.com/TotalChris/Live-Web-Editing/main/demo.gif)

The ideal usage would be for chat-like apps such as iMessage, Snapchat, or Messenger to transmit small packets of text between clients so that users on the other side can see what is being typed as it is typed, like PTT on mobile phones. The rewind feature was intended purely for demo purposes, but it could be used by end-users if it were popular enough.