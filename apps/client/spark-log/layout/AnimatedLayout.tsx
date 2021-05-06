import React from 'react';
import { AppBaseLayout } from './AppBaseLayout';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
export const AnimatedLayout: React.FC = ({ children }) => {
  return (
    <AnimateSharedLayout>
      <AppBaseLayout>
        <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
      </AppBaseLayout>
    </AnimateSharedLayout>
  );
};
