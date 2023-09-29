import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_metronic/layout/core';
import {
  CampaignTable
} from './components/Table';
const dashboardBreadCrumbs = [
    {
      title: 'Home',
      path: '/Campaign',
      isSeparator: false,
      isActive: false,
    },
  ];
const CampaignPage = () => {
  useEffect(() => {
    // We have to show toolbar only for dashboard page
    document.getElementById('kt_layout_toolbar')?.classList.remove('d-none')
    return () => {
      document.getElementById('kt_layout_toolbar')?.classList.add('d-none')
    }
  }, [])

  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xxl-12'>
          <CampaignTable className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}
    </>
  )
}

const CampaignWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={dashboardBreadCrumbs}>
        {intl.formatMessage({id: 'MENU.CAMPAIGN'})}
      </PageTitle>
      <CampaignPage />
    </>
  )
}

export { CampaignWrapper };

