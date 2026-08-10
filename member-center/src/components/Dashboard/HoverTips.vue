<template>
  <transition name="fade">
    <div
      ref="tooltip"
      class="toolTip"
      v-show="showTooltip"
      @mouseenter="onShow"
      @mouseleave="onHide"
      :style="`max-width: ${maxWidth}px; top: ${top}px; left: ${left}px;`">
      <div class="tooltipContent">
        <slot>no content</slot>
      </div>
      <div class="tooltipArrow"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    maxWidth: {
      type: Number,
      default: 120,
      target: {},
    }
  },
  data () {
    return {
      showTooltip: false,
      hideTimer: null,
      top: 0,
      left: 0,
      target1: this.target
    }
  },
  methods: {
    show (target, leftMenuOpen) {
      clearTimeout(this.hideTimer)
      const rect = target.getBoundingClientRect()
      const targetTop = rect.top + window.pageYOffset
      const targetLeft = rect.left + window.pageXOffset
      const targetWidth = rect.width
      this.showTooltip = true
      this.$nextTick(() => {
        const tipWidth = this.$refs.tooltip.offsetWidth
        const tipHeight = this.$refs.tooltip.offsetHeight
        this.top = targetTop - tipHeight - 40
        if(leftMenuOpen == 'open'){
          this.left = targetLeft - (tipWidth - targetWidth) / 2 - 250
        }else{
          this.left = targetLeft - (tipWidth - targetWidth) / 2
        }
      })
    },
    onShow () {
      clearTimeout(this.hideTimer)
      this.showTooltip = true
    },
    onHide () {
      this.hideTimer = setTimeout(() => {
        this.showTooltip = false
      }, 100)
    }
  }
}
</script>

<style lang="postcss" scoped>
.toolTip {
  @apply absolute z-100 pb-1.5;
}

.tooltipContent {
  @apply p-2.5 my-0 mx-auto bg-white dark:bg-black shadow-md rounded-md font-normal text-13 leading-4;
  /* word-break: break-all;
  word-wrap: break-word; */
}

.tooltipArrow {
  @apply my-0 mx-auto w-0 h-0 border-t-4 border-white dark:border-black;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  /* border-top: 4px solid #fff; */
}
</style>

