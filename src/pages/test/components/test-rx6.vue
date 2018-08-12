<template>
  <div>
    <div>{{ num$ }}</div>
  </div>
</template>

<script>
import { of, from } from 'rxjs'
import { map, filter, startWith, switchMap } from 'rxjs/operators'

export default {
  created () {
    this.$http.get('/api/v1/coup')
  },
  subscriptions () {
    return {
      num$: from(this.getData())
        .pipe(
          filter(data => {
            console.log('=================')
            return true
          }),
          switchMap(data => {
            console.log(data)
            return of(999)
              .pipe(
                map(data => {
                  return data
                })
              )
          }),
          startWith(0)
        )
    }
  },
  methods: {
    getData () {
      return new Promise((resolve, reject) => {
        resolve('111')
      })
    }
  }
}
</script>

<style lang="scss">

</style>


