import React from 'react';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Modules/**/*.tsx')
    return pages[`./Modules/${name}.tsx`]();
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})