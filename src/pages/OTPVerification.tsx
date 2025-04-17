
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    
    // Countdown timer
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Only take the first character if multiple characters are pasted
      value = value[0];
    }
    
    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move to next input if current input is filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i];
      }
      
      setOtp(newOtp);
      
      // Focus the input after the last pasted digit
      const lastIndex = Math.min(pastedData.length, 5);
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus();
      }
    }
  };
  
  const handleResend = async () => {
    // Simulate API call
    toast({
      title: "OTP sent",
      description: "A new verification code has been sent to your email",
    });
    
    setTimeLeft(60);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter all 6 digits of the verification code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    if (otpString === '123456') {
      // For demo purposes, accept "123456" as valid OTP
      toast({
        title: "Success",
        description: "Email verified successfully",
      });
      
      navigate('/login');
    } else {
      toast({
        title: "Invalid code",
        description: "The verification code is incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
        <p className="text-muted-foreground">
          We've sent a code to your email. Enter the 6-digit verification code below.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-xl text-center p-0"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              disabled={isLoading}
              required
            />
          ))}
        </div>
        
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            Didn't receive a code?
          </p>
          {timeLeft > 0 ? (
            <p className="text-sm">
              Resend code in <span className="text-primary">{timeLeft}s</span>
            </p>
          ) : (
            <Button 
              variant="link" 
              className="text-primary text-sm p-0 h-auto"
              onClick={handleResend}
              type="button"
            >
              Resend code
            </Button>
          )}
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
