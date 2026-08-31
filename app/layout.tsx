import './globals.css';
import VLibrasWidget from './components/VLibras'; // 🌟 1. Importação adicionada aqui

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
      <body>
        {children}
        <VLibrasWidget /> {/* 🌟 2. Componente chamado aqui */}
      </body>
    </html>
  );
}