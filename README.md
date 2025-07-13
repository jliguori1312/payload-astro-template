# Payload Website Template with Astro

A one-to-one rebuild of the Payload CMS website template using Astro instead of Next.js. The goal is to replicate the features and design of the original website template while demonstrating the use of Astro as a frontend framework alongside Payload. This setup is ideal for content-heavy sites that don't require frequent updates.

## Features

- **Statically Generated**: Built with Astro, this template generates static HTML files at build time, making it fast and efficient.
- **Payload CMS Integration**: Utilizes Payload CMS for managing content, providing a robust backend solution.
- **Design Replication**: The design closely follows the original Payload website template, ensuring consistency and familiarity.
- **Frontend Flexibility**: Demonstrates how to use Astro alongside Payload, showcasing the capabilities of both frameworks.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- pnpm (version 6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/payload-astro-template.git
   cd payload-astro-template
   ```

2. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the template in action.

## Project Structure

- **app-frontend/**: Contains the frontend code built with Astro.
  - **src/**: Source files for the frontend application.
    - **styles/**: CSS and styling configurations.
    - **utilities/**: Utility functions and helpers.
- **app-payload/**: Payload CMS configuration and backend setup.
  - **src/**: Source files for Payload CMS.
    - **access/**: Authentication and access control logic.
    - **app/**: Application routes and components.
    - **endpoints/**: Custom API endpoints.
    - **fields/**: Custom field types.
    - **providers/**: Context providers for theme management.
    - **utilities/**: Utility functions and helpers.
- **astro-payload-local-loader/**: Astro loader configuration for Payload CMS integration.
  - **.astro/content.d.ts**: TypeScript definitions for content entries.
  - **payload-local-loader.ts**: Loader script for integrating Payload with Astro.
- **ui-library/**: UI components and blocks used in the template.
  - **blocks/**: Reusable content blocks.
  - **components/**: Individual UI components.
  - **fields/**: Custom field types for forms.
  - **utilities/**: Utility functions and helpers.

## Notes

- **pnpm Workspace**: This project uses pnpm with a workspace setup. Ensure you have pnpm installed to manage dependencies effectively.
- **Circular Dependencies**: Circular dependency warnings may appear, but the `ui-library` package only imports types from `app-payload`, so it is not a problem.
- **Live Preview**: Due to static generation, live preview is not available. Draft mode can be configured based on your deployment strategy.
- **Publish Button**: The publish button in the admin panel currently only saves changes and sets the document to draft: false so that it's included when the frontend is built. A deploy/publish button needs to be implemented, which would likely trigger a rebuild of the frontend via webhook to platforms like Cloudflare, Vercel, or Netlify.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Payload CMS**: For providing an excellent content management system.
- **Astro Framework**: For enabling static site generation with modern frontend capabilities.

---

Feel free to customize this template further to suit your specific needs and contribute back to the community!
