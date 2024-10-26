import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import AccountPage from '../../pages/Account/AccountPage.tsx'
import Page404 from '../../pages/Error/404.tsx'
import LandingPage from '../../pages/Landing/LandingPage.tsx'
import Layout from '../../pages/Layout/Layout.tsx'
import OrderFailurePage from '../../pages/Purchasing/OrderFailurePage.tsx'
import OrderSuccessPage from '../../pages/Purchasing/OrderSuccessPage.tsx'
import SettingsPage from '../../pages/Settings/SettingsPage.tsx'
import SubscriptionPage from '../../pages/Subscription/SubscriptionPage.tsx'
import { ProtectedRoutes, ProtectedSimpleRoutes } from './ProtectedRoutes.tsx'

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/ui">
        <Route element={<LandingPage />} path="" />

        <Route element={<ProtectedSimpleRoutes />}>
          <Route element={<SubscriptionPage />} path="subscription" />
          <Route element={<OrderFailurePage />} path="failure" />
          <Route element={<OrderSuccessPage />} path="completion" />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route element={<SettingsPage />} path="settings" />
            <Route element={<AccountPage />} path="account" />
          </Route>
        </Route>
        <Route element={<Page404 />} path="*" />
      </Route>
    </Routes>
  )
}

export default AppRouter
