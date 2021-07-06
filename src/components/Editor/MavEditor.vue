<template>
    <mavon-editor style="height: 600px;margin-bottom: 20px;"
                  :value="edvalue" @change="edchange" :ishljs="true"
                  :toolbars="toolbar"  :code_style="codeStyle" />
</template>

<script>
    import { toolbar, } from './editor_configure'
    export default {
        name: "MavEditor",
        props:{
            edvalue:{
                default:"",
            }
        },
        data(){
            return {
                toolbar,
                codeStyle:'solarized-dark'
            }
        },
        methods:{
            edchange(e,value){
                console.log(e,value);
                this.$emit('input',value)
            },
        }

    }
</script>

<style scoped>

</style>