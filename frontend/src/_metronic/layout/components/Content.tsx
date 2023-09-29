import clsx from 'clsx'
import { FC, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useAuth } from '../../../app/modules/auth'
import { getUserByToken, refreshAuthToken } from '../../../app/modules/auth/core/_requests'
import { DrawerComponent } from '../../assets/ts/components'
import { WithChildren } from '../../helpers'
import { useLayout } from '../core'

const Content: FC<WithChildren> = ({children}) => {
    const {classes} = useLayout()  
    const location = useLocation()
    const {auth, saveAuth, setCurrentUser} = useAuth()
    useEffect(() => {
        DrawerComponent.hideAll()
    }, [location])

    const refreshToken = async () => {        
        const data = await refreshAuthToken(JSON.stringify({refresh:auth?.refreshToken}));  
        saveAuth(data)
        const {data: user} = await getUserByToken(data?.token)
        setCurrentUser(user)
    }

    useEffect(()=>{        
        const REFRESH_INTERVAL = 1000 * 60 * 19;
        const interval = setInterval(()=>{
            if(auth){
                refreshToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth])

  return (
    <div id='kt_content_container' className={clsx(classes.contentContainer.join(' '))}>
      {children}
    </div>
  )
}

export { Content }

