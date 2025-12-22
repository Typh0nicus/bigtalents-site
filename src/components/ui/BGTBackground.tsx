"use client";

interface BGTBackgroundProps {
  variant?: 'hero' | 'section' | 'full';
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function BGTBackground({ 
  variant = 'hero',
  overlay = true,
  overlayOpacity = 0.6,
  className = '',
  children 
}: BGTBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Master Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/background/bgt-master-bg.png')`,
          backgroundPosition: variant === 'hero' ? 'center top' : 'center',
        }}
      />
      
      {/* Dark overlay for text readability */}
      {overlay && (
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(10,10,10,${overlayOpacity * 0.5}), rgba(10,10,10,${overlayOpacity}))`,
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
