import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../_metronic/partials'
import { Provider } from 'react-redux';  // Add this import
import store from '../redux/store'; // Adjust the path

const App = () => {
  return (
      <Provider store={store}>
        <Suspense fallback={<LayoutSplashScreen />}>
          <I18nProvider>
            <LayoutProvider>
              <ThemeModeProvider>
                <AuthInit>
                  <Outlet />
                  <MasterInit />
                </AuthInit>
              </ThemeModeProvider>
            </LayoutProvider>
          </I18nProvider>
        </Suspense>
      </Provider>
  )
}

export {App}
