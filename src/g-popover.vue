<template>
    <div class="wrapper" ref="wrapper">
        <div class="pop-wrapper" :class="[`position-${this.position}`]" ref="popWrapper" v-if="showPop">
            <slot name="pop" :close="close"></slot>
        </div>
        <span ref="triggerWrap" class="btn">
            <slot></slot>
        </span>
    </div>
</template>

<script>
  export default {
    name: "g-popover",
    mounted(){
      console.log(this.eventType)
      if (this.eventType === 'click'){
        this.$refs.wrapper.addEventListener(this.eventType,this.addListener)
      }else if(this.eventType === 'hover'){

        this.$refs.wrapper.addEventListener('mouseenter',this.open)
        this.$refs.wrapper.addEventListener('mouseleave',this.close)
      }
    },
    data() {
      return {
        showPop: false
      }
    },
    // watch:{
    //   showPop:function (newx,old) {
    //     console.log(newx)
    //     console.log(old)
    //   },
    // },
    props: {
      position: {
        default: "top",
        validator(value) {
          return ['left', 'top', 'right', 'bottom'].indexOf(value) > -1
        }
      },
      eventType:{
        type:String,
        default: "click",
        validator(value) {
          return ['click', 'hover'].indexOf(value) > -1
        }
      }
    },
    methods: {
      addListener(e) {
        if (this.$refs.triggerWrap.contains(e.target)) {
          if (this.showPop) {
            this.close()
          } else {
            this.open()
          }
        }
      },
      hiddenPop(e) {
        if (this.$refs.triggerWrap.contains(e.target) || this.$refs.popWrapper.contains(e.target)) {
          console.log('什么都不做')
        } else {
          this.close()
        }
      },
      close() {
        this.showPop = false
        document.removeEventListener('click', this.hiddenPop)
        console.log('关闭，监听器消失')
      },
      open() {
        this.showPop = true
        document.addEventListener('click', this.hiddenPop)

        this.$nextTick(() => {
          document.body.appendChild(this.$refs.popWrapper)
          //将弹出层放在body中，以防用户在组件外使用overflow：hidden时弹出层被遮盖

          let { width, height, top, left } = this.$refs.triggerWrap.getBoundingClientRect()
          let popHeight = this.$refs.popWrapper.getBoundingClientRect().height
          let positionTab = {
            top: {
              'top': top + window.scrollY,
              'left': left + window.scrollX
            },
            bottom: {
              'top': top + window.scrollY + height,
              'left': left + window.scrollX
            },
            right: {
              'top': top + window.scrollY + (height - popHeight)/2,
              'left': left + window.scrollX + width
            },
            left: {
              'top': top + window.scrollY + (height - popHeight)/2,
              'left': left + window.scrollX
            }
          }
          this.$refs.popWrapper.style.left = positionTab[this.position].left + 'px'
          this.$refs.popWrapper.style.top = positionTab[this.position].top + 'px'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrapper {
        padding: 20px;
        margin: 50px;

        display: inline-block;
        vertical-align: middle;
        position: relative;
        border: 1px solid red;

        .position-left {
            //transform: translateX(-100%);
        }
        .position-right {
            //transform: translateY(-100%);
        }
    }

    .pop-wrapper {
        position: absolute;
        /*bottom: 100%;*/
        /*left: 0;*/
        /*transform: translateY(-100%);*/
        border: 1px solid red;
        &::after, &::before {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            position: absolute;
        }
        &.position-top {
            transform: translateY(-100%);
            margin-top: -10px;
            &::after, &::before {
                left: 0;
            }
            &::before {
                border-bottom: none;
                border-top-color: black;
                top: 100%;
            }
            &::after {
                border-bottom: none;
                border-top-color: white;
                top: calc(100% - 1px);
            }
        }
        &.position-bottom {
            /*transform: translateY(100%);*/
            margin-top: 10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                border-top: none;

                border-bottom-color: black;
                bottom: 100%;
            }
            &::after {
                border-top: none;

                border-bottom-color: white;
                bottom: calc(100% - 1px);
            }
        }
        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                border-left-color: black;
                border-right: none;
                left: 100%;
            }
            &::after {
                border-left-color: white;
                border-right: none;
                left: calc(100% - 1px);
            }
        }
        &.position-right {
            margin-left: 10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                border-right-color: black;
                border-left: none;
                right: 100%;
            }
            &::after {
                border-right-color: white;
                border-left: none;
                right: calc(100% - 1px);
            }
        }
    }

    .btn {
        display: inline-block;
        border: 1px solid red;
    }

</style>