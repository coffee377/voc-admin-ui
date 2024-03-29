import React from 'react';
import { connect } from 'dva';
// import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import SelectLang from '../SelectLang';
import styles from './style.less';
import { DispatchProps } from '@/typings';
import Logout from '@/components/GlobalHeader/Logout';
import Help from '@/components/GlobalHeader/Help';
import { SettingState } from '@/models/settings';

// import { ConnectProps, ConnectState } from '@/models/connect';

// export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends HeaderViewProps, DispatchProps {
  // theme?: SiderTheme;
  // layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = props => {
  const { theme, layout, dispatch } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right} ${styles.dark}`;
  }

  return (
    <div className={className}>
      {/* <HeaderSearch */}
      {/*  className={`${styles.action} ${styles.search}`} */}
      {/*  placeholder={formatMessage({ */}
      {/*    id: 'component.globalHeader.search', */}
      {/*  })} */}
      {/*  dataSource={[ */}
      {/*    formatMessage({ */}
      {/*      id: 'component.globalHeader.search.example1', */}
      {/*    }), */}
      {/*    formatMessage({ */}
      {/*      id: 'component.globalHeader.search.example2', */}
      {/*    }), */}
      {/*    formatMessage({ */}
      {/*      id: 'component.globalHeader.search.example3', */}
      {/*    }), */}
      {/*  ]} */}
      {/*  onSearch={value => { */}
      {/*    console.log('input', value); */}
      {/*  }} */}
      {/*  onPressEnter={value => { */}
      {/*    console.log('enter', value); */}
      {/*  }} */}
      {/* /> */}

      {/* <Avatar /> */}
      <Help className={styles.action} />
      <Logout
        className={styles.action}
        onConfirm={() => {
          dispatch({ type: 'account/logout', payload: { copyright: '测试' } });
        }}
      />
      <SelectLang className={styles.action} />
    </div>
  );
};

const mapStateToProps = ({ settings }: SettingState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
});

export default connect(mapStateToProps)(GlobalHeaderRight);
