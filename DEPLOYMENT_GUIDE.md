# QiTech Coming Soon Page - Deployment Guide

## Overview

Your website now has two parts:
- **Public Coming Soon Page**: `index.html` (root) - Visible to everyone
- **Full Website**: `/site/` directory - Password protected (only you can access)

## File Structure

```
public_html/
├── index.html               ← Coming Soon page (public)
├── Images/                  ← Shared images folder
├── Documents/               ← Shared documents folder
├── assets/                  ← Shared CSS/JS assets
└── site/                    ← Password-protected full website
    ├── .htaccess            ← Password protection config
    ├── .htpasswd            ← Encrypted passwords
    ├── index.html           ← Main homepage
    ├── about.html
    ├── services.html
    ├── projects.html
    ├── contact.html
    └── theme-test.html
```

## Deployment Steps

### Step 1: Push to GitHub

```bash
# Add all files to git
git add .

# Commit changes
git commit -m "Add coming soon page with password-protected site structure"

# Push to GitHub
git push origin main
```

### Step 2: Upload to Hostinger

**Option A: Using Hostinger Git Integration (Recommended)**

1. Log in to Hostinger hPanel
2. Go to **Advanced** → **Git**
3. Pull from your GitHub repository
4. Files will deploy to `public_html/`

**Option B: Manual Upload via File Manager**

1. Log in to Hostinger hPanel
2. Go to **Files** → **File Manager**
3. Navigate to `public_html/`
4. Upload all files maintaining the structure above

**Option C: FTP Upload**

1. Use FileZilla or another FTP client
2. Connect to Hostinger using FTP credentials
3. Upload all files to `/public_html/`

### Step 3: Configure Password Protection in Hostinger

**CRITICAL: You must set up the password protection in Hostinger**

1. **Go to Password Protection**
   - hPanel → **Advanced** → **Password Protect Directories**
   - Or: hPanel → **Files** → **Password Protect**

2. **Select Directory to Protect**
   - Choose the `/site` directory
   - Click "Protect"

3. **Create Username and Password**
   - Username: `admin` (or your choice)
   - Password: Create a strong password (e.g., `QiTech2025!Secure`)
   - Click "Add User"

4. **Hostinger will automatically:**
   - Update the `.htpasswd` file with encrypted password
   - Configure the correct path in `.htaccess`

### Step 4: Update .htaccess Path (if needed)

If password protection doesn't work, you may need to update the path in `.htaccess`:

1. In File Manager, edit `/site/.htaccess`
2. Find this line:
   ```
   AuthUserFile /home/yourusername/public_html/site/.htpasswd
   ```
3. Replace with the correct absolute path:
   ```
   AuthUserFile /home/u123456789/public_html/site/.htpasswd
   ```
   (Find your exact path in Hostinger's File Manager or ask support)

### Step 5: Test Your Setup

1. **Test Public Page**
   - Visit: `https://yourdomain.com`
   - Should see the Coming Soon page
   - No password required

2. **Test Protected Site**
   - Visit: `https://yourdomain.com/site/`
   - Should prompt for username/password
   - Enter credentials you created
   - Should see the full website

## Customizing the Coming Soon Page

### Change Launch Date

Edit `index.html` line 173:

```javascript
const launchDate = new Date('2025-12-31T00:00:00').getTime();
```

Change `'2025-12-31T00:00:00'` to your desired launch date.

### Update Social Media Links

Edit `index.html` lines 246-265, replace `#` with your actual social media URLs:

```html
<a href="https://facebook.com/yourpage" ...>
<a href="https://twitter.com/yourhandle" ...>
<a href="https://instagram.com/yourprofile" ...>
<a href="https://linkedin.com/company/yourcompany" ...>
```

### Enable Email Notifications

To collect email addresses, you'll need to:

1. **Use an email service** (recommended):
   - Mailchimp: https://mailchimp.com
   - ConvertKit: https://convertkit.com
   - Sendinblue: https://sendinblue.com

2. **Or create your own backend**:
   - PHP script to save emails to database
   - Node.js API endpoint
   - Firebase/Supabase integration

Edit `index.html` around line 220 to integrate with your chosen service.

## Access Credentials

**IMPORTANT: Save these securely**

- **Coming Soon Page**: `https://yourdomain.com` (public)
- **Full Website**: `https://yourdomain.com/site/` (password protected)
- **Username**: (the one you created in Hostinger)
- **Password**: (the one you created in Hostinger)

## When Ready to Launch

When you're ready to make the full site public:

### Option 1: Quick Launch (Move files)

```bash
# Move all files from site/ to root
cd site/
mv *.html ../
cd ..

# Remove password protection files
rm site/.htaccess site/.htpasswd

# Save the coming soon page for future use
mv index.html coming-soon-backup.html
mv site/index.html index.html

# Commit and push
git add .
git commit -m "Launch full website - remove coming soon page"
git push origin main
```

### Option 2: Clean Launch (On server)

1. In Hostinger File Manager:
   - Delete `index.html` (coming soon page)
   - Move all files from `/site/` to `/public_html/`
   - Delete `/site/.htaccess` and `/site/.htpasswd`
   - Delete empty `/site/` directory

## Troubleshooting

### Password Protection Not Working

1. **Check file permissions**:
   - `.htaccess` should be 644
   - `.htpasswd` should be 644

2. **Verify path in .htaccess**:
   - Use absolute path to `.htpasswd`
   - Check with Hostinger support for correct path format

3. **Check server configuration**:
   - Some servers require `AllowOverride All`
   - Contact Hostinger support if issues persist

### Coming Soon Page Not Showing

1. **Check file name**: Must be `index.html` in root
2. **Clear browser cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. **Check file uploaded correctly**: Via File Manager

### Images Not Loading

1. **Check paths**: Images should be in `/public_html/Images/`
2. **Case sensitive**: Use exact folder name `Images` not `images`
3. **Verify upload**: Make sure all images uploaded correctly

## Support

- **Hostinger Support**: Available 24/7 via chat in hPanel
- **GitHub Repository**: https://github.com/adeyvsvf/QiTechWebsite

## Security Notes

- ✅ `.htpasswd` file is encrypted - safe to commit
- ✅ `.gitignore` already excludes sensitive files
- ✅ Never commit actual plaintext passwords
- ✅ Use strong passwords for .htaccess protection
- ✅ Consider enabling SSL/HTTPS in Hostinger (free)

## Next Steps

1. ☐ Push changes to GitHub
2. ☐ Deploy to Hostinger
3. ☐ Set up password protection in hPanel
4. ☐ Test both public and protected areas
5. ☐ Customize launch date
6. ☐ Add social media links
7. ☐ Set up email collection (optional)
8. ☐ Enable SSL certificate
9. ☐ Test on mobile devices
10. ☐ Share preview link with team

---

**Created**: October 2025
**Last Updated**: October 15, 2025
