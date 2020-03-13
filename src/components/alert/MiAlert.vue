<template>
  <div class="mi-alert">
    <div v-for="item in notices" :key="item.uid">
      <div class="content" ref="content">
        <i v-if="item.type" class="iconfont" :class="'icon-' + item.type"></i>
        <span>{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiAlert',
  data() {
    return {
      notices: [],
      uid: 0,
    }
  },
  methods: {
    add(notice) {
      const uid = this.uid++;
      const _notice = Object.assign({
        uid
      }, notice);
      this.notices.push(_notice);
      // 删除notice
      const { duration } = notice;
      setTimeout(() => {
        this.remove(uid);
      }, duration * 1000);
    },
    remove(uid) {
      const notices = this.notices;

      for (let i = 0; i < notices.length; i++) {
        if (notices[i].uid === uid) {
          this.notices.splice(i, 1);
          break;
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1658801_w33xtqvbflt.eot?t=1582729480437'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1658801_w33xtqvbflt.eot?t=1582729480437#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOgAAsAAAAAB+wAAANRAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDKIJeATYCJAMQCwoABCAFhG0HRhvOBsgOJQnBwABgBgNAPHw/9u3c9+7/+9a0iXhFp5OYbtI8UkmQAqETGtNJvprJ+7867ReIVUSwHclxSHmK0vaAcSIcFsStwOvxSODzf+/0/4b4vPYtlzWHvSj6WGBxxzuB7YltSnCAlCA3jF21lAZ9mECfGUks7tY0dYG9hEcF4pUiC2CfSkopV5rQLVmYNb6AjVY+Wb4BPvufjys4CHuKToUn3ntSrYKyU2eTVhv/bzTkUqAazw95GRVbQBLPSoMPWIXFLVb6zN9YOwGapnAKp/jdh///oXovxkb+8ihCJbowOQCOUKlyCoyhcIoZgrNJQoUX8npDD14DX0e7CkVVBsbc3HoHFtbMnPZM/e2a/tc9e7b6uF/iCZ/uY36ye+P4Y96qo75rNOdfZV244q++M93tNjtLrj+P97kKJ6e6HGdmAjf1X9l9b9P9PXc3rukqH0A+jAw+qf/4BW/vo6d8uruObjy2x6+32+fYZT+/E6d9e3pPbDq+27urp8xitfVyRMSy9ZR1aITNss1UaOiUd+2I0LSDzyIjaWTGdqIyN3hmRODICEXCGAp+Xh4du3PDIeZqx8jYj8TGcov7ZRZgwp/PmW0VHlEhHgGHbevL6MaBhz1C2KWK7O05kzk7cwDVjfPWCFnPEztCXBt3qa7g7iSyxoIcxIUJ7//eE0HDiIIQIChdv1vV/rLv+H/n0fZRt6KvzSnBj7XX7P2a640J9SPAe1e1Vv2gdukIqWiwK9MwqDVn+7S0c5v5gj4S5RpFx6yMYZ40SUIzGaPoMY2qWaKTv4WOfkfoam6k+mza6zH0G8dYiezFhm0QYcRtFEO+oRrxlk7+MjqmfEHXSFihz/3w2rDfSiiOlQwLHKuQuAopEjUQ6uGOQXUHls06gSU1vqAHM5OSQekpadlKLTZgNsYU07icwTlBhFE9qgHHYZ2OIiOjGizxFDXnxoLUVFL2oBSJ6sHRHQwm4DAVRLQKopBQBsRtzjnm3t8Bk5npCFgNqyndA2NMlM6RdCnSWtC1RkMr1rWcYjJOloHjCIRgKD2kBvgxHSlSiLG8nwYm4VKoe+SNCqSieqStMWV+s/4Jt0AfvEFGiRoZHb0P1dggy5T57TRK0Eugtia1IgoKAAAAAA==') format('woff2'),
  url('//at.alicdn.com/t/font_1658801_w33xtqvbflt.woff?t=1582729480437') format('woff'),
  url('//at.alicdn.com/t/font_1658801_w33xtqvbflt.ttf?t=1582729480437') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1658801_w33xtqvbflt.svg?t=1582729480437#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  margin-right: 5px;
}
.mi-alert {
  z-index: 9999;
  font-size: 14px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  text-align: center;
  .content {
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
    animation: fade .6s ease 1s, show-down .1s ease-in forwards;

    .icon-chenggong:before {
      color: $success;
    }
    .icon-jinggao:before {
      color: $warning;
    }

    .icon-shibai:before {
      color: $danger;
    }
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes show-down {
  0% {
    transform: translate(0, 0)
  }
  100% {
    transform: translate(0, 16px)
  }
}
</style>