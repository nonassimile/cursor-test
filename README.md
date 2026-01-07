# Ecosystem Partnership Collaboration Platform

A modern React-based collaboration platform for managing ecosystem partnerships. Connect with partners, track milestones, manage collaborators, and generate partnership agreements.

## Features

- 🤝 **Partnership Management**: Create and manage multiple ecosystem partnerships
- 👥 **Collaborator Tracking**: Add and manage team members and external collaborators
- 🎯 **Milestone Tracking**: Set and track partnership milestones with status updates
- 📊 **Status Management**: Track partnership status (Pending, Active, Completed, Cancelled)
- 💾 **Agreement Generation**: Export partnership details as downloadable agreements
- 💾 **Local Storage**: All data is saved locally in your browser
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) - comes with Node.js

You can check if you have these installed by running:
```bash
node --version
npm --version
```

## Installation

1. **Install Dependencies**

   Navigate to the project directory and install all required packages:

   ```bash
   npm install
   ```

   This will install:
   - React 18.2.0
   - React DOM 18.2.0
   - React Scripts 5.0.1 (includes webpack, Babel, ESLint, etc.)

## Running the Application

### Development Mode

To start the development server:

```bash
npm start
```

This will:
- Start the development server
- Open your browser to `http://localhost:3000`
- Enable hot-reloading (changes appear instantly)

The app will automatically reload when you make changes to the code.

### Production Build

To create an optimized production build:

```bash
npm build
```

This creates a `build` folder with optimized files ready for deployment.

### Running the Production Build Locally

After building, you can test the production build locally:

```bash
# Install a simple HTTP server globally (if not already installed)
npm install -g serve

# Serve the build folder
serve -s build
```

Or use Python's built-in server:
```bash
# Python 3
cd build
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
ecosystem-partnership-collaboration/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Header.js       # App header component
│   │   ├── PartnershipForm.js      # Form to create new partnerships
│   │   ├── PartnershipList.js      # List of all partnerships
│   │   └── PartnershipDetails.js   # Detailed view of a partnership
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Usage

1. **Create a Partnership**
   - Click "Create Your First Partnership" or "+ New Partnership"
   - Fill in company details, contact information, and description
   - Select partnership type (Strategic, Technology, Marketing, etc.)
   - Click "Create Partnership"

2. **Manage Partnerships**
   - View all partnerships in the left sidebar
   - Click on a partnership to view details
   - Change partnership status using the dropdown

3. **Add Collaborators**
   - Navigate to the "Collaborators" tab
   - Click "+ Add Collaborator"
   - Enter name, email, and optional role
   - Collaborators are saved to the partnership

4. **Track Milestones**
   - Navigate to the "Milestones" tab
   - Click "+ Add Milestone"
   - Enter title, description, and due date
   - Update milestone status as work progresses

5. **Generate Agreement**
   - Go to the "Overview" tab
   - Scroll to "Generate Agreement"
   - Click "Download Agreement" to export partnership details

## Data Persistence

All partnership data is stored in your browser's localStorage. This means:
- ✅ Data persists between sessions
- ✅ No server required
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Clearing browser data will delete partnerships

## Customization

### Changing Colors

Edit the color scheme in:
- `src/App.css` - Main app colors
- `src/components/Header.css` - Header gradient
- Individual component CSS files for specific styling

The main color scheme uses:
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#27ae60` (Green)
- Danger: `#e74c3c` (Red)

### Adding Features

The app is built with React components, making it easy to extend:
- Add new tabs in `PartnershipDetails.js`
- Create new components in `src/components/`
- Add new fields to partnership forms

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

### Module Not Found Errors

If you encounter module errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

If the build fails:
```bash
# Clear cache and rebuild
npm cache clean --force
npm install
npm run build
```

## Technologies Used

- **React 18** - UI library
- **React DOM** - DOM rendering
- **React Scripts** - Build tooling (Create React App)
- **CSS3** - Styling with modern features
- **LocalStorage API** - Data persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments in component files
3. Check browser console for error messages

---

**Happy Collaborating! 🤝**

