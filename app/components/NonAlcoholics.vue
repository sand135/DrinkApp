<template>
    <GridLayout columns="*" rows="*,60">
        <ListView col="0" row="0" v-for="drink in $store.state.searchResultNonAlcoholicDrinks" @itemTap="onItemTap">
            <v-template>
                <!-- Shows the list item label in the default color and style. -->
                <Label :text="drink.strDrink" textWrap="true"/>
            </v-template>
        </ListView>
    </GridLayout>
</template>

<script>
    export default{
        methods:{
            onItemTap(){
                console.log("item tapped")
            },
        }
    }
</script>

<style>

</style>