import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, Play, Square, AlertTriangle } from 'lucide-react';
import UserLayout from '../../components/layouts/UserLayout';

const UserLiveDetection: React.FC = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const [currentAlert, setCurrentAlert] = useState<string | null>(null);

  // Get available cameras
  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) => {
      const videoDevices = mediaDevices.filter(({ kind }) => kind === "videoinput");
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !selectedCamera) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    },
    [selectedCamera]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const startDetection = () => {
    setIsDetecting(true);
    // Simulate random alerts for demo purposes
    const alertTypes = ['drowsy', 'distracted', 'drunk'];
    const alertInterval = setInterval(() => {
      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      setCurrentAlert(randomAlert);
      setTimeout(() => setCurrentAlert(null), 3000);
    }, 10000);

    return () => clearInterval(alertInterval);
  };

  const stopDetection = () => {
    setIsDetecting(false);
    setCurrentAlert(null);
  };

  return (
    <UserLayout title="Live Detection">
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Camera Settings</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select your camera device and start detection to monitor your driving condition.
            </p>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${devices.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            {!isDetecting ? (
              <button
                onClick={startDetection}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Detection
              </button>
            ) : (
              <button
                onClick={stopDetection}
                className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                <Square className="mr-2 h-4 w-4" />
                Stop Detection
              </button>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="relative">
            {selectedCamera && (
              <Webcam
                audio={false}
                ref={webcamRef}
                videoConstraints={{
                  deviceId: selectedCamera,
                  width: 1280,
                  height: 720
                }}
                className="w-full rounded-lg"
              />
            )}
            
            {isDetecting && (
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm font-medium text-white">Live Detection Active</span>
              </div>
            )}

            {currentAlert && (
              <div className={`absolute top-4 left-4 rounded-lg p-4 ${
                currentAlert === 'drowsy' ? 'bg-blue-600' :
                currentAlert === 'drunk' ? 'bg-red-600' :
                'bg-yellow-600'
              }`}>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-white" />
                  <span className="text-sm font-medium text-white">
                    {currentAlert.charAt(0).toUpperCase() + currentAlert.slice(1)} Behavior Detected
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Detection Status</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {isDetecting ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Selected Camera</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {devices.find(d => d.deviceId === selectedCamera)?.label || 'Default Camera'}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Detection Mode</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                All Conditions
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserLiveDetection;