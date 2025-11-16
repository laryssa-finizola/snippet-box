"use client"; 

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  language: string;
  code: string;
};

export function CodeBlock({ language, code }: CodeBlockProps) {
  const lang = language ? language.toLowerCase() : 'plaintext';

  return (
    <SyntaxHighlighter
      language={lang}
      style={atomDark}
      customStyle={{
        backgroundColor: 'transparent', 
        border: 'none',
        padding: 0,
        margin: 0,
        fontSize: '0.875rem', 
        lineHeight: '1.5rem',
      }}
      codeTagProps={{
        style: {
          fontFamily: 'var(--font-geist-mono)', 
        },
      }}
      wrapLongLines={true} 
    >
      {String(code).replace(/\n$/, '')} 
    </SyntaxHighlighter>
  );
}