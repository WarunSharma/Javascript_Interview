# Cross-Site Scripting

Cross-Site Scripting (XSS) is a web security vulnerability that allows an attacker to inject malicious JavaScript code into a web page, which then executes in the victim’s browser.
It can be used to steal cookies, manipulate the DOM, or redirect users to malicious sites.

## Example of XSS

Imagine a blog comment section where user input is displayed without sanitization:

<!-- Vulnerable Code -->
<form method="POST" action="/comment">
  <textarea name="comment"></textarea>
  <button type="submit">Post</button>
</form>

<!-- Server renders comments -->
<div>
  User Comment: <?php echo $_POST["comment"]; ?>
</div>


If an attacker submits:

<script>alert('Hacked!');</script>


The browser will execute it, showing:

🔔 Alert popup with “Hacked!”

## Solution / Prevention

✅ Escape User Input before rendering:

✅ Use Content Security Policy (CSP):

✅ Validate & Sanitize Input:

✅ Use Framework Protections:

✅ Avoid innerHTML in JS, use textContent: