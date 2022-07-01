<template>
  <div class="home">
    <van-tabs
      v-model="curTab"
      sticky
    >
      <van-tab title="全量控件">
        <x-form
          ref="refForm"
          :schema="schema"
          v-model="form"
          :debug="false"
          :readonly="false"
          :h5="true"
          :is-detail="false"
        />
        <pre class="form__code">{{ JSON.stringify(form, null, 2) }}</pre>
      </van-tab>
      <van-tab title="分组子表单">
        <x-form
          ref="refForm2"
          :schema="schema2"
          v-model="form2"
          :debug="isDebug"
          :readonly="false"
          h5
          style="background-color: #f7f8f9"
        />
        <pre class="form__code">{{ JSON.stringify(form2, null, 2) }}</pre>
      </van-tab>
      <van-tab title="分块表单">
        <x-form
          ref="refForm3"
          :schema="schema3"
          v-model="form3"
          :debug="isDebug"
          :readonly="false"
          h5
          card
          :is-detail="false"
        />
        <pre class="form__code">{{ JSON.stringify(form3, null, 2) }}</pre>
      </van-tab>
      <van-tab title="弹窗表单">
        <van-button @click="showFormDialog = true">
          打开弹窗
        </van-button>
      </van-tab>
    </van-tabs>

    <div class="m30">
      <van-button
        type="primary"
        block
        @click="submit"
      >
        提交
      </van-button>
      <div
        class="mt10"
      />
      <van-button
        type="warning"
        block
        @click="check"
      >
        获取答案结果正确性
      </van-button>
    </div>

    <van-dialog
      v-model="showFormDialog"
      title="弹窗组件"
    >
      <x-form
        ref="refForm"
        :schema="schema4"
        v-model="form4"
        label-display="block"
        :debug="false"
        :readonly="false"
        :h5="true"
        :is-detail="false"
      />
    </van-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { VanButton, VanTabs, VanDialog } from '@xm/design-vue'
import XForm, { registry } from '../../components/form'
import { getAllWidget } from './schema/all'
import { getGroupSchema } from './schema/group'
import { getBlockSchema } from './schema/block'
import { getDialogSchema } from './schema/dialog'

registry('custom', {
  props: {
    label: String
  },
  render (h) {
    // return h(VanCell, { props: { title: this.label, border: false } })
    return null
  }
})

export default {
  name: 'Home',
  components: {
    VanButton,
    XForm,
    VanTabs,
    VanDialog
  },

  data () {
    return {
      isDebug: !/caiyun|hwminiapp/.test(navigator.userAgent),
      curTab: 2,
      showFormDialog: false,
      refForm: null,
      schema: getAllWidget(this.$createElement, this),
      form: {
        photo1: [
          { url: 'https://img01.yzcdn.cn/vant/cat.jpeg' },
          {
            url: 'http://baas.uban360.net:21006/sfs/file?digest=fid883861f8ff1e74891305b4b2460f9128',
            type: 'video/mp4',
            name: 'movie.mp4'
          }
        ],
        textarea1: '多行输入框多行输入框多行输入框多行输入框多行输入框多行输入框多行输入框多行输入框',
        input222: '输入输入输入输入输入输入输入',
        select2: ['浙江', '温州', '余杭区'],
        select3: '2',
        radio: {
          value: 1,
          children: {
            photo333: [{ url: 'https://img01.yzcdn.cn/vant/cat.jpeg' }],
            textarea_1: '说明名说明名说明名说明名'
          }
        },
        checkbox: {
          value: [1, 2]
        },
        radio2: '是',
        switch: true
      },
      schema2: getGroupSchema(this.$createElement),
      form2: {
        group: [
          {
            name: 'ym',
            mobile: 123
          }
        ]
      },
      schema3: getBlockSchema(this.$createElement),
      form3: {},
      schema4: getDialogSchema(this.$createElement),
      form4: {
        photo: [
          { url: 'https://img01.yzcdn.cn/vant/cat.jpeg' },
          { url: 'https://img01.yzcdn.cn/vant/cat.jpeg' }
        ]
      }
    }
  },

  methods: {
    submit () {
      const form = this.$refs[`refForm${this.curTab + 1}`]
      if (form.validate() !== false) {
        console.log(form.getData())
      }
    },

    check () {
      const form = this.$refs[`refForm${this.curTab + 1}`]
      console.log(form.getDataValid())
    }
  }
}
</script>

<style lang="less">
.home {
  background-color: #f7f8f9;
}
.form__code {
  overflow-x: auto;
  background-color: #f2f2f2;
  margin: 20px;
  padding: 15px;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', miui, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  font-size: 12px;
}
</style>
