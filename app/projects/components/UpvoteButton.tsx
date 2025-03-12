'use client';

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { toggleUpvote } from '../actions';

interface UpvoteButtonProps {
  projectName: string;
  initialCount: number;
  isUpvoted: boolean;
  position?: string;
}

export default function UpvoteButton({
  projectName,
  initialCount,
  isUpvoted,
  position,
}: UpvoteButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [hasUpvoted, setHasUpvoted] = useState(isUpvoted);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening project detail

    if (isLoading) return;

    try {
      setIsLoading(true);
      const result = await toggleUpvote(projectName);

      if (result.action === 'added') {
        setCount((prev) => prev + 1);
        setHasUpvoted(true);
      } else if (result.action === 'removed') {
        setCount((prev) => Math.max(0, prev - 1));
        setHasUpvoted(false);
      }
    } catch (error) {
      console.error('Error updating upvote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={isLoading}
      className={`flex flex-col items-center group ${
        hasUpvoted
          ? `text-${position ? 'black' : 'white'}`
          : `text-${position ? 'black/70' : 'gray-400'}`
      }`}
    >
      <ChevronUp
        className={`h-7 w-7 mb-1 ${
          hasUpvoted
            ? position
              ? `text-black`
              : `text-white`
            : position
            ? `text-black/70`
            : `text-gray-400`
        }`}
      />
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
}
