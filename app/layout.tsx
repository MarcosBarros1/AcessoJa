import './globals.css';

export const metadata = {
  title: 'Portal AcessoJá',
  description: 'Educação e Inclusão em um só lugar.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}