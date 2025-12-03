# Contact Form Setup Guide

Your contact form is ready! You have two options to make it work on GitHub Pages:

## Option 1: Formspree (EASIEST - Recommended) ⭐

**No JavaScript setup needed!**

1. Go to https://formspree.io/ and sign up (free tier available)
2. Create a new form
3. Copy your form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)
4. In `index.html`, find the contact form and change:
   ```html
   <form id="contact-form" class="contact-form">
   ```
   to:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Remove or comment out the EmailJS script in `index.html` (line with `@emailjs/browser`)
6. Update `script.js` - replace the EmailJS code with this simpler version:

```javascript
// Contact Form Handling with Formspree
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = contactForm?.querySelector('.submit-btn');
const btnText = submitBtn?.querySelector('.btn-text');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Sending...';
        }

        // Hide previous messages
        if (formMessage) {
            formMessage.style.display = 'none';
            formMessage.classList.remove('success', 'error');
        }

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                if (formMessage) {
                    formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                }
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form Error:', error);
            if (formMessage) {
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }
        } finally {
            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
            }
        }
    });
}
```

**That's it!** Formspree handles everything else.

---

## Option 2: EmailJS

1. Go to https://www.emailjs.com/ and sign up (free tier available)
2. Create an Email Service (Gmail, Outlook, etc.)
3. Create an Email Template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Get your credentials from the dashboard:
   - Public Key (from Integration page)
   - Service ID (from Email Services page)
   - Template ID (from Email Templates page)
5. In `script.js`, replace these placeholders:
   - `YOUR_PUBLIC_KEY` → Your EmailJS public key
   - `YOUR_SERVICE_ID` → Your EmailJS service ID
   - `YOUR_TEMPLATE_ID` → Your EmailJS template ID

---

## Quick Test

After setup, test the form:
1. Fill out all fields
2. Click "Send Message"
3. Check your email (Formspree) or EmailJS dashboard
4. You should receive the message!

---

## Auto-Reply Setup (Send Confirmation to Users)

Formspree can automatically send a confirmation email to people who submit your form!

### How to Enable Auto-Reply:

1. **Go to your Formspree Dashboard**
   - Log in at https://formspree.io/
   - Click on your form (the one with endpoint `xpwvrdor`)

2. **Enable Auto-Reply**
   - Look for "Auto-Responder" or "Auto-Reply" in the form settings
   - Toggle it ON

3. **Customize the Message**
   - Subject: "Thank you for contacting Jana Algurashi"
   - Message: Write a nice thank you message like:
     ```
     Hi {{name}},
     
     Thank you for reaching out! I've received your message and will get back to you as soon as possible.
     
     Best regards,
     Jana Algurashi
     ```
   - You can use variables like `{{name}}`, `{{email}}`, `{{subject}}` in your message

4. **Save Settings**
   - Click "Save" or "Update"
   - Done! Now every form submission will automatically send a confirmation email

### Alternative: Custom Auto-Reply via Formspree Settings

If you don't see the auto-reply option in the free tier, you can:
- Upgrade to a paid plan (has more features)
- Or use Formspree's webhook feature to send custom emails
- Or manually reply (but auto-reply is much better!)

---

## Need Help?

- Formspree Docs: https://help.formspree.io/
- Auto-Reply Guide: https://help.formspree.io/en/articles/4802603-auto-responder
- EmailJS Docs: https://www.emailjs.com/docs/

