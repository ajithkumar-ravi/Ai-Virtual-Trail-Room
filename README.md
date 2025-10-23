# AI Virtual Trial Room

An AI-powered virtual trial room that allows users to see how clothes fit on them before buying. Upload your photo and a garment image to get a realistic virtual try-on, complete with a fit assessment and style recommendations.

## Features

- Browse products by category (T-Shirts, Shirts, Pants, Sarees).
- Search for specific products.
- View detailed product information.
- Add/remove items from a wishlist.
- **Virtual Try-On:** Upload your photo to see how a garment looks on you, powered by the Gemini API.
- Get an AI-generated fit assessment and style recommendations.
- Light/Dark mode toggle.
- Responsive design for all screen sizes.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use). The virtual try-on feature will work out of the box.

## How to Deploy to GitHub Pages

This project is pre-configured for deployment to GitHub Pages.

1.  **Create a GitHub Repository:**
    - Create a new public repository on your GitHub account. Let's assume you name it `virtual-try-on-app`.

2.  **Update Configuration:**
    - **`package.json`**: Open the `package.json` file and update the `homepage` field. Replace `<Your-GitHub-Username>` with your GitHub username and `<your-repo-name>` with your repository's name.
      ```json
      // Before
      "homepage": "https://<Your-GitHub-Username>.github.io/<your-repo-name>",

      // After (example)
      "homepage": "https://johndoe.github.io/virtual-try-on-app",
      ```
    - **`vite.config.js`**: Open the `vite.config.js` file and update the `base` property with your repository name.
      ```javascript
      // Before
      base: '/your-repo-name/',

      // After (example)
      base: '/virtual-try-on-app/',
      ```

3.  **Push Code to Your Repository:**
    - Initialize git and push your project to the new repository you created.
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/<Your-GitHub-Username>/<your-repo-name>.git
      git push -u origin main
      ```
      *Remember to replace the placeholders in the URL.*

4.  **Run the Deploy Script:**
    - In your project's terminal, run the deploy command:
      ```bash
      npm run deploy
      ```
    - This will build the project and push the `dist` folder to a `gh-pages` branch on your repository.

5.  **Check Your Live Site:**
    - Go to your repository's settings on GitHub (`Settings` > `Pages`).
    - Under "Build and deployment", ensure the source is set to **Deploy from a branch** and the branch is **`gh-pages`** with the `/ (root)` folder.
    - After a few minutes, your site will be live at the URL you configured in `package.json`!