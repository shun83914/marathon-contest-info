<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute , useRouter} from 'vue-router';
  import logo from '@/assets/logo.png'
  
  const router = useRouter();
  const route = useRoute();
  const idc = ref('');
  const rn = ref('');
  const checked = ref('0');
  const pattern = /\d{18}/;
  const aid = route.query.aid;

  const onSubmit = (values) => {
    router.push({
      name: 'Detail',
      params: {
        aid: aid,
        idCard: values.idc,
        realName: values.rn,
        proxy: values.px
      }
    });
  };
</script>

<template>
  <div class="list flex-center py-8 flex-row">
    <span class="logo">
			<van-image width="50" :src="logo" />
		</span>
    <span style="font-size: 20px; color: #FFF;">领物信息查询程序</span>
  </div>
  <div style="margin-top: 1px;">
  <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      type=number
      v-model="idc"
      name="idc"
      label="证件号"
      placeholder="二代身份证或护照"
      :rules="[{ pattern, message: '请填写正确的证件号' }]"
    />
    <van-field
      v-model="rn"
      name="rn"
      label="姓名"
      placeholder="真实姓名" 
      :rules="[{ required: true, message: '请填写真实姓名' }]"
    />
    <van-field name="px" label="领取方式">
      <template #input>
        <van-radio-group v-model="checked" direction="horizontal">
          <van-radio name="0">本人</van-radio>
          <van-radio name="1">代领</van-radio>
        </van-radio-group>
      </template>
    </van-field>
  </van-cell-group>
  <div class="van-safe-area-bottom" style="margin: 0.5rem;">
    <van-button round type="primary" size="large" native-type="submit">
      提交查询信息
    </van-button>
  </div>
  </van-form>
  </div>
  <div style="margin-top: 0.5rem;">
    <span style="font-size: 8px; color: #F8F8FF; text-align: center; display: block;">技术开发：苏子 </span>
  </div>
</template>
