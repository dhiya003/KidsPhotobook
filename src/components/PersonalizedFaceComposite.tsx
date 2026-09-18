import React, { useState } from 'react';
import { FaceSlot } from '../types';
import { Sparkles, Eye, EyeOff, UserCheck } from 'lucide-react';

interface PersonalizedFaceCompositeProps {
  sceneImage: string;
  characterFaceUrl?: string;
  referencePhotoUrl?: string;
  faceSlot?: FaceSlot;
  gender?: 'boy' | 'girl' | 'neutral';
  childName: string;
  className?: string;
  showFaceReplacement?: boolean;
  onToggleFaceReplacement?: () => void;
  interactive?: boolean;
  altText?: string;
}

export const PersonalizedFaceComposite: React.FC<PersonalizedFaceCompositeProps> = ({
  sceneImage,
  characterFaceUrl,
  referencePhotoUrl,
  faceSlot,
  gender = 'boy',
  childName,
  className = '',
  showFaceReplacement = true,
  interactive = false,
  altText = 'Personalized story illustration'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [faceLoaded, setFaceLoaded] = useState(false);

  // Determine active face image to use: preferred character face or photo
  const activeFace = characterFaceUrl || referencePhotoUrl;

  // Fallback default slot if not provided
  const slot: FaceSlot = faceSlot || {
    top: 34,
    left: 45,
    width: 22,
    height: 26,
    rotate: 0,
    borderRadius: '48%'
  };

  return (
    <div className={`relative overflow-hidden w-full h-full select-none bg-[#162032] ${className}`}>
      {/* 1. Base Template Scene (Boy or Girl illustrated version) */}
      <img
        src={sceneImage}
        alt={altText}
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#162032] animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#F5B027] animate-spin opacity-50" />
        </div>
      )}

      {/* 2. Personalized Face Replacement Layer */}
      {showFaceReplacement && activeFace && (
        <div
          className="absolute z-10 pointer-events-none transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${slot.top}%`,
            left: `${slot.left}%`,
            width: `${slot.width}%`,
            height: `${slot.height}%`,
            transform: `translate(-50%, -50%) rotate(${slot.rotate || 0}deg) scale(${slot.scale || 1})`,
          }}
        >
          {/* Natural Vignette / Oval Mask with soft blend */}
          <div
            className="w-full h-full relative overflow-hidden shadow-xs"
            style={{
              borderRadius: slot.borderRadius || '50% 50% 48% 48%',
              // Subtle soft inner shadow and feathered outline for natural illustration blending
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.22)',
            }}
          >
            <img
              src={activeFace}
              alt={`${childName}'s face`}
              onLoad={() => setFaceLoaded(true)}
              className={`w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.02] transition-opacity duration-300 ${
                faceLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Warm soft lighting overlay to match storybook palette */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,245,220,0.6) 0%, rgba(0,0,0,0.2) 100%)'
              }}
            />

            {/* Edge blending gradient */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: slot.borderRadius || '50% 50% 48% 48%',
                boxShadow: 'inset 0 0 4px 1px rgba(22, 32, 50, 0.15)'
              }}
            />
          </div>

          {/* Subtle pulse indicator only when interactive */}
          {interactive && (
            <div className="absolute -bottom-2 right-0 bg-[#EB5E44] text-white p-0.5 rounded-full shadow-md">
              <UserCheck className="w-2.5 h-2.5" />
            </div>
          )}
        </div>
      )}

      {/* Top Badge: Character Tag & Gender Version */}
      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 pointer-events-none">
        <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#F5B027]" />
          <span>{childName}’s Character</span>
          <span className="opacity-60 text-[9px]">({gender === 'girl' ? 'Girl' : 'Boy'} Edition)</span>
        </span>
      </div>

      {/* Bottom Corner: Face Replacement Active Indicator */}
      <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1 pointer-events-none">
        <span className="bg-black/65 backdrop-blur-xs text-[#F5B027] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
          <UserCheck className="w-3 h-3 text-[#4EAA8C]" />
          <span>{showFaceReplacement ? 'Face Replaced' : 'Base Template'}</span>
        </span>
      </div>
    </div>
  );
};
