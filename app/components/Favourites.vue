<template>
    <GridLayout columns="*" rows="*,60">
        <ListView col="0" row="0" v-for="drink in $store.state.favourites" @itemTap="onItemTap">
            <v-template>
                <Label :text="drink.strDrink" textWrap="true"/>
            </v-template>
        </ListView>

    </GridLayout>
</template>

<script>
    export default{
        data(){
            return{
               searchPhrase: ""
            }
        },
        methods:{
            onItemTap(){
                console.log("item tapped")
            },

        }
    }
</script>

<style>

</style>