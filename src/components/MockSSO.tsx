'use client'

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const SSOContent = () => {
  const searchParams = useSearchParams();
  
  const handleLogin = () => {
    const redirectUri = searchParams.get('redirect_uri');
    const state = searchParams.get('state');

    if (redirectUri) {
      // 1. otp code return to front end (generate mock code)
      const mockCode = 'auth_code_' + Math.random().toString(36).substring(7);
      
      // 2. Build URL callback: redirect_uri + code + state
      // Note: redirectUri cludes app domain & path (Eg: https://prod.esoft.com/oauth2/callback)
      const callbackUrl = new URL(redirectUri);
      callbackUrl.searchParams.set('code', mockCode);
      if (state) callbackUrl.searchParams.set('state', state);

      // 3. Redirect to main app
      window.location.href = callbackUrl.toString();
    } else {
      alert("Missing redirect_uri in login request!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white shadow-xl rounded-2xl border border-gray-100 max-w-md mx-auto mt-20 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Test SSO LOGIN</h1>
      <p className="text-sm text-gray-500 mb-6 italic text-center">
        Follow OAuth2 Authorization standard
      </p>
      
      <div className="bg-blue-50 p-4 rounded-lg w-full mb-6 text-sm border border-blue-100">
        <p className="font-mono text-gray-700">
          <span className="font-semibold text-blue-700 underline">Client App:</span><br/>
          {searchParams.get('client_id') || 'Unknown Client'}
        </p>
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-4 px-6 bg-[#0052cc] hover:bg-[#0747a6] text-white font-bold rounded-md transition-all shadow-lg active:scale-95"
      >
        Authorize
      </button>
      
      <ul className="mt-8 text-[11px] text-gray-400 list-disc px-4">
        <li>Code sample is created random for mock test</li>
        <li>Support state token</li>
        <li>Only accept properly callback URL</li>
      </ul>
    </div>
  );
};

const MockSSO = () => (
  <Suspense fallback={<div className="flex justify-center mt-20 font-sans text-gray-500">Loading SSO...</div>}>
    <SSOContent />
  </Suspense>
);

export default MockSSO;