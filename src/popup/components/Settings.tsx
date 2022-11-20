import Switch from './Switch';
import styles from './Settings.module.css';
import { createResource, ResourceReturn, Show } from 'solid-js';

export interface SwitchSettingProps {
  title: string;
  description: string;
  key: string;
  defaultValue?: boolean;
}

export default function SwitchSetting(props: SwitchSettingProps) {
  const [value, { mutate, refetch }] = createSettingResource<boolean>(
    props.key,
    props.defaultValue !== undefined ? props.defaultValue : false
  );
  return (
    <div class={styles.container}>
      <div class={styles.info}>
        <span class={styles.title}>{props.title}</span>
        <span class={styles.description}>{props.description}</span>
      </div>
      <Show when={value() !== undefined}>
        <Switch
          checked={value()}
          onChange={() => {
            mutate((old) => !old);
            refetch();
          }}
        />
      </Show>
    </div>
  );
}

function createSettingResource<T extends browser.storage.StorageValue>(
  key: string,
  defaultValue: T
): ResourceReturn<T, unknown> {
  const [resource, { mutate, refetch }] = createResource(key, async () => {
    const storage = await(
      typeof browser !== 'undefined'
        ? browser.storage.local.get(key)
        : chrome.storage.local.get(key)
    );
    if (storage !== undefined && storage[key] !== undefined) {
      return storage[key] as T;
    } else {
      return defaultValue;
    }
  });

  const actualMutate = (async (arg: () => T) => {
    const value = mutate(arg);
    if (typeof browser !== 'undefined') {
      await browser.storage.local.set({ [key]: value });
    } else {
      await chrome.storage.local.set({ [key]: value });
    }
    return value;
  }) as typeof mutate;

  return [resource, { mutate: actualMutate, refetch }];
}
