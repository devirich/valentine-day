"use client"

import React from 'react';
import { useEffect } from 'react';

function AosClient() {
    useEffect(() => {
        require('aos/dist/aos');
    })
  return null;
}

export default AosClient