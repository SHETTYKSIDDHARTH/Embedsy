# @embedsy/react

> Drop-in AI chat widget for React apps — powered by [Embedsy](https://embedsy.dev)

## Installation

```bash
npm install @embedsy/react
```

## Usage

```jsx
import { EmbedsynWidget } from '@embedsy/react';

export default function App() {
  return (
    <>
      {/* Your app content */}

      <EmbedsynWidget
        projectId="your-project-id"
        apiKey="your-api-key"
        title="Ask us anything"
        position="bottom-right"
        themeColor="#00FF87"
      />
    </>
  );
}
```

## Props

| Prop         | Type   | Default          | Description                                      |
|--------------|--------|------------------|--------------------------------------------------|
| `projectId`  | string | **required**     | Your Embedsy project ID                          |
| `apiKey`     | string | **required**     | Your Embedsy API key                             |
| `title`      | string | `Chat with us`   | Title shown in the widget header                 |
| `position`   | string | `bottom-right`   | `bottom-right` or `bottom-left`                  |
| `themeColor` | string | `#00FF87`        | Accent color for the widget                      |
| `apiUrl`     | string | Embedsy backend  | Override the backend URL (for self-hosting)      |

## Getting your credentials

1. Sign up at [embedsy.dev](https://embedsy.dev)
2. Create a project and upload your documentation
3. Copy your `projectId` and `apiKey` from the dashboard

## License

MIT
