'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

// Function to convert video URLs to embed URLs
function getEmbedUrl(url: string): string {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Extract video ID
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Loom
  if (url.includes('loom.com/share')) {
    const id = url.split('loom.com/share/')[1].split('?')[0];
    return `https://www.loom.com/embed/${id}`;
  }

  // For Google Drive videos, we can't easily embed them, so we'll just return the URL
  // Screen.studio seems to have a similar format to Loom
  if (url.includes('screen.studio/share')) {
    const id = url.split('screen.studio/share/')[1].split('?')[0];
    return `https://app.screen.studio/embed/${id}`;
  }

  // Return original URL for other cases
  return url;
}

export default function ProjectModals() {
  // State for video modal
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentProjectName, setCurrentProjectName] = useState('');

  // State for image modal
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentImageAlt, setCurrentImageAlt] = useState('');

  // Function to open video modal
  const openVideoModal = (videoUrl: string, projectName: string) => {
    setCurrentVideoUrl(getEmbedUrl(videoUrl));
    setCurrentProjectName(projectName);
    setVideoModalOpen(true);
  };

  // Function to close video modal
  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideoUrl('');
  };

  // Function to open image modal
  const openImageModal = (
    imageSrc: string,
    imageAlt: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(imageSrc);
    setCurrentImageAlt(imageAlt);
    setImageModalOpen(true);
  };

  // Function to close image modal
  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  // Add ESC key handler for closing modals
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideoModal();
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Expose methods to window for external components to call
  useEffect(() => {
    // @ts-ignore
    window.projectModals = {
      openVideoModal,
      closeVideoModal,
      openImageModal,
      closeImageModal,
    };

    return () => {
      // @ts-ignore
      delete window.projectModals;
    };
  }, []);

  return (
    <>
      {/* Video Modal */}
      {videoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-zinc-900 rounded-lg overflow-hidden w-full max-w-4xl shadow-xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <h3 className="text-xl font-bold text-white">
                {currentProjectName} Demo
              </h3>
              <button
                onClick={closeVideoModal}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              {/* Check for Google Drive URLs and display a different message */}
              {currentVideoUrl.includes('drive.google.com') ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black">
                  <p className="mb-4 text-lg text-gray-300">
                    Los videos de Google Drive no se pueden embeber
                    directamente.
                  </p>
                  <Link
                    href={currentVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded transition-colors"
                  >
                    Abrir Video en Google Drive
                  </Link>
                </div>
              ) : (
                <iframe
                  src={currentVideoUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Image Modal */}
      {imageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl max-w-4xl w-full max-h-[90vh] p-4 border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {currentImageAlt}
              </h3>
              <button
                onClick={closeImageModal}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src={currentImage}
                alt={currentImageAlt}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
