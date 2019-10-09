<template>
    <div class="m-other">
        {{project}}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                project:''
            }
        },
        methods:{
            setProject(value){
                this.project = value
            }
        },
        watch:{
            '$route.params'(value){
                this.setProject(value.project)
            }
        },
        created() {
            this.setProject(this.$route.params.project)
        }
    }
</script>