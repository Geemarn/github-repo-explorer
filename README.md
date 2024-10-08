# Github Repo Explorer

https://github-repo-explorer-htz2vg9kb-geemarns-projects.vercel.app/

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing the Code](#testing-the-code)
- [Linting](#linting)
- [Deployment](#deployment)

## Getting Started

This is a [React.js](https://react.dev/) application built using [Vite](https://vite.dev/).

- It uses a folder structure similar to next.js app router architecture.
- Data fetch and caching is done sing swr
- MUI is used as the UI library
- Testing is carried out using testing-library/react (vitest), cypress, storybook
- Linting and code formatting is done using eslint and prettier

### Prerequisites

- Node.js version 20 or higher
- Package manager - Yarn

| Main Tools | Usage             | Version  |
  |------------|-------------------|----------|
| Typescript | Language          | ^5       |
| React      | Project Framework | ^18.3.1  |
| MUI        | UI Library        | ^6.1.2   |
| SWR        | data fetcher      | ^2.2.5   |
| Vitest     | Testing ENV       | ^2.1.2   |
| Storybook  | visual testing    | ^8.3.5   |
| Cypress    | e2e testing       | ^13.15.0 |

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Geemarn/github-repo-explorer.git
   ```
   ```bash
   cd Github repositories explorer
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```

### Running the App

#### Locally

To start the development server, run the following command:

```bash
yarn dev
```

This will serve the app at [http://localhost:3000](`http://localhost:3000)

### Testing the Code

To run the test suites:

#### Unit test

```bash
yarn test
```

#### Storybook

```bash
yarn storybook
```

#### Cypress

```bash
yarn cypress:run
```

### Linting

```bash
yarn lint
```

### Deployment

deployment is carried using [Vercel](https://vercel.com/)

- visit [App](https://github-repo-explorer-htz2vg9kb-geemarns-projects.vercel.app/) to view in prodction