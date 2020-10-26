<template>
  <div class="week">
      <span
      v-for="(date,index) in dateArr"
      :key="+date"
      :class="{'active':chooseDate.getDay()===index,
                'curDay':isEqualYMD(date,new Date())
      }"
      @click="$emit('click-date', date)"
      >{{date.getDate()}}</span>
  </div>
</template>

<script>
import { getOtherDate, isEqualYMD } from '@/util.js'
export default {
  props: {
    chooseDate: {
      type: Date,
      required: true
    }
  },
  computed: {
    dateArr () {
      const arr = [this.chooseDate]
      const startNum = this.chooseDate.getDay()
      const endNum = 6 - startNum

      for (var i = 0; i < startNum; i++) {
        arr.unshift(getOtherDate(this.chooseDate, -(i + 1)))
      }
      for (var a = 0; a < endNum; a++) {
        arr.push(getOtherDate(this.chooseDate, a + 1))
      }
      return arr
    }
  },
  methods: {
    isEqualYMD
  }
}
</script>

<style lang="scss" scoped>
.week{
    padding:10px;
    display: grid;
    grid-template-columns: repeat(7,1fr);
    grid-template-rows: 40px;
    gap:10px;
    span{
        text-align: center;
        line-height: 40px;
        &.curDay{
            background-color:lightseagreen;
            color:#f40;
            border-radius:20px;
        }
        &.active{
                color:#fff;
                background-color:blue;
                border-radius: 20px;
            }
    }

}
</style>
