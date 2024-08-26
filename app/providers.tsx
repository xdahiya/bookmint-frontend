"use client";

import React from "react";
import { createContext, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export type ContextType = {
  account: string | null;
  provider: any;
  authUser: any;
  setAccount: (acc: string) => void;
  setAuthUser: (acc: any) => void;
  setProvider: (prov: any) => void;
  setCurrentRunning: (prov: any) => void;
  setIsOpen: (prov: any) => void;
  setSteps: (prov: any) => void;
};

export const GlobalContext = createContext<ContextType | null>(null);

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAcc] = useState<null | string>(null);
  const [provider, setProv] = useState<null | string>(null);
  const [authUser, setAuthUsr] = useState<any>(null);

  const [currentProgressModalStep, setCurrentProgressModalStep] = useState(0);
  const [isProgressModalOpen, setProgressModalOpen] = useState(false);
  const [progressModalSteps, setProgressModalSteps] = useState([
    {
      id: 1,
      title: "Loading....",
      desc: "",
    },
  ]);
  const showDesciption = true;

  const setAccount = (acc: string) => {
    setAcc(acc);
  };
  const setProvider = (prov: any) => {
    setProv(prov);
  };

  const setAuthUser = (prov: any) => {
    setAuthUsr(prov);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{
          account,
          provider,
          setProvider,
          setAccount,
          setCurrentRunning: setCurrentProgressModalStep,
          setIsOpen: setProgressModalOpen,
          setSteps: setProgressModalSteps,
          setAuthUser,
          authUser,
        }}
      >
        <ProgressModal isOpen={isProgressModalOpen}>
          <div className="flex justify-center items-center p-10">
            <ol className="relative border-s">
              {progressModalSteps.map((item: any, index: any) => {
                if (item.id < currentProgressModalStep) {
                  return (
                    <li key={index} className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-[#18977F]">
                        <svg
                          className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      </span>
                      <h3 className="font-medium leading-tight">
                        {item.title}
                      </h3>
                      {showDesciption && <p className="text-sm">{item.desc}</p>}
                    </li>
                  );
                }
                if (item.id == currentProgressModalStep) {
                  return (
                    <li key={index} className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ffb701]"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </span>
                      <h3 className="font-medium leading-tight">
                        {item.title}
                      </h3>
                      {showDesciption && <p className="text-sm">{item.desc}</p>}
                    </li>
                  );
                }
                if (item.id > currentProgressModalStep) {
                  return (
                    <li key={index} className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 20"
                        >
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                      </span>
                      <h3 className="font-medium leading-tight">
                        {item.title}
                      </h3>
                      {showDesciption && <p className="text-sm">{item.desc}</p>}
                    </li>
                  );
                }
              })}
            </ol>
          </div>
        </ProgressModal>
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

const ProgressModal = ({ isOpen, children }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-muted/80 p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
