"use client";
import { useEffect, useState } from "react";
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";

function Login() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    async function loadProviders() {
      const res = await getProviders();
      setProviders(res);
    }

    loadProviders();
  }, []);

  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 pb-10 text-center text-3xl font-extrabold text-gray-900">
            創造エンジニアにログイン
          </h2>
          <span className="mb-10">
            ユーザー登録がまだの場合も、下記で認証いただくと自動的にユーザー登録されます
          </span>
        </div>
        <div className="mt-8 space-y-6">
          {providers &&
            Object.values(providers).map((provider) => {
              const isGoogle = provider.name === "Google";
              return (
                <div key={provider.id} className="text-center">
                  <button
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    className={`font-bold py-2 px-4 rounded flex items-center justify-center w-full ${
                      isGoogle
                        ? "bg-white text-black hover:bg-gray-200 border"
                        : "bg-gray-900 hover:bg-gray-700 text-white"
                    }`}
                  >
                    {isGoogle ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        className="w-6 h-6 mr-2"
                        viewBox="0 0 256 262"
                      >
                        <path
                          fill="#4285F4"
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        />
                        <path
                          fill="#34A853"
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        />
                        <path
                          fill="#FBBC05"
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                        />
                        <path
                          fill="#EB4335"
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        />
                      </svg>
                    ) : (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                      >
                        <title>GitHub icon</title>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    <span>
                      {isGoogle ? "Googleでログイン" : "Githubでログイン"}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Login;
