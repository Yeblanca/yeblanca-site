// Root layout: intentionally renders nothing.
// Each route group provides its own document shell:
//   - (payload)    → Payload's RootLayout (full admin shell with <html>/<body>)
//   - [locale]      → provides its own <html>/<body> via Navbar/Footer wrapping
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}