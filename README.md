# 🤿 Breakwater Dives – Website

A static website for **Breakwater Dives**, a scuba diving service based in Izu Peninsula, Japan. Built for GitHub Pages hosting.

## 📁 Project Structure

```
breakwater_dives/
├── index.html          # Homepage
├── gallery.html        # Photo gallery with lightbox
├── booking.html        # Booking calendar & form
├── availability.json   # Calendar availability data
├── css/
│   └── style.css       # All styles
├── js/
│   ├── main.js         # Navigation, lightbox, general UI
│   └── calendar.js     # Interactive booking calendar
├── images/             # Place your own images here
└── README.md           # This file
```

## 🚀 Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `breakwater-dives`)
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source** and select `main` branch, `/ (root)` folder
4. Your site will be live at `https://yourusername.github.io/breakwater-dives/`

## 📅 Managing Calendar Availability

The booking calendar reads from `availability.json` to determine which dates are available or unavailable.

### How it works

Open `availability.json`:

```json
{
  "unavailable_dates": [
    "2026-04-13",
    "2026-04-20",
    "2026-04-27"
  ],
  "available_dates": []
}
```

#### Option A: Block specific dates (recommended)

Add dates to `unavailable_dates` that you are **NOT** available. All other future dates (except Sundays) will show as available.

```json
{
  "unavailable_dates": [
    "2026-05-01",
    "2026-05-03",
    "2026-05-15"
  ],
  "available_dates": []
}
```

#### Option B: Only allow specific dates

If you fill `available_dates`, **only** those dates will be bookable. This is useful for very limited availability.

```json
{
  "unavailable_dates": [],
  "available_dates": [
    "2026-05-10",
    "2026-05-17",
    "2026-05-24"
  ]
}
```

### Date format

All dates must use **`YYYY-MM-DD`** format (e.g., `2026-06-15`).

### After editing

1. Edit `availability.json`
2. Commit and push to GitHub
3. The calendar on your live site updates automatically (may take a minute for GitHub Pages to refresh)

## 📧 Booking Form

The booking form uses [FormSubmit.co](https://formsubmit.co/) to send submissions to **Jwhk751@gmail.com** — no server or backend required.

### First-time setup

The first time someone submits the form, FormSubmit will send a **confirmation email** to `Jwhk751@gmail.com`. You must click the confirmation link to activate form submissions.

### Customizing the email

You can update the `_next` hidden field in `booking.html` to redirect users to a custom thank-you page after submission.

## 🖼️ Replacing Gallery Images

The gallery currently uses placeholder images from Unsplash. To use your own photos:

1. Add your images to the `images/` folder
2. Open `gallery.html`
3. Replace the `src` attributes in `<img>` tags:

```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" alt="Description">

<!-- After -->
<img src="images/your-photo.jpg" alt="Description">
```

**Recommended**: Use images around 800×600px for fast loading. Use `.jpg` or `.webp` format.

## 🎨 Customization

### Colors

Edit the CSS variables at the top of `css/style.css`:

```css
:root {
  --accent: #00d4aa;     /* Main accent (green-teal) */
  --deep: #0a1628;       /* Dark navy */
  --ocean: #0d3b66;      /* Ocean blue */
  --mid: #1a6fb5;        /* Medium blue */
}
```

### Pricing

Update pricing in `index.html` (pricing section) and `booking.html` (sidebar pricing reminder).

## 📱 Responsive Design

The site is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px–1200px)
- Mobile (< 768px)

## 📝 License

© 2026 Breakwater Dives. All rights reserved.
