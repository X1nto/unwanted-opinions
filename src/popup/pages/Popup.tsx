import styles from './Popup.module.css';
import Switch from '../components/Switch';
import SwitchSetting from '../components/Settings';

export default function Popup() {
  return (
    <div class={styles.container}>
      <h2>Unwanted Opinion</h2>
      <div class={styles.settings}>
        <SwitchSetting
          title="8 dollars? What a shame!"
          description="Block tweets from Twitter Blue users"
          key="block-blues"
        />
      </div>
    </div>
  );
}
