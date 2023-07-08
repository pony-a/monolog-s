import 'sanitize.css'
import './globals.css'

export const metadata = {
  title: 'Monolog',
  description: 'Monolog by pony-a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
