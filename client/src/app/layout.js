import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Employee Management App',
  description: 'Test application for Fullstack Javascript role',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-bs-theme={"dark"}>
        <body
            className={`${inter.className}`}
        >
        {children}
        </body>
        </html>
    );
}
