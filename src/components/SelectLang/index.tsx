import { Icon, Menu } from 'antd';
import { getLocale, setLocale } from 'umi-plugin-react/locale';

import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import { HeaderDropdown } from 'ant-design-pro';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
  reloadPage?: boolean;
}

const SelectLang: React.FC<SelectLangProps> = props => {
  const { className, reloadPage } = props;
  const selectedLang = getLocale();
  const changeLang = ({ key }: ClickParam): void => setLocale(key, reloadPage || false);
  const locales = ['en-US', 'zh-CN', 'zh-TW', 'pt-BR'];
  const languageLabels = {
    'en-US': 'English',
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    'pt-BR': 'Português',
  };
  const languageIcons = {
    'zh-CN': '🇨🇳',
    'zh-TW': '🇭🇰',
    'en-US': '🇺🇸',
    'pt-BR': '🇧🇷',
  };
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <Icon type="global" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
