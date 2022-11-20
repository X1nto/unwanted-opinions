import styles from './Switch.module.css';

export interface SwitchProps {
  checked?: boolean;
  onChange?: () => void;
}

export default function Switch(props: SwitchProps) {
  return (
    <label class={styles.switch}>
      <input
        class={styles.input}
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      ></input>
      <span class={styles.slider}></span>
    </label>
  );
}
