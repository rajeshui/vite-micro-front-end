# Vite Module Federation Demo

This is a demonstration of Vite's Module Federation plugin, which allows you to create micro-frontends and share components across different applications.

## Project Structure

- `index.html`: This is the main HTML file that loads the Vite application.
- `index.tsx`: This is the main entry point for the Vite application.
- `App.tsx`: This is the main component of the application, which renders the `DashboardContent` component.
- `components/RemoteModule.tsx`: This is a component that is loaded from a remote application using Module Federation.
- `context/SharedContext.tsx`: This file contains the context and provider for sharing state between different parts of the application.
- `vite.config.ts`: This file contains the Vite configuration for the application, including the Module Federation plugin configuration.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/vite-module-federation-demo.git`
2. Install dependencies: `npm install`
3. Start the application: `npm run dev`
4. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## How it Works

This application uses Module Federation to load components from a remote application. When the `RemoteModule` component is rendered, it loads the module from the remote application using the `createRemote` function. The `createRemote` function is provided by the Module Federation plugin.

The remote application exposes its modules using the `expose` function, which tells Module Federation how to load the module. In this case, the remote application exposes the `RemoteModule` component using the `expose` function.

The `RemoteModule` component then renders the remote component using the `React.lazy` function, which asynchronously loads the component from the remote application.

The application also shares state between different parts of the application using a shared context. The `SharedContext` provider is wrapped around the entire application, and the `SharedProvider` component is used to provide the shared state to the `DashboardContent` component. The `useSharedState` hook is used to access the shared state in the `RemoteModule` component.

## Conclusion

This project demonstrates how to use Module Federation to create micro-frontends and share components across different applications. It also shows how to share state between different parts of the application using a shared context.

I hope you find this project helpful! Let me know if you have any questions or suggestions.
