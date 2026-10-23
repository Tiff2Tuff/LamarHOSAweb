# Lamar HOSA Website

A responsive static website starter for a student HOSA chapter.

## Included
- Responsive home page and navigation
- Announcements and event filters
- Chapter point guide and cord requirements
- Official HOSA resource links and FAQ
- Officer roster (verify before publishing)
- Local activity tracker with point progress, delete controls, and CSV export

## Important limitations
The member tracker is a prototype. It saves data in `localStorage` in the current browser/device only. It does **not** create secure accounts, sync between devices, or let officers view member data. Do not enter passwords or sensitive information. For real student accounts and shared progress, add an approved authentication/database service with school/adult oversight and a privacy review.

Event dates are placeholders. Review all point values, cord policies, officers, contact information, and announcements with the chapter sponsor before publishing. The website is an unofficial chapter resource and is not affiliated with the national HOSA organization.

## Preview locally
Open `index.html` in a modern browser. Internet is needed for the Google Fonts import and external HOSA links; the core layout works without the font import.

## Publish free with GitHub Pages
1. Ask your chapter sponsor/school whether they approve publishing the chapter website publicly. Do not include private student information or personal contact details.
2. Create/sign in to a GitHub account and create a new **public** repository, for example `lamar-hosa-site`.
3. Upload `index.html`, `styles.css`, `script.js`, and this README to the repository root.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**; select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish. The site URL will appear in Settings → Pages, typically `https://YOUR-USERNAME.github.io/lamar-hosa-site/`.
7. Test the published site on a phone and computer. Updates are made by editing and committing the files in the repository.

GitHub's interface can change; follow its official Pages documentation if the labels differ:
https://docs.github.com/en/pages/quickstart

## Updating content
- Edit announcement cards in `index.html`.
- Edit event rows in `index.html` and set `data-category` to `meeting`, `service`, or `competition`.
- Update point values in the table in `index.html` and matching options in `#activitySelect`.
- Update officer names/titles only with approval.
