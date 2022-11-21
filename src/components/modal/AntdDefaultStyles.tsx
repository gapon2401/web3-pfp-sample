const AntdDefaultStyles = () => {
  return (
    <style jsx global>{`
      [class^='ant-']::-ms-clear,
      [class*='ant-']::-ms-clear,
      [class^='ant-'] input::-ms-clear,
      [class*='ant-'] input::-ms-clear,
      [class^='ant-'] input::-ms-reveal,
      [class*='ant-'] input::-ms-reveal {
        display: none;
      }
      input[type='date'],
      input[type='time'],
      input[type='datetime-local'],
      input[type='month'] {
        -webkit-appearance: listbox;
      }
      [type='number']::-webkit-inner-spin-button,
      [type='number']::-webkit-outer-spin-button {
        height: auto;
      }
      [type='search']::-webkit-search-cancel-button,
      [type='search']::-webkit-search-decoration {
        -webkit-appearance: none;
      }
      ::-webkit-file-upload-button {
        font: inherit;
        -webkit-appearance: button;
      }
      .anticon {
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -0.125em;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .anticon > * {
        line-height: 1;
      }
      .anticon svg {
        display: inline-block;
      }
      .anticon::before {
        display: none;
      }
      .anticon .anticon-icon {
        display: block;
      }
      .anticon > .anticon {
        line-height: 0;
        vertical-align: 0;
      }
      .anticon[tabindex] {
        cursor: pointer;
      }
      .anticon-spin::before {
        display: inline-block;
        -webkit-animation: loadingCircle 1s infinite linear;
        animation: loadingCircle 1s infinite linear;
      }
      .anticon-spin {
        display: inline-block;
        -webkit-animation: loadingCircle 1s infinite linear;
        animation: loadingCircle 1s infinite linear;
      }
      .ant-fade-enter,
      .ant-fade-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-fade-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-fade-enter.ant-fade-enter-active,
      .ant-fade-appear.ant-fade-appear-active {
        -webkit-animation-name: antFadeIn;
        animation-name: antFadeIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-fade-leave.ant-fade-leave-active {
        -webkit-animation-name: antFadeOut;
        animation-name: antFadeOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-fade-enter,
      .ant-fade-appear {
        opacity: 0;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
      }
      .ant-fade-leave {
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
      }
      @-webkit-keyframes antFadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes antFadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @-webkit-keyframes antFadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes antFadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .ant-move-up-enter,
      .ant-move-up-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-up-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-up-enter.ant-move-up-enter-active,
      .ant-move-up-appear.ant-move-up-appear-active {
        -webkit-animation-name: antMoveUpIn;
        animation-name: antMoveUpIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-move-up-leave.ant-move-up-leave-active {
        -webkit-animation-name: antMoveUpOut;
        animation-name: antMoveUpOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-move-up-enter,
      .ant-move-up-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-move-up-leave {
        -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
      }
      .ant-move-down-enter,
      .ant-move-down-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-down-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-down-enter.ant-move-down-enter-active,
      .ant-move-down-appear.ant-move-down-appear-active {
        -webkit-animation-name: antMoveDownIn;
        animation-name: antMoveDownIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-move-down-leave.ant-move-down-leave-active {
        -webkit-animation-name: antMoveDownOut;
        animation-name: antMoveDownOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-move-down-enter,
      .ant-move-down-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-move-down-leave {
        -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
      }
      .ant-move-left-enter,
      .ant-move-left-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-left-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-left-enter.ant-move-left-enter-active,
      .ant-move-left-appear.ant-move-left-appear-active {
        -webkit-animation-name: antMoveLeftIn;
        animation-name: antMoveLeftIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-move-left-leave.ant-move-left-leave-active {
        -webkit-animation-name: antMoveLeftOut;
        animation-name: antMoveLeftOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-move-left-enter,
      .ant-move-left-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-move-left-leave {
        -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
      }
      .ant-move-right-enter,
      .ant-move-right-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-right-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-move-right-enter.ant-move-right-enter-active,
      .ant-move-right-appear.ant-move-right-appear-active {
        -webkit-animation-name: antMoveRightIn;
        animation-name: antMoveRightIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-move-right-leave.ant-move-right-leave-active {
        -webkit-animation-name: antMoveRightOut;
        animation-name: antMoveRightOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-move-right-enter,
      .ant-move-right-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-move-right-leave {
        -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
      }
      @-webkit-keyframes antMoveDownIn {
        0% {
          transform: translateY(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @keyframes antMoveDownIn {
        0% {
          transform: translateY(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @-webkit-keyframes antMoveDownOut {
        0% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateY(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @keyframes antMoveDownOut {
        0% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateY(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @-webkit-keyframes antMoveLeftIn {
        0% {
          transform: translateX(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @keyframes antMoveLeftIn {
        0% {
          transform: translateX(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @-webkit-keyframes antMoveLeftOut {
        0% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateX(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @keyframes antMoveLeftOut {
        0% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateX(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @-webkit-keyframes antMoveRightIn {
        0% {
          transform: translateX(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @keyframes antMoveRightIn {
        0% {
          transform: translateX(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @-webkit-keyframes antMoveRightOut {
        0% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @keyframes antMoveRightOut {
        0% {
          transform: translateX(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @-webkit-keyframes antMoveUpIn {
        0% {
          transform: translateY(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @keyframes antMoveUpIn {
        0% {
          transform: translateY(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
        100% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
      }
      @-webkit-keyframes antMoveUpOut {
        0% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateY(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @keyframes antMoveUpOut {
        0% {
          transform: translateY(0%);
          transform-origin: 0 0;
          opacity: 1;
        }
        100% {
          transform: translateY(-100%);
          transform-origin: 0 0;
          opacity: 0;
        }
      }
      @-webkit-keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
      [ant-click-animating='true'],
      [ant-click-animating-without-extra-node='true'] {
        position: relative;
      }
      html {
        --antd-wave-shadow-color: #1890ff;
        --scroll-bar: 0;
      }
      [ant-click-animating-without-extra-node='true']::after,
      .ant-click-animating-node {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        border-radius: inherit;
        box-shadow: 0 0 0 0 #1890ff;
        box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);
        opacity: 0.2;
        -webkit-animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1),
          waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
        animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1), waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        content: '';
        pointer-events: none;
      }
      @-webkit-keyframes waveEffect {
        100% {
          box-shadow: 0 0 0 #1890ff;
          box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
        }
      }
      @keyframes waveEffect {
        100% {
          box-shadow: 0 0 0 #1890ff;
          box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
        }
      }
      @-webkit-keyframes fadeEffect {
        100% {
          opacity: 0;
        }
      }
      @keyframes fadeEffect {
        100% {
          opacity: 0;
        }
      }
      .ant-slide-up-enter,
      .ant-slide-up-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-up-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-up-enter.ant-slide-up-enter-active,
      .ant-slide-up-appear.ant-slide-up-appear-active {
        -webkit-animation-name: antSlideUpIn;
        animation-name: antSlideUpIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-slide-up-leave.ant-slide-up-leave-active {
        -webkit-animation-name: antSlideUpOut;
        animation-name: antSlideUpOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-slide-up-enter,
      .ant-slide-up-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
      }
      .ant-slide-up-leave {
        -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      }
      .ant-slide-down-enter,
      .ant-slide-down-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-down-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-down-enter.ant-slide-down-enter-active,
      .ant-slide-down-appear.ant-slide-down-appear-active {
        -webkit-animation-name: antSlideDownIn;
        animation-name: antSlideDownIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-slide-down-leave.ant-slide-down-leave-active {
        -webkit-animation-name: antSlideDownOut;
        animation-name: antSlideDownOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-slide-down-enter,
      .ant-slide-down-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
      }
      .ant-slide-down-leave {
        -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      }
      .ant-slide-left-enter,
      .ant-slide-left-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-left-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-left-enter.ant-slide-left-enter-active,
      .ant-slide-left-appear.ant-slide-left-appear-active {
        -webkit-animation-name: antSlideLeftIn;
        animation-name: antSlideLeftIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-slide-left-leave.ant-slide-left-leave-active {
        -webkit-animation-name: antSlideLeftOut;
        animation-name: antSlideLeftOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-slide-left-enter,
      .ant-slide-left-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
      }
      .ant-slide-left-leave {
        -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      }
      .ant-slide-right-enter,
      .ant-slide-right-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-right-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-slide-right-enter.ant-slide-right-enter-active,
      .ant-slide-right-appear.ant-slide-right-appear-active {
        -webkit-animation-name: antSlideRightIn;
        animation-name: antSlideRightIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-slide-right-leave.ant-slide-right-leave-active {
        -webkit-animation-name: antSlideRightOut;
        animation-name: antSlideRightOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-slide-right-enter,
      .ant-slide-right-appear {
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
      }
      .ant-slide-right-leave {
        -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      }
      @-webkit-keyframes antSlideUpIn {
        0% {
          transform: scaleY(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
        100% {
          transform: scaleY(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
      }
      @keyframes antSlideUpIn {
        0% {
          transform: scaleY(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
        100% {
          transform: scaleY(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
      }
      @-webkit-keyframes antSlideUpOut {
        0% {
          transform: scaleY(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
        100% {
          transform: scaleY(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
      }
      @keyframes antSlideUpOut {
        0% {
          transform: scaleY(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
        100% {
          transform: scaleY(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
      }
      @-webkit-keyframes antSlideDownIn {
        0% {
          transform: scaleY(0.8);
          transform-origin: 100% 100%;
          opacity: 0;
        }
        100% {
          transform: scaleY(1);
          transform-origin: 100% 100%;
          opacity: 1;
        }
      }
      @keyframes antSlideDownIn {
        0% {
          transform: scaleY(0.8);
          transform-origin: 100% 100%;
          opacity: 0;
        }
        100% {
          transform: scaleY(1);
          transform-origin: 100% 100%;
          opacity: 1;
        }
      }
      @-webkit-keyframes antSlideDownOut {
        0% {
          transform: scaleY(1);
          transform-origin: 100% 100%;
          opacity: 1;
        }
        100% {
          transform: scaleY(0.8);
          transform-origin: 100% 100%;
          opacity: 0;
        }
      }
      @keyframes antSlideDownOut {
        0% {
          transform: scaleY(1);
          transform-origin: 100% 100%;
          opacity: 1;
        }
        100% {
          transform: scaleY(0.8);
          transform-origin: 100% 100%;
          opacity: 0;
        }
      }
      @-webkit-keyframes antSlideLeftIn {
        0% {
          transform: scaleX(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
        100% {
          transform: scaleX(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
      }
      @keyframes antSlideLeftIn {
        0% {
          transform: scaleX(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
        100% {
          transform: scaleX(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
      }
      @-webkit-keyframes antSlideLeftOut {
        0% {
          transform: scaleX(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
        100% {
          transform: scaleX(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
      }
      @keyframes antSlideLeftOut {
        0% {
          transform: scaleX(1);
          transform-origin: 0% 0%;
          opacity: 1;
        }
        100% {
          transform: scaleX(0.8);
          transform-origin: 0% 0%;
          opacity: 0;
        }
      }
      @-webkit-keyframes antSlideRightIn {
        0% {
          transform: scaleX(0.8);
          transform-origin: 100% 0%;
          opacity: 0;
        }
        100% {
          transform: scaleX(1);
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
      @keyframes antSlideRightIn {
        0% {
          transform: scaleX(0.8);
          transform-origin: 100% 0%;
          opacity: 0;
        }
        100% {
          transform: scaleX(1);
          transform-origin: 100% 0%;
          opacity: 1;
        }
      }
      @-webkit-keyframes antSlideRightOut {
        0% {
          transform: scaleX(1);
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          transform: scaleX(0.8);
          transform-origin: 100% 0%;
          opacity: 0;
        }
      }
      @keyframes antSlideRightOut {
        0% {
          transform: scaleX(1);
          transform-origin: 100% 0%;
          opacity: 1;
        }
        100% {
          transform: scaleX(0.8);
          transform-origin: 100% 0%;
          opacity: 0;
        }
      }
      .ant-zoom-enter,
      .ant-zoom-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-enter.ant-zoom-enter-active,
      .ant-zoom-appear.ant-zoom-appear-active {
        -webkit-animation-name: antZoomIn;
        animation-name: antZoomIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-zoom-leave.ant-zoom-leave-active {
        -webkit-animation-name: antZoomOut;
        animation-name: antZoomOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-zoom-enter,
      .ant-zoom-appear {
        transform: scale(0);
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-zoom-enter-prepare,
      .ant-zoom-appear-prepare {
        transform: none;
      }
      .ant-zoom-leave {
        -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
        animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      .ant-zoom-big-enter,
      .ant-zoom-big-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-big-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-big-enter.ant-zoom-big-enter-active,
      .ant-zoom-big-appear.ant-zoom-big-appear-active {
        -webkit-animation-name: antZoomBigIn;
        animation-name: antZoomBigIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-zoom-big-leave.ant-zoom-big-leave-active {
        -webkit-animation-name: antZoomBigOut;
        animation-name: antZoomBigOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-zoom-big-enter,
      .ant-zoom-big-appear {
        transform: scale(0);
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-zoom-big-enter-prepare,
      .ant-zoom-big-appear-prepare {
        transform: none;
      }
      .ant-zoom-big-leave {
        -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
        animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      .ant-zoom-big-fast-enter,
      .ant-zoom-big-fast-appear {
        -webkit-animation-duration: 0.1s;
        animation-duration: 0.1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-big-fast-leave {
        -webkit-animation-duration: 0.1s;
        animation-duration: 0.1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-big-fast-enter.ant-zoom-big-fast-enter-active,
      .ant-zoom-big-fast-appear.ant-zoom-big-fast-appear-active {
        -webkit-animation-name: antZoomBigIn;
        animation-name: antZoomBigIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-zoom-big-fast-leave.ant-zoom-big-fast-leave-active {
        -webkit-animation-name: antZoomBigOut;
        animation-name: antZoomBigOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-zoom-big-fast-enter,
      .ant-zoom-big-fast-appear {
        transform: scale(0);
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-zoom-big-fast-enter-prepare,
      .ant-zoom-big-fast-appear-prepare {
        transform: none;
      }
      .ant-zoom-big-fast-leave {
        -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
        animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      .ant-zoom-up-enter,
      .ant-zoom-up-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-up-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-up-enter.ant-zoom-up-enter-active,
      .ant-zoom-up-appear.ant-zoom-up-appear-active {
        -webkit-animation-name: antZoomUpIn;
        animation-name: antZoomUpIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-zoom-up-leave.ant-zoom-up-leave-active {
        -webkit-animation-name: antZoomUpOut;
        animation-name: antZoomUpOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-zoom-up-enter,
      .ant-zoom-up-appear {
        transform: scale(0);
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-zoom-up-enter-prepare,
      .ant-zoom-up-appear-prepare {
        transform: none;
      }
      .ant-zoom-up-leave {
        -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
        animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      .ant-zoom-down-enter,
      .ant-zoom-down-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-down-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-down-enter.ant-zoom-down-enter-active,
      .ant-zoom-down-appear.ant-zoom-down-appear-active {
        -webkit-animation-name: antZoomDownIn;
        animation-name: antZoomDownIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-zoom-down-leave.ant-zoom-down-leave-active {
        -webkit-animation-name: antZoomDownOut;
        animation-name: antZoomDownOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-zoom-down-enter,
      .ant-zoom-down-appear {
        transform: scale(0);
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-zoom-down-enter-prepare,
      .ant-zoom-down-appear-prepare {
        transform: none;
      }
      .ant-zoom-down-leave {
        -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
        animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      .ant-zoom-left-enter,
      .ant-zoom-left-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-left-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-left-enter.ant-zoom-left-enter-active,
      .ant-zoom-left-appear.ant-zoom-left-appear-active {
        -webkit-animation-name: antZoomLeftIn;
        animation-name: antZoomLeftIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-zoom-left-leave.ant-zoom-left-leave-active {
        -webkit-animation-name: antZoomLeftOut;
        animation-name: antZoomLeftOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-zoom-left-enter,
      .ant-zoom-left-appear {
        transform: scale(0);
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-zoom-left-enter-prepare,
      .ant-zoom-left-appear-prepare {
        transform: none;
      }
      .ant-zoom-left-leave {
        -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
        animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      .ant-zoom-right-enter,
      .ant-zoom-right-appear {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-right-leave {
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
      }
      .ant-zoom-right-enter.ant-zoom-right-enter-active,
      .ant-zoom-right-appear.ant-zoom-right-appear-active {
        -webkit-animation-name: antZoomRightIn;
        animation-name: antZoomRightIn;
        -webkit-animation-play-state: running;
        animation-play-state: running;
      }
      .ant-zoom-right-leave.ant-zoom-right-leave-active {
        -webkit-animation-name: antZoomRightOut;
        animation-name: antZoomRightOut;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        pointer-events: none;
      }
      .ant-zoom-right-enter,
      .ant-zoom-right-appear {
        transform: scale(0);
        opacity: 0;
        -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      }
      .ant-zoom-right-enter-prepare,
      .ant-zoom-right-appear-prepare {
        transform: none;
      }
      .ant-zoom-right-leave {
        -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
        animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      @-webkit-keyframes antZoomIn {
        0% {
          transform: scale(0.2);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      @keyframes antZoomIn {
        0% {
          transform: scale(0.2);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      @-webkit-keyframes antZoomOut {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0.2);
          opacity: 0;
        }
      }
      @keyframes antZoomOut {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0.2);
          opacity: 0;
        }
      }
      @-webkit-keyframes antZoomBigIn {
        0% {
          transform: scale(0.8);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      @keyframes antZoomBigIn {
        0% {
          transform: scale(0.8);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      @-webkit-keyframes antZoomBigOut {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0.8);
          opacity: 0;
        }
      }
      @keyframes antZoomBigOut {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0.8);
          opacity: 0;
        }
      }
      @-webkit-keyframes antZoomUpIn {
        0% {
          transform: scale(0.8);
          transform-origin: 50% 0%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 50% 0%;
        }
      }
      @keyframes antZoomUpIn {
        0% {
          transform: scale(0.8);
          transform-origin: 50% 0%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 50% 0%;
        }
      }
      @-webkit-keyframes antZoomUpOut {
        0% {
          transform: scale(1);
          transform-origin: 50% 0%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 50% 0%;
          opacity: 0;
        }
      }
      @keyframes antZoomUpOut {
        0% {
          transform: scale(1);
          transform-origin: 50% 0%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 50% 0%;
          opacity: 0;
        }
      }
      @-webkit-keyframes antZoomLeftIn {
        0% {
          transform: scale(0.8);
          transform-origin: 0% 50%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 0% 50%;
        }
      }
      @keyframes antZoomLeftIn {
        0% {
          transform: scale(0.8);
          transform-origin: 0% 50%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 0% 50%;
        }
      }
      @-webkit-keyframes antZoomLeftOut {
        0% {
          transform: scale(1);
          transform-origin: 0% 50%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 0% 50%;
          opacity: 0;
        }
      }
      @keyframes antZoomLeftOut {
        0% {
          transform: scale(1);
          transform-origin: 0% 50%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 0% 50%;
          opacity: 0;
        }
      }
      @-webkit-keyframes antZoomRightIn {
        0% {
          transform: scale(0.8);
          transform-origin: 100% 50%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 100% 50%;
        }
      }
      @keyframes antZoomRightIn {
        0% {
          transform: scale(0.8);
          transform-origin: 100% 50%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 100% 50%;
        }
      }
      @-webkit-keyframes antZoomRightOut {
        0% {
          transform: scale(1);
          transform-origin: 100% 50%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 100% 50%;
          opacity: 0;
        }
      }
      @keyframes antZoomRightOut {
        0% {
          transform: scale(1);
          transform-origin: 100% 50%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 100% 50%;
          opacity: 0;
        }
      }
      @-webkit-keyframes antZoomDownIn {
        0% {
          transform: scale(0.8);
          transform-origin: 50% 100%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 50% 100%;
        }
      }
      @keyframes antZoomDownIn {
        0% {
          transform: scale(0.8);
          transform-origin: 50% 100%;
          opacity: 0;
        }
        100% {
          transform: scale(1);
          transform-origin: 50% 100%;
        }
      }
      @-webkit-keyframes antZoomDownOut {
        0% {
          transform: scale(1);
          transform-origin: 50% 100%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 50% 100%;
          opacity: 0;
        }
      }
      @keyframes antZoomDownOut {
        0% {
          transform: scale(1);
          transform-origin: 50% 100%;
        }
        100% {
          transform: scale(0.8);
          transform-origin: 50% 100%;
          opacity: 0;
        }
      }
      .ant-motion-collapse-legacy {
        overflow: hidden;
      }
      .ant-motion-collapse-legacy-active {
        transition: height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      }
      .ant-motion-collapse {
        overflow: hidden;
        transition: height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      }
    `}</style>
  )
}

export default AntdDefaultStyles
