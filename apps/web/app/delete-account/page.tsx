export default function DeleteAccountPage() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "64px 24px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.7,
      }}
    >
      <h1 style={{ fontSize: 36, marginBottom: 24 }}>KORIO Account Deletion</h1>

      <p style={{ marginBottom: 24 }}>
        You can delete your KORIO account directly in the KORIO app.
      </p>

      <h2 style={{ fontSize: 24, marginBottom: 12 }}>
        Delete your account in the app
      </h2>

      <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
        <li>Open the KORIO app.</li>
        <li>Go to Settings.</li>
        <li>Open Account settings.</li>
        <li>Select Delete Account.</li>
        <li>Confirm the deletion.</li>
      </ol>

      <h2 style={{ fontSize: 24, marginBottom: 12 }}>
        If you cannot access the app
      </h2>

      <p style={{ marginBottom: 32 }}>
        You can request account deletion by contacting KORIO support at{" "}
        <a href="mailto:support@korio.online">support@korio.online</a>. Please
        include the email address associated with your KORIO account.
      </p>

      <h2 style={{ fontSize: 24, marginBottom: 12 }}>
        Data that will be deleted
      </h2>

      <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
        <li>Account and profile information</li>
        <li>Learning progress</li>
        <li>Lesson history</li>
        <li>AI tutor and learning-related account data</li>
        <li>Other personal data associated with your KORIO account</li>
      </ul>

      <h2 style={{ fontSize: 24, marginBottom: 12 }}>Data retention</h2>

      <p>
        Some transaction or legal records may be retained where required by
        applicable law. All other account-related personal data will be deleted
        after the account deletion request is processed.
      </p>
    </main>
  );
}
