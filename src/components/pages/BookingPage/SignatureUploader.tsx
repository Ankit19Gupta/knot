import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, X, RotateCcw, Check, FlipHorizontal } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'sonner';

// Signature Upload Component
interface SignatureUploaderProps {
  onSignatureChange: (file: File | null) => void;
  value?: string | File | null;
}

const SignatureUploader: React.FC<SignatureUploaderProps> = ({
  onSignatureChange,
  value
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle value prop changes (string or File)
  useEffect(() => {
    if (!value) {
      setSelectedImage(null);
    } else if (typeof value === 'string') {
      setSelectedImage(value);
    } else if (value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Effect to handle video stream when camera opens
  useEffect(() => {
    if (stream && videoRef.current && showCamera) {
      const video = videoRef.current;

      // Clear any existing srcObject first
      video.srcObject = null;

      // Set new stream
      video.srcObject = stream;

      const handleLoadedMetadata = () => {
        video.play().catch(error => {
          console.error('Error playing video:', error);
          setCameraError('Failed to start camera preview');
        });
      };

      const handleCanPlay = () => {
        video.play().catch(error => {
          console.error('Error playing video:', error);
          setCameraError('Failed to start camera preview');
        });
      };

      // Add event listeners
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('canplay', handleCanPlay);

      // Multiple attempts to ensure video plays
      const playAttempts = [
        setTimeout(() => video.play().catch(console.error), 100),
        setTimeout(() => video.play().catch(console.error), 300),
        setTimeout(() => video.play().catch(console.error), 500),
      ];

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('canplay', handleCanPlay);
        playAttempts.forEach(clearTimeout);
      };
    }
  }, [stream, showCamera]);

  const startCamera = useCallback(async (requestedFacingMode: 'user' | 'environment' = 'user') => {
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // Stop existing stream if any
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }

      // Clear video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      // Small delay to ensure cleanup
      await new Promise(resolve => setTimeout(resolve, 100));

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: requestedFacingMode,
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        },
        audio: false
      });

      // Set states
      setStream(mediaStream);
      setFacingMode(requestedFacingMode);
      setShowCamera(true);
      setShowModal(false);

      // Wait for next tick to ensure states are updated
      await new Promise(resolve => setTimeout(resolve, 50));

      // Manually set video source if video element exists
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = mediaStream;

        // Try to play immediately
        try {
          await video.play();
        } catch (playError) {
          console.log('Initial play failed, will retry:', playError);
        }
      }

    } catch (error: unknown) {
      console.error('Error accessing camera:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        setCameraError((error as { message?: string }).message || 'Could not access camera');
      } else {
        setCameraError('Could not access camera');
      }

      if (error && typeof error === 'object' && 'name' in error) {
        const errorName = (error as { name?: string }).name;
        if (errorName === 'NotAllowedError') {
          toast('Camera access denied. Please allow camera permissions and try again.');
        } else if (errorName === 'NotFoundError') {
          toast('No camera found on this device.');
        } else {
          toast('Could not access camera. Please check permissions and try again.');
        }
      } else {
        toast('Could not access camera. Please check permissions and try again.');
      }
    }
  }, [stream]);

  const toggleCamera = useCallback(() => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    startCamera(newFacingMode);
  }, [facingMode, startCamera]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCapturedImage(null);
    setCameraError(null);
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
      }
    }
  }, []);

  const confirmCapture = useCallback(() => {
    if (capturedImage) {
      setSelectedImage(capturedImage);

      // Convert data URL to File object
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'signature-capture.jpg', { type: 'image/jpeg' });
          onSignatureChange(file);
        });

      stopCamera();
    }
  }, [capturedImage, stopCamera, onSignatureChange]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera(facingMode);
  }, [stream]);

  const openGallery = useCallback(() => {
    setShowModal(false);
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        onSignatureChange(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onSignatureChange]);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    onSignatureChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onSignatureChange]);

  return (
    <div className="w-full">
      {/* Display Area */}
      <div className="mb-4">
        {selectedImage ? (
          <div className="relative inline-block">
            <Image
              src={selectedImage.startsWith('data:') ? selectedImage : `data:image/jpeg;base64,${selectedImage}`}
              alt="User Signature"
              height={200}
              width={200}
              className="object-cover rounded border-2 border-gray-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <Upload size={20} className="mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">No signature</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-sm flex items-center gap-2"
      >
        <Upload size={16} />
        Add Signature
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Modal for Source Selection */}
      {showModal && (
        <Dialog open={showModal} onOpenChange={() => setShowModal(!showModal)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Signature Source</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => startCamera('user')}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Camera size={20} />
                Take Photo
              </button>

              <button
                type="button"
                onClick={openGallery}
                className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                Choose from Gallery
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </DialogContent>
        </Dialog>
      )}

      {/* Camera Dialog */}
      {showCamera && (
        <Dialog open={showCamera}>
          <DialogContent className="max-w-4xl w-full h-[80vh] p-0 flex flex-col">
            <DialogHeader className="px-4 pt-4 pb-2 border-b shrink-0">
              <DialogTitle className="flex items-center justify-between">
                <span>Camera</span>

              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 relative overflow-hidden bg-black">
              {!capturedImage ? (
                <>
                  {cameraError ? (
                    <div className="w-full h-full flex items-center justify-center text-center p-4">
                      <div>
                        <X size={48} className="mx-auto mb-4 text-red-500" />
                        <p className="text-lg mb-2 text-white">Camera Error</p>
                        <p className="text-sm text-gray-300">{cameraError}</p>
                      </div>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          videoRef.current.play().catch(console.error);
                        }
                      }}
                    />
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </>
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Camera Controls - Always at Bottom */}
            <div className="p-4 border-t bg-gray-50 shrink-0">
              <div className="flex justify-center items-center gap-4">
                {!capturedImage ? (
                  <div className="flex justify-center items-center gap-6">
                    {/* Camera Toggle Button */}
                    <button
                      type="button"
                      onClick={toggleCamera}
                      className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
                      title={`Switch to ${facingMode === 'user' ? 'rear' : 'front'} camera`}
                      disabled={!!cameraError}
                    >
                      <FlipHorizontal size={18} />
                    </button>

                    {/* Capture Image Button (Circular Shutter Button) */}
                    <button
                      type="button"
                      onClick={captureImage}
                      className="bg-white text-black p-4 rounded-full hover:bg-gray-200 transition-colors border-4 border-gray-300"
                      disabled={!!cameraError}
                    >
                      <div className="w-6 h-6 bg-black rounded-full"></div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        stopCamera();
                        setShowCamera(false);
                      }}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center space-x-6">
                    <button
                      type="button"
                      onClick={retakePhoto}
                      className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-colors"
                    >
                      <RotateCcw size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={confirmCapture}
                      className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
                    >
                      <Check size={20} />
                    </button>


                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SignatureUploader;