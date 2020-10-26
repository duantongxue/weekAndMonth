<template>
    <div class="month">
        <span
        v-for="(date) in daysArr "
        :key="+date"
        @click="$emit('click-date',date, getPrevOrNext(chooseDate,date))"
        :class="{
            'otherMonth':getPrevOrNext(chooseDate,date)!=='cur',
            'active':isEqualYMD(date,chooseDate),
            'curDay':isEqualYMD(date,new Date())}"
        >{{date.getDate()}}</span>
    </div>
</template>

<script>
// getOtherDate
import { getYMD, isEqualYMD, getPrevOrNext } from '@/util.js'
export default {
  props: {
    chooseDate: {
      type: Date,
      required: true
    }
  },
  computed: {
    daysArr () {
      const arr = []
      const { year, month } = getYMD(this.chooseDate)
      const startNum = new Date(year, month, 1).getDay()
      for (var i = 0; i < 42; i++) {
        arr.push(new Date(year, month, i + 1 - startNum))
      }
      return arr
    }
  },
  methods: {
    isEqualYMD, getPrevOrNext
  }
}
</script>

<style scoped lang="scss">
    .month{
         transition:all 2s linear;
        padding:10px;
        display:grid;
        grid-template-columns: repeat(7,1fr);
        grid-template-rows: 40px;
        gap:10px;
        span{
           line-height: 40px;
           text-align:center;
            &.curDay{
                background-color:lightseagreen;
                color:#f40;
                border-radius: 20px;
            }
            &.active{
                color:#fff;
                background-color:blue;
                border-radius: 20px;
            }
            &.otherMonth{
                color:gray;
            }
        }
    }
</style>
