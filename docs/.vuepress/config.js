module.exports = {
  base:'/vue-plugin/',
  title: 'Hello VuePressxxxxx',
  description: 'Just playing around',
  themeConfig: {
    sidebar: [
      '/install/',
      '/start/',
      {
        title: '组件',
        children: [
          '/components/button.md'
        ]
      },
    ]
  }
}