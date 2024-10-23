import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  let { t } = useTranslation()

  return (
    <div className="welcome__page bg-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="title_Dynamic  border-round shadow rounded-3">
        <h3>   {t('Welcome')}  </h3>
      </div>
    </div>
  );
};

export default Home;
