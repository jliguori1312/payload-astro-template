# Payload Website Template with Astro

A one-to-one rebuild of the Payload CMS website template using Astro instead of Next.js. The goal is to replicate the features and design of the original website template while demonstrating the use of Astro as a frontend framework alongside Payload. This setup is ideal for content-heavy sites that don't require frequent updates.

## Features

- **Frontend Flexibility**: Demonstrates an approach to using a frontend framework other than Next.js, using the local API and Astro.
- **Payload CMS Integration**: Utilizes Payload as normal, with minimal changes to the Payload configuration.
- **Design Replication**: The design aims to replicate the official Payload website template as closely as possible, using the exact same react components where possible and the exact same seed data and styling.
- **Statically Generated**: Built with Astro, this template generates static HTML files at build time, making it fast and efficient.


## Getting Started

### Prerequisites

- Node.js
- pnpm (The project depends on pnpm workspaces)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/yourusername/payload-astro-template.git
   cd payload-astro-template
   pnpm install
   ```
2. Set up your environment variables:
    Copy `.env.example` to `.env` in both `app-frontend` and `app-payload`, and add your database connection and other info.

3. Start the Payload dev server:

   ```bash
   cd app-payload
   pnpm run dev
   ```
   Navigate to `http://localhost:3000` Create a user, then run the seed script from the link on the dashboard, or add your own content.

4. Start the Astro dev server:
    ```bash
    cd app-frontend
    pnpm run dev
    ```
    Navigate to `http://localhost:4321` and you should see the site with the content you added.

## Deployment

You can deploy the frontend anywhere you want as a static site. The backend can be deployed just as you would any other Payload project. As long as the Payload Config file that is provided to the frontend is kept in sync with your Payload deployment (for example by deploying both front and backends from one repo like this one), then during the Astro build the content loader will use the local API to access the database directly without needing your Payload instance at all. The Payload instance exists soley to be used as an Admin panel for editing, to process any forms if you're using them, and to provide images on page load, depending on how you're handling them (see below).

### Images/Media

As is, images are accessed through the Payload /api endpoint on page load. The media component uses a basic implementation of [Unpic](https://unpic.pics/) to replace the website templates use of next/image inside React components. If you're site is not very image heavy, this is probably fine as is. If it is though, unpic supports most image provider services, and by providing the image URL to Unpic through the Payload collection it will automatically request what it needs to create a responsive image element.

## Project Structure and Notes

- **app-frontend/**: Contains the frontend code built with Astro.
  - **src/pages, components, layouts**: These Astro files match the logic of the website template Next routes. As with those, you don't need to change anything here if you don't want to.
  - **src/utilities/**: Frontend specific utility functions.
  - **src/styles/**: The project uses Tailwind v4, and you can customize the theme in `global.css`. `tailwind.config.mjs` is used to configure the typeography plugin. All styles match the website template.
  - **src/content.config.ts**: This file sets up your collections in Astro, allowing them to be cached and only update changed documents on build. You'll need to update this file if you add any collections to Payload. See: https://docs.astro.build/en/guides/content-collections/.
  - **astro.config.ts**: Make sure to update the site key to your production domain before deployment.
- **app-payload/**: Payload CMS configuration and backend setup. Very little is changed from the official website template. 
- **astro-payload-local-loader/**: Custom Astro content loader for using the Payload local API.
- **ui-library/src**: Payload blocks, configs, and all other shared components and utilities.
  - **blocks/**: Reusable content blocks. This is where you can edit your available blocks for the page builder.
  - **components/**: Individual UI components, used by blocks and directly by Payload.
  - **fields/**: Custom field types for blocks and components as well as Payload.
  - **utilities/**: Utility functions and helpers.

## Limitations and Differences from the Website Template

- **Circular Dependencies**: Circular dependency warnings may appear between `app-payload` and `ui-library`. `ui-library` only imports types from `app-payload` so that the blocks can be typesafe, but pnpm will warn you anyway.
- **Publish Button**: The publish button in the admin panel currently only sets the document to `draft: false`, as it does in the website template. You then need to manually rebuild the frontend. Depending on your deployment, you'd likely want to add a button to the admin panel that triggers a build by webhook or something similar. (I will likely add a button with a webhook placeholder).
- **Live Preview**: Due to static generation, there is no way to make live preview work. You could implement it using SSR in Astro, but you'd tradeoff the SSG benefits.
- **Draft Mode**: This could be implemented with a draft/staging branch, that has the astro content configuration set to `draft:true`, and using a button as above to trigger a draft deployment on a subdomain. This would depend on your deployment setup.


## Contributing

If you have any features, improvements, fixes, etc. you'd like to add contributions are more than welcome!

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Payload CMS**: For providing an excellent content management system.
- **Astro Framework**: For enabling static site generation with modern frontend capabilities.

