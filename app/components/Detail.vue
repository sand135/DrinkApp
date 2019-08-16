<template>
    <Page>
        <ActionBar title="Details" />
            <GridLayout columns = "*, *, 50" rows="auto, 60 ,200, *">
                <Label class="drinkname" :text="$store.state.tappedDrink.name" textWrap="true" row="0" col="0" colSpan="2"></Label>
                <Image src="~/assets/images/star_unliked.png" row="0" col="2" stretch="aspectFit" marginRight="0" ></Image>
                <image :src="$store.state.tappedDrink.imageHttp" row="1" col="0" rowSpan="2" stretch="aspectFill"></image>
                <Label class="rubrik" text="Ingredients" col="1" row="1" colSpan="2" ></Label>
                <ListView class="ingredientsList" row="2" col="1"  colSpan="2" for="items in $store.state.tappedDrink.ingredientslist" >
                    <v-template>
                        <GridLayout columns="*,auto" rows="*">
                            <Label :text = "items.measure" col="0" row="0"></Label>
                            <Label class="iName" :text="items.name" col="1" row="0" textWrap="true"></Label>
                        </GridLayout>
                    </v-template>
                </ListView>


                <Label :text="$store.state.tappedDrink.instructions" textWrap="true" row="3" col="0" colSpan="3"></Label>
            </GridLayout>
    </Page>
</template>

<script>

    //TODO: Fixa så att man kan trycka på stjärnan och flytta drinken till favoriter.
    //TODO: Fixa till vyn 
    export default {
        created(){
            console.log('created runs in detailList', this.id)
            this.fetchInformation()

        },
        props: ['id'],
        data(){
            return{
                drinkName:"Drinkname comes here",
                pictureSrc:"~/assets/images/star_unliked.png",
                ingredientList:[]
            }
        },
        methods:{

            fetchInformation(){
                this.$store.dispatch('fetchInformationAboutDrink',  this.id)
                    .then( () => {
                        this.setIngredientList()

                }).catch(err => {
                    console.log(err)
                })
            },
            setIngredientList(){
                console.log('then method running ')
                for (let i = 0; i < this.$store.state.tappedDrink.ingredientslist.length; i++) {
                    var measure = this.$store.state.tappedDrink.ingredientslist[i].measure
                    var ingredient = this.$store.state.tappedDrink.ingredientslist[i].name
                    if(measure === "" && ingredient === ""){return}
                    else{
                        this.ingredientslist.unshift({measure: measure, name: ingredient})
                    }

                }
            },
            setData(){

            }
        }
    }
</script>

<style>
    .drinkname{
        text-align: center;
        font-size: 30;
        font-family: "Chalkboard SE";
    }
    .ingredientsList{
        margin-right: 20;
    }
    .iName{
       text-align: left;
    }
    .rubrik{
        font-size: 20;
        margin-top: 30;
    }
</style>