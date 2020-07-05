<template>
    <div>
        <el-select
            v-model="value"
            multiple
            filterable
            allow-create
            default-first-option
            @change="handleChange"
            placeholder="请选择文章标签">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <input type="text" v-model="value">
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  export default {
    data() {
      return {
        options: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value: []
      }
    },
    methods: {
        handleChange(value) {
            console.log(value)
        }
    }
  }
</script>