import React from 'react';
import { useTranslation } from 'react-i18next';
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <div className="select" style={{ marginTop: '10px' }}>
      <select value={i18n.languages[0]} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value="en">{t('english')}</option>
        <option value="fr">{t('french')}</option>
        <option value="pt">{t('portuguese')}</option>
        <option value="es">{t('spanish')}</option>
      </select>
    </div>
  );
}
export default LanguageSwitcher;
