<template>
  <div class="home">
    <van-popup v-model="selectShow"   position="bottom">
        <van-datetime-picker
          @confirm="confirmSelect"
          @cancel="selectShow=false"

          :value="chooseDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
        />
    </van-popup>
   <div class="header" @click="selectShow=true">{{chooseStr}}</div>
    <div class="weekHeader">
        <span v-for="item in ['日','一','二','三','四','五','六']" :key="item">{{item}}</span>
   </div>
   <van-swipe
   ref="swipe"
   class="my-swipe"
   initial-swipe="0"
   :loop="true"
   :show-indicators="false"
   @change="swipeChange"
   >
    <van-swipe-item>
      <Week :key="new Date().getTime()" :chooseDate="swipeArr[0].chooseDate" @click-date="clickDate"  v-show="weekShow"/>

       <Month :key="new Date().getTime()+111" :chooseDate="swipeArr[0].chooseDate" @click-date="clickDate" v-show="!weekShow" />

    </van-swipe-item>
   <van-swipe-item>
      <Week :chooseDate="swipeArr[1].chooseDate"  @click-date="clickDate" v-show="weekShow"/>
      <Month :chooseDate="swipeArr[1].chooseDate" @click-date="clickDate" v-show="!weekShow"/>
    </van-swipe-item>
    <van-swipe-item>
      <Week :chooseDate="swipeArr[2].chooseDate"  @click-date="clickDate" v-show="weekShow"/>
      <Month :chooseDate="swipeArr[2].chooseDate" @click-date="clickDate" v-show="!weekShow"/>
    </van-swipe-item>
  </van-swipe>
  <van-icon :name="weekShow?'arrow-down':'arrow-up'" @click="weekShow=!weekShow"/>
  </div>
</template>

<script>
import Week from '@/components/Week.vue'
import Month from '@/components/Month.vue'
import { getYMD, getOtherDate } from '@/util.js'
export default {
  data () {
    return {
      weekShow: false,
      initIndex: 0,
      chooseDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      selectShow: false
    }
  },
  computed: {
    chooseStr () {
      const obj = getYMD(this.chooseDate)
      return `${obj.year}-${obj.month + 1}-${obj.day}`
    },
    swipeArr () {
      const otherIndex = this.getOtherIndex(this.initIndex)
      const { year, month, day } = getYMD(this.chooseDate)
      const arr = [1, 2, 3]
      arr.splice(this.initIndex, 1, { chooseDate: this.weekShow ? getOtherDate(this.chooseDate, 0) : new Date(year, month, day) })
      arr.splice(otherIndex.prev, 1, { chooseDate: this.weekShow ? getOtherDate(this.chooseDate, -7) : new Date(year, month - 1, day) })
      arr.splice(otherIndex.next, 1, { chooseDate: this.weekShow ? getOtherDate(this.chooseDate, 7) : new Date(year, month + 1, day) })
      return arr
    }
  },
  components: {
    Week,
    Month
  },
  methods: {
    swipeChange (index) {
      this.chooseDate = this.swipeArr[index].chooseDate
      this.initIndex = index
    },
    confirmSelect (value) {
      this.selectShow = false
      this.chooseDate = value
    },
    clickDate (date, str) {
      const otherIndex = this.getOtherIndex(this.initIndex)
      this.chooseDate = date
      if (str === 'prev') {
        this.$refs.swipe.prev()
        this.initIndex = otherIndex.prev
      } else if (str === 'next') {
        this.$refs.swipe.next()
        this.initIndex = otherIndex.next
      }
    },
    getOtherIndex (index) {
      let obj
      switch (index) {
        case 0:obj = {
          prev: 2,
          next: 1
        }
          break
        case 1:obj = {
          prev: 0,
          next: 2
        }
          break
        case 2:obj = {
          prev: 1,
          next: 0
        }
          break
        default:
          break
      }
      return obj
    }
  }
}
</script>
<style  lang="scss" scoped>
.header{
  text-align: center;
  padding:20px 0 ;
}
.my-swipe{
  .van-swipe-item{

  }
}
.weekHeader{
  padding:10px;
  display: grid;
  grid-template-rows:50px ;
  grid-template-columns: repeat(7,1fr);
  span{
    text-align: center;
    line-height: 50px;
  }
}
</style>
