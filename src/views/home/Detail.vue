<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { getPlayerInfo, confirmPlayerInfo} from "@/api/home";
  import { onMounted, ref } from 'vue';
import { Toast } from 'vant';

  const route = useRoute();
  const aid = route.params.aid;
  const idCard = route.params.idCard;
  const realName = route.params.realName;
  const proxy = route.params.proxy;

  const datas = ref([]);
  onMounted(async () => {
      try {
        let params = {
            aid: aid,
            idCard: idCard, 
            realName: realName, 
            proxy: proxy
        };
        const result = await getPlayerInfo(params);
        if ((result != null || result != undefined) && result instanceof Array) {
            datas.value = JSON.parse(JSON.stringify(result));
            if (datas.value != undefined && datas.value instanceof Array && datas.value.length > 0){
                datas.value.forEach((item,index)=>{
                    if (item.status == 0) {
                        let confirmParams = {
                            aid: aid,
                            idCard: item.idCard, 
                            proxy: proxy
                        };
                        confirmPlayerInfo(confirmParams);
                    }
                })
            }
        }else{
            let errMsg = '查询领物信息失败，请稍后重试。';
            let r = JSON.parse(JSON.stringify(result));
            if(r == 'error'){    
                errMsg = '没有查询到您的领物信息，请联系组委会或工作人员。';
            }
            datas.value = [{"err": errMsg}];
        } 
      } catch (error) {
        console.log(error)
      } 
  });

  const hideSpecilStr = (str:string,markLenght:number) : string => {
    let res = '';
    if (str != undefined && str.length > 0) {
        if (markLenght == 11) {
            let ms = str.slice(3,7);
            res = str.replace(ms,'****');
        }else if (markLenght == 18) {
            let ms1 = str.slice(3,12);
            res = str.replace(ms1,'*********');
        }
    }
    return res;
  };
  
</script>
<template>
    <div v-for="(item,idx) in datas">
        <div v-if="item.err" style="margin-top: 1rem;">
            <span style="text-align: center; display: block; font-size: 20px; color: #FFF; margin-top: 10px;">{{ item.err }}</span>
        </div>
        <div v-else>
            <div v-if="idx == 0" style="margin-top: 1rem;">
            <span style="text-align: center; display: block; font-size: 13px; color: #FFF;">{{ item.activityTitle }}</span>
            <span style="text-align: center; display: block; font-size: 30px; color: #FFF; margin-top: 10px;">{{ item.realName }}</span>
            <span style="text-align: center; display: block; font-size: 50px; color: #FFF; margin-top: 10px;">{{ item.entryNumber }}</span>
            <span style="text-align: center; display: block; font-size: 25px; color: #FFF; margin-top: 10px;">尺 码： {{ item.clothingSize }}</span>
            <div style="margin-top: 10px;">
                <van-cell-group inset>
                <van-cell v-text="'性别：'+item.sex"/>
                <van-cell v-text="'项目：'+item.itemName" />
                <van-cell v-text="'证件号：'+hideSpecilStr(item.idCard,18)" />
                <van-cell v-text="'电话：'+hideSpecilStr(item.phone,11)" />
                <div v-if="item.status == 1">
                <van-cell title="状态：已领物" />
                </div>
                </van-cell-group>
            </div>
            </div>
            <div v-if="idx == 1" style="margin-top: 10px;">
            <van-cell-group inset>
            <van-cell>
                <view>姓名：{{ item.realName }} ({{ item.sex }})</view>
                <van-tag color="#ffe1e1" text-color="#ad0000" size="large">家庭组</van-tag>
            </van-cell>
            <van-cell v-text="'号码布：'+item.entryNumber"/>
            <van-cell v-text="'衣服尺码：'+item.clothingSize" />
            <van-cell v-text="'证件号：'+hideSpecilStr(item.idCard,18)" />
            </van-cell-group>
            </div>
        </div>
    </div>
</template>