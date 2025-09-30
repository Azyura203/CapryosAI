import React from 'react';

export function formatMarkdown(text: string): React.ReactNode {
  // Early return for empty text
  if (!text.trim()) return null;

  // Split by lines but preserve empty lines for paragraph breaks
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let currentParagraph: string[] = [];
  const inCodeBlock = false;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join('\n');
      elements.push(
        <p key={`p-${elements.length}`} className="mb-4 leading-relaxed whitespace-pre-line">
          {formatInlineMarkdown(paragraphText)}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside mb-3 pl-5">
          {currentList.map((item, i) => (
            <li key={i}>{formatInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (const line of lines) {
    // Skip empty lines unless we're in a paragraph
    if (!line.trim() && currentParagraph.length === 0 && currentList.length === 0) {
      continue;
    }

    // Handle horizontal rule
    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="my-4 border-t" />);
      continue;
    }

    // Handle heading
    const headingMatch = line.match(/^(#{1,3})\s+(.*)/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      elements.push(
        <HeadingTag key={`h-${elements.length}`} className={`mt-4 mb-2 font-semibold text-${level === 1 ? '2xl' : level === 2 ? 'xl' : 'lg'}`}>
          {formatInlineMarkdown(headingMatch[2])}
        </HeadingTag>
      );
      continue;
    }

    // Handle blockquote
    const blockquoteMatch = line.match(/^>\s+(.*)/);
    if (blockquoteMatch) {
      flushParagraph();
      flushList();
      elements.push(
        <blockquote key={`bq-${elements.length}`} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
          {formatInlineMarkdown(blockquoteMatch[1])}
        </blockquote>
      );
      continue;
    }

    // Handle list items
    if (/^[-*]\s/.test(line.trim())) {
      flushParagraph();
      currentList.push(line.trim().substring(2).trim());
      continue;
    }

    // If we're building a list but hit a non-list item
    if (currentList.length > 0 && !/^[-*]\s/.test(line.trim())) {
      flushList();
    }

    // Add to current paragraph
    currentParagraph.push(line);
  }

  // Flush any remaining content
  flushList();
  flushParagraph();

  return <>{elements}</>;
}

function formatInlineMarkdown(text: string): React.ReactNode {
  const elements: React.ReactNode[] = [];
  let index = 0;

  // Regex matches: **bold**, *italic*, `code`
  const regex = /(\*\*(.*?)\*\*|(?<!\*)\*(?!\*)(.*?)\*(?<!\*)|`(.*?)`)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch] = match;
    const matchIndex = match.index;

    if (index < matchIndex) {
      elements.push(text.slice(index, matchIndex));
    }

    if (match[2]) {
      elements.push(<strong key={`b-${index}`}>{match[2]}</strong>);
    } else if (match[3]) {
      elements.push(<em key={`i-${index}`}>{match[3]}</em>);
    } else if (match[4]) {
      elements.push(<code key={`c-${index}`} className="bg-gray-100 px-1 rounded">{match[4]}</code>);
    }

    index = matchIndex + fullMatch.length;
  }

  if (index < text.length) {
    elements.push(text.slice(index));
  }

  return <>{elements}</>;
}