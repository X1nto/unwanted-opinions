const verifiedTick =
  'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"]';

const titleStyle = 'font-size:15px;font-weight:700;';
const descriptionStyle = 'font-size:15px;font-weight:400;';
const iconStyle =
  'width:100%;height:24px;fill:rgb(255, 255, 255);margin-bottom:12px;';
const buttonStyle =
  'background-color:rgba(255, 255, 255, 0.25);backdrop-filter:blur(4px);align-self:flex-end;border-radius:9999px;padding-left:16px;padding-right:16px;padding-top:8px;padding-bottom:8px;min-height:32px;margin-top:12px;cursor:pointer;border:none;color:rgb(255,255,255);font-family:TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;';
const buttonTextStyle = 'font-size:14px;font-weight:700;';

interface Settings {
  'block-blues'?: boolean;
}

interface CheckmarkProps {
  children: {
    props: {
      isBlueVerified: boolean;
    };
  }[][];
}

async function main() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;

        const settingsDiv = document.getElementById(
          'unwanted-opinions-settings'
        );
        const settings =
          settingsDiv !== null
            ? (JSON.parse(settingsDiv.innerText) as Settings)
            : undefined;

        if (settings === undefined) return;
        if (!settings['block-blues']) return;

        //credits to @busybox11 for this
        const verifications = node.querySelectorAll(verifiedTick);
        for (const verification of verifications) {
          const props = getReactProps<CheckmarkProps>(
            verification.parentElement?.parentElement?.parentElement,
            verification.parentElement?.parentElement
          );
          const isBlueVerified = props?.children[0][0].props.isBlueVerified;
          if (!isBlueVerified) {
            continue;
          }
          let article = verification.closest('article');

          if (article === null) continue;

          const actualTweet = article.children[0] as HTMLElement; //return if we already cucked blue users
          if (actualTweet.style.filter != '') continue;

          const actualTweetHeight = actualTweet.offsetHeight;

          const parentDiv = document.createElement('div');
          parentDiv.style.cssText = `
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            width: ${actualTweet.offsetWidth}px;
            height: ${actualTweet.offsetHeight}px;
            font-family:TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: rgb(255, 255, 255);
          `;

          const actionContainer = document.createElement('div');
          actionContainer.style.cssText = `
            padding: 32px;          display: flex;          flex-direction: column;          gap: 10px;        `;
          actionContainer.insertAdjacentHTML(
            'beforeend',
            `
            <svg viewBox="0 0 24 24" aria-hidden="true" style='${iconStyle}'><g><path d="M3.693 21.707l-1.414-1.414 2.429-2.429c-2.479-2.421-3.606-5.376-3.658-5.513l-.131-.352.131-.352c.133-.353 3.331-8.648 10.937-8.648 2.062 0 3.989.621 5.737 1.85l2.556-2.557 1.414 1.414L3.693 21.707zm-.622-9.706c.356.797 1.354 2.794 3.051 4.449l2.417-2.418c-.361-.609-.553-1.306-.553-2.032 0-2.206 1.794-4 4-4 .727 0 1.424.192 2.033.554l2.263-2.264C14.953 5.434 13.512 5 11.986 5c-5.416 0-8.258 5.535-8.915 7.001zM11.986 10c-1.103 0-2 .897-2 2 0 .178.023.352.067.519l2.451-2.451c-.167-.044-.341-.067-.519-.067zm10.951 1.647l.131.352-.131.352c-.133.353-3.331 8.648-10.937 8.648-.709 0-1.367-.092-2-.223v-2.047c.624.169 1.288.27 2 .27 5.415 0 8.257-5.533 8.915-7-.252-.562-.829-1.724-1.746-2.941l1.438-1.438c1.53 1.971 2.268 3.862 2.33 4.027z"></path></g></svg>
            <span style='${titleStyle}'>Content Warning: This MF paid for Twitter!</span>
            <span style='${descriptionStyle}'>The Tweet author paid 8 dollars for a goddamn checkmark.</span>
            `
          );

          const showButton = document.createElement('button');
          showButton.style.cssText = buttonStyle;
          showButton.addEventListener('click', () => {
            parentDiv.remove();
            actualTweet.style.filter = '';
            actualTweet.style.height = actualTweetHeight + 'px';
            parentDiv.style.height = actualTweetHeight + 'px';
          });
          showButton.innerHTML = `
          <div style='display: flex; flex-direction: column; justify-content: center; height: 100%'>
            <span style='${buttonTextStyle}'>Show<span/>
          <div>
          `;

          actualTweet.style.filter = 'blur(30px)';

          actionContainer.appendChild(showButton);
          parentDiv.appendChild(actionContainer);
          article.appendChild(parentDiv);

          //fix the cut-off
          if (actualTweetHeight < actionContainer.offsetHeight) {
            actualTweet.style.height = actionContainer.offsetHeight + 'px';
            parentDiv.style.height = actionContainer.offsetHeight + 'px';
          }
        }
      }
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

// Kanged from https://stackoverflow.com/a/74240138/12578905
function getReactProps<T>(parent: any, target: any): T | null {
  const keyof_ReactProps = Object.keys(parent).find((k) =>
    k.startsWith('__reactProps$')
  );
  const symof_ReactFragment = Symbol.for('react.fragment');

  if (keyof_ReactProps === undefined) {
    return null;
  }

  //Find the path from target to parent
  let path = [];
  let elem = target;
  while (elem !== parent) {
    let index = 0;
    for (let sibling = elem; sibling != null; ) {
      if (sibling[keyof_ReactProps]) index++;
      sibling = sibling.previousElementSibling;
    }
    path.push({ child: elem, index });
    elem = elem.parentElement;
  }
  //Walk down the path to find the react state props
  let state = elem[keyof_ReactProps];
  for (let i = path.length - 1; i >= 0 && state != null; i--) {
    //Find the target child state index
    let childStateIndex = 0,
      childElemIndex = 0;
    while (childStateIndex < state.children.length) {
      let childState = state.children[childStateIndex];
      if (childState instanceof Object) {
        //Fragment children are inlined in the parent DOM element
        let isFragment =
          childState.type === symof_ReactFragment &&
          childState.props.children.length;
        childElemIndex += isFragment ? childState.props.children.length : 1;
        if (childElemIndex === path[i].index) break;
      }
      childStateIndex++;
    }
    let childState =
      state.children[childStateIndex] ??
      (childStateIndex === 0 ? state.children : null);
    state = childState?.props;
    elem = path[i].child;
  }
  return state as T;
}

main();
