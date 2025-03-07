
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import AuthLayout from '@/components/AuthLayout';

const VerifyEmail: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [email] = useState<string>('user@example.com'); // In a real app, get this from context/state
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Email verified!",
        description: "Your email has been successfully verified.",
      });
      navigate('/profile');
    }, 2000);
  };

  const handleResendEmail = () => {
    setCanResend(false);
    setCountdown(60);
    
    toast({
      title: "Verification email sent",
      description: "Please check your inbox for a new verification link.",
    });
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We've sent a verification link to your email"
    >
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Mail className="h-10 w-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            We've sent a verification link to <span className="font-medium">{email}</span>
          </p>
        </div>
        
        {/* For demo purposes, we'll add a button to simulate clicking the email link */}
        <Button 
          onClick={handleVerify} 
          className="w-full"
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Simulate Email Verification
            </>
          )}
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Didn't receive the email?{" "}
          {canResend ? (
            <button 
              onClick={handleResendEmail}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Click to resend
            </button>
          ) : (
            <span>Resend in {countdown}s</span>
          )}
        </div>
        
        <div className="text-sm">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Back to login
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
