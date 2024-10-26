import 'react-toastify/dist/ReactToastify.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LoadingCircular from './components/common/Loading/LoadingCircular.tsx'
import LocaleProvider from './containers/LocaleProvider/index.tsx'
import AppRouter from './containers/Routes/index.tsx'
import { appTheme } from './utils/palette.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
})

function App() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.href = '/ui'
    }
  }, [])

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <CssBaseline />
          <LocaleProvider>
            <HelmetProvider>
              <Suspense fallback={<LoadingCircular />}>
                <ThemeProvider theme={appTheme}>
                  <CssBaseline />
                  <AppRouter />
                  <ToastContainer
                    closeOnClick
                    draggable
                    pauseOnFocusLoss
                    pauseOnHover
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    position="top-right"
                    rtl={false}
                  />
                </ThemeProvider>
              </Suspense>
            </HelmetProvider>
          </LocaleProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
