'use client'

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const SSOContent = () => {
  const searchParams = useSearchParams();
  
  const handleLogin = () => {
    const redirectUri = searchParams.get('redirect_uri');
    const state = searchParams.get('state');

    if (redirectUri) {
      const mockCode = 'auth_code_' + Math.random().toString(36).substring(7);
      const callbackUrl = `${redirectUri}?code=${mockCode}&state=${state}`;
      window.location.href = callbackUrl;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white shadow-xl rounded-2xl border border-gray-100 max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Mock SSO Login Page
      </h1>
      
      <div className="bg-gray-50 p-4 rounded-lg w-full mb-6 text-sm text-gray-600">
        <p className="font-mono">
          <span className="font-semibold text-blue-600">Client ID:</span>{' '}
          {searchParams.get('client_id') || 'N/A'}
        </p>
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
      >
        Authorize & Login
      </button>
      
      <p className="mt-4 text-xs text-gray-400">
        This is a mock identity provider for testing.
      </p>
    </div>
  );
};

const MockSSO = () => (
  <Suspense fallback={<div className="text-center p-10">Loading SSO...</div>}>
    <SSOContent />
  </Suspense>
);

export default MockSSO;