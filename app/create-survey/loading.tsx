"use client";

import React from 'react';
import { motion } from 'framer-motion';
import KikiAndJiji from '../icons/KikiAndJiji';

export default function Loading() {
    const flyAnimation = {
        initial: { x: 0, y: '100vh' },
        animate: { x: '100vw', y: '-100vh' },
    };

    const flyTransition = {
        duration: 3,
        ease: 'linear',
        repeat: Infinity,
    };

    return (
        <motion.div
            className="h-screen w-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="flying-image h-full w-full"
                variants={flyAnimation}
                initial="initial"
                animate="animate"
                transition={flyTransition}
            >
                <KikiAndJiji width="200" height="200" color="white" />
            </motion.div>
        </motion.div>
    );
}
