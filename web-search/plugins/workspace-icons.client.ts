import { h, render, type Component } from 'vue'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Back,
  Bell,
  Box,
  ChatDotRound,
  ChatLineSquare,
  Check,
  CircleCheck,
  Close,
  Connection,
  DataAnalysis,
  DataLine,
  Delete,
  Document,
  DocumentChecked,
  Edit,
  Finished,
  HomeFilled,
  House,
  InfoFilled,
  Link,
  Loading,
  Location,
  Lock,
  MagicStick,
  Menu,
  Message,
  Minus,
  Position,
  QuestionFilled,
  Refresh,
  Right,
  Search,
  Service,
  ShoppingBag,
  ShoppingCartFull,
  SuccessFilled,
  SwitchButton,
  TopRight,
  User,
  Van,
  Wallet,
  Warning,
} from '@element-plus/icons-vue'

const icons: Record<string, Component> = {
  'el-icon-arrow-down': ArrowDown,
  'el-icon-arrow-left': ArrowLeft,
  'el-icon-arrow-right': ArrowRight,
  'el-icon-arrow-up': ArrowUp,
  'el-icon-back': Back,
  'el-icon-bell': Bell,
  'el-icon-box': Box,
  'el-icon-chat-dot-round': ChatDotRound,
  'el-icon-chat-line-square': ChatLineSquare,
  'el-icon-check': Check,
  'el-icon-circle-check': CircleCheck,
  'el-icon-close': Close,
  'el-icon-connection': Connection,
  'el-icon-data-analysis': DataAnalysis,
  'el-icon-data-line': DataLine,
  'el-icon-delete': Delete,
  'el-icon-document': Document,
  'el-icon-document-checked': DocumentChecked,
  'el-icon-edit-outline': Edit,
  'el-icon-finished': Finished,
  'el-icon-house': House,
  'el-icon-info': InfoFilled,
  'el-icon-link': Link,
  'el-icon-loading': Loading,
  'el-icon-location-outline': Location,
  'el-icon-lock': Lock,
  'el-icon-magic-stick': MagicStick,
  'el-icon-menu': Menu,
  'el-icon-message': Message,
  'el-icon-minus': Minus,
  'el-icon-position': Position,
  'el-icon-question': QuestionFilled,
  'el-icon-refresh': Refresh,
  'el-icon-right': Right,
  'el-icon-s-home': HomeFilled,
  'el-icon-search': Search,
  'el-icon-service': Service,
  'el-icon-shopping-bag-1': ShoppingBag,
  'el-icon-shopping-cart-full': ShoppingCartFull,
  'el-icon-success': SuccessFilled,
  'el-icon-switch-button': SwitchButton,
  'el-icon-top-right': TopRight,
  'el-icon-truck': Van,
  'el-icon-user': User,
  'el-icon-wallet': Wallet,
  'el-icon-warning-outline': Warning,
}

function iconName(element: Element) {
  return [...element.classList].find((name) => icons[name]) || ''
}

function hydrateIcon(element: Element) {
  if (!(element instanceof HTMLElement)) return
  const name = iconName(element)
  if (!name || element.dataset.codIcon === name) return
  render(h(icons[name]), element)
  element.dataset.codIcon = name
  element.setAttribute('aria-hidden', 'true')
}

function scan(root: ParentNode) {
  if (root instanceof Element && root.matches('i[class*="el-icon-"]')) hydrateIcon(root)
  root.querySelectorAll?.('i[class*="el-icon-"]').forEach(hydrateIcon)
}

export default defineNuxtPlugin({
  name: 'workspace-icons',
  enforce: 'post',
  setup(nuxtApp) {
    nuxtApp.hook('app:mounted', () => {
      scan(document.body)
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') hydrateIcon(mutation.target as Element)
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) scan(node)
          })
        })
      })
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] })
    })
  },
})
