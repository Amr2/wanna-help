import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DigitalSignature = ({ onSignatureComplete, requesterSigned, providerSigned }) => {
  const [userRole] = useState(() => localStorage.getItem('userRole') || 'requester');
  const [signatureType, setSignatureType] = useState('typed');
  const [typedSignature, setTypedSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);

  const currentUserSigned = userRole === 'requester' ? requesterSigned : providerSigned;
  const otherUserSigned = userRole === 'requester' ? providerSigned : requesterSigned;

  // Canvas drawing functions
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSignature = () => {
    let signature = '';
    
    if (signatureType === 'typed') {
      signature = typedSignature;
    } else {
      const canvas = canvasRef.current;
      signature = canvas.toDataURL();
    }
    
    if (!signature || (signatureType === 'typed' && !typedSignature.trim())) {
      alert('Please provide a signature before proceeding.');
      return;
    }
    
    const signatureInfo = {
      type: signatureType,
      data: signature,
      timestamp: new Date().toISOString(),
      userRole: userRole
    };
    
    setSignatureData(signatureInfo);
    onSignatureComplete(signatureInfo);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="PenTool" size={20} />
        <h3 className="text-lg font-semibold text-text-primary">Digital Signature</h3>
      </div>

      {/* Signature Status */}
      <div className="bg-background rounded-lg p-4 mb-6">
        <h4 className="font-medium text-text-primary mb-3">Signature Status</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Search" size={16} className="text-primary" />
              <span className="text-sm text-text-primary">Requester Signature</span>
            </div>
            <div className="flex items-center gap-2">
              {requesterSigned ? (
                <>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">Signed</span>
                  <span className="text-xs text-text-secondary">
                    {formatTimestamp(requesterSigned.timestamp)}
                  </span>
                </>
              ) : (
                <>
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-warning font-medium">Pending</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Briefcase" size={16} className="text-success" />
              <span className="text-sm text-text-primary">Provider Signature</span>
            </div>
            <div className="flex items-center gap-2">
              {providerSigned ? (
                <>
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">Signed</span>
                  <span className="text-xs text-text-secondary">
                    {formatTimestamp(providerSigned.timestamp)}
                  </span>
                </>
              ) : (
                <>
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-warning font-medium">Pending</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Signature Input */}
      {!currentUserSigned && (
        <div className="space-y-6">
          {/* Signature Type Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Signature Method
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setSignatureType('typed')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  signatureType === 'typed' ?'bg-primary text-primary-foreground border-primary' :'bg-background text-text-secondary border-border hover:border-primary'
                }`}
              >
                <Icon name="Type" size={16} />
                <span>Type Name</span>
              </button>
              
              <button
                onClick={() => setSignatureType('drawn')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  signatureType === 'drawn' ?'bg-primary text-primary-foreground border-primary' :'bg-background text-text-secondary border-border hover:border-primary'
                }`}
              >
                <Icon name="PenTool" size={16} />
                <span>Draw Signature</span>
              </button>
            </div>
          </div>

          {/* Typed Signature */}
          {signatureType === 'typed' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Type Your Full Name
              </label>
              <Input
                type="text"
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                placeholder="Enter your full legal name"
                className="w-full"
              />
              {typedSignature && (
                <div className="mt-3 p-4 bg-background border border-border rounded-lg">
                  <p className="text-sm text-text-secondary mb-2">Signature Preview:</p>
                  <p className="text-2xl font-script text-primary italic">{typedSignature}</p>
                </div>
              )}
            </div>
          )}

          {/* Drawn Signature */}
          {signatureType === 'drawn' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Draw Your Signature
              </label>
              <div className="border border-border rounded-lg p-4 bg-background">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={150}
                  className="w-full border border-border-light rounded cursor-crosshair bg-surface"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-text-secondary">
                    Draw your signature in the box above
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={clearCanvas}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Legal Notice */}
          <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={18} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-warning font-medium mb-1">
                  Legal Agreement
                </p>
                <p className="text-sm text-warning-700">
                  By signing this agreement, you acknowledge that you have read, understood, and agree to be legally bound by all terms and conditions outlined in this document. This digital signature has the same legal effect as a handwritten signature.
                </p>
              </div>
            </div>
          </div>

          {/* Sign Button */}
          <Button
            variant="primary"
            size="lg"
            iconName="PenTool"
            onClick={handleSignature}
            fullWidth
          >
            Sign Agreement
          </Button>
        </div>
      )}

      {/* Completion Status */}
      {requesterSigned && providerSigned && (
        <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="CheckCircle2" size={20} className="text-success" />
            <div>
              <p className="text-sm text-success font-medium">
                Agreement Fully Executed
              </p>
              <p className="text-sm text-success-700">
                Both parties have digitally signed the agreement. The contract is now legally binding and the project can commence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Waiting Message */}
      {currentUserSigned && !otherUserSigned && (
        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-primary font-medium">
                Signature Recorded
              </p>
              <p className="text-sm text-primary-700">
                Your signature has been recorded. Waiting for the {userRole === 'requester' ? 'provider' : 'requester'} to sign the agreement.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalSignature;